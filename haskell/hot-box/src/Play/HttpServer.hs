{-# LANGUAGE DeriveDataTypeable, GeneralizedNewtypeDeriving
  , TemplateHaskell, TypeOperators, OverloadedStrings,GADTs, FlexibleContexts #-}

module Main where

import Prelude                 hiding (head, id, (.))
import Control.Category        (Category(id, (.)))

import Control.Monad           (msum)
import Data.Data               (Data, Typeable)
import Data.Monoid             (mconcat)
import Data.String             (fromString)
import Data.Text               (Text)
import Happstack.Server
    ( Response, ServerPartT,ServerPart, ok, toResponse, simpleHTTP
    , nullConf,Conf(..), seeOther, dir, notFound, seeOther,method,Method(GET,POST,PUT,DELETE)
    , ServerMonad(askRq),serveDirectory,Browsing(..))

import Text.Blaze.Html4.Strict
    ((!), html, head, body, title, p, toHtml
    , toValue, ol, li, a)
import Text.Blaze.Html4.Strict.Attributes (href)
import Text.Boomerang.TH       (makeBoomerangs)
import Web.Routes
    ( PathInfo(..), RouteT, showURL
    , runRouteT, Site(..), setDefault, mkSitePI)
import Web.Routes.TH           (derivePathInfo)
import Web.Routes.Happstack    (implSite)
import Web.Routes.Boomerang ((</>),Router,(:-),(<>),lit,int,anyText,xmaph,boomerangSite)
import Data.Acid            ( AcidState , openLocalState )
import Data.Acid.Local      ( createCheckpointAndClose )
import Control.Exception    ( bracket )
import Data.Storage
import Http.Handlers
import Data.HotBox
import Control.Monad.Trans     ( MonadTrans, lift )
import qualified Data.ByteString.Lazy.Char8 as L
import qualified Play.InitialStorageState as ISS
import Data.Time

newtype ArticleId = ArticleId { unArticleId :: Int }
    deriving (Eq, Ord, Enum, Read, Show, Data, Typeable, PathInfo)

data Sitemap
    = Home
    | Article ArticleId
    | UserOverview
    | UserDetail Int Text
    | AllRests
    | Rest Int
    | OrderByRestAndTable Int Int
    | WholeStorage
    | CurrentOrder Int Int
    | UserInCurrentOrder Int Int Int
    | ItemsInCurrentOrder Int Int Int Int
    | ItemsApproval Int Int Int
    | ItemsPayment Int Int Int
    | UserRequest Int Int Int Text
    | WaiterResponse Int Int Int Text
    deriving (Eq, Ord, Read, Show, Data, Typeable)


$(makeBoomerangs ''Sitemap)

sitemap :: Router () (Sitemap :- ())
sitemap =
       rHome
    <> rArticle . (lit "article" </> articleId)
    <> lit "users" . usersX
    <> lit "restaurants" . rests
    <> rWholeStorage . lit "storage"
    
    where
    rests = rAllRests
     <> rRest                </> int
     <> rOrderByRestAndTable </> int          </> lit "tables" </> int </> lit "orders"
     <> rCurrentOrder        </> currentOrder
     <> rUserInCurrentOrder  </> currentOrder </> users
     <> rItemsApproval       </> currentOrder </> users </> lit "items"    </> "approved"
     <> rItemsPayment        </> currentOrder </> users </> lit "items"    </> "payed"
     <> rItemsInCurrentOrder </> currentOrder </> users </> lit "items"    </> int
     <> rUserRequest         </> currentOrder </> users </> lit "requests" </> anyText
     <> rWaiterResponse      </> currentOrder </> users </> lit "response" </> anyText

    currentOrder  =  int </> lit "tables" </> int </> lit "orders" </> lit "current"
    users         =  lit "users" </> int
    usersX        =  rUserOverview <> rUserDetail </> int . lit "-" . anyText

articleId :: Router () (ArticleId :- ())
articleId =
    xmaph ArticleId (Just . unArticleId) int

route :: AcidState Storage -> Sitemap -> RouteT Sitemap (ServerPartT IO) Response
route _ Home                  = homePage
route _ (Article articleId)   = articlePage articleId
route _ UserOverview          = userOverviewPage
route _ (UserDetail uid name) = userDetailPage uid name
route acid AllRests           = handleRestaurants acid
route acid (Rest i)           = lift $ getRestByIdH acid i
route acid WholeStorage       = lift $ getWholeStorageH acid
route acid (OrderByRestAndTable rid tid) = do
           lift $ lift $ print $ "A intrat cu rid " ++ show rid ++ "si tid " ++ show tid
           lift $ getAllOrdersByRestAndTableH acid (RestId rid) (TableId tid)
route acid (CurrentOrder i j) = msum [ method GET >> lift (getCurrentOrderH acid (RestId i) (TableId j))
                                     , method DELETE >> lift (closeCurrentOrderH acid (RestId i) (TableId j))
                                     ]
route acid (UserInCurrentOrder i j k) = method POST >> 
                                        lift (attachUserToCurrentOrderH acid (RestId i) (TableId j) (UserId k))
route acid (ItemsInCurrentOrder i j k l) = msum 
        [ method POST >> lift (addProductToCurrentOrderH acid (RestId i) (TableId j) (UserId k) (ProdId l))
        , method DELETE >> lift (deleteItemFromCurrentOrderH acid (RestId i) (TableId j) (UserId k) (OrderItemId l))
        ]
route acid (ItemsApproval i j k ) = method POST >> lift (approveItemsH acid (RestId i) (TableId j) (UserId k))
route acid (UserRequest i j k l ) = method POST >> lift (addUserRequestH acid (RestId i) (TableId j) (UserId k) l)
route acid (WaiterResponse i j k l ) = 
            method POST >> lift (addWaiterResponseH acid (RestId i) (TableId j) (UserId k) l)

handleRestaurants :: AcidState Storage -> RouteT Sitemap (ServerPartT IO) Response
handleRestaurants acid = msum [ method GET >> lift (getRestaurantsH acid)
                              , method POST >> lift (newRestH acid)
                              ]

homePage :: RouteT Sitemap (ServerPartT IO) Response
homePage = do
  articles     <- mapM mkArticle [(ArticleId 1) .. (ArticleId 10)]
  userOverview <- showURL UserOverview
  ok $ toResponse $
    html $ do
     head $ title "Welcome Home!"
     body $ do
      a ! href (toValue userOverview) $ "User Overview"
      ol $ mconcat articles
  where
   mkArticle articleId = do
    url <- showURL (Article articleId)
    return $ li $ a ! href (toValue url) $
      toHtml $ "Article " ++ show (unArticleId articleId)

articlePage :: ArticleId -> RouteT Sitemap (ServerPartT IO) Response
articlePage (ArticleId articleId) = do
  homeURL <- showURL Home
  ok $ toResponse $
    html $ do
     head $ title (toHtml $ "Article " ++ show articleId)
     body $ do
      p $ toHtml $ "You are now reading article " ++ show articleId
      clickOk homeURL

userOverviewPage :: RouteT Sitemap (ServerPartT IO) Response
userOverviewPage = do
  users <- mapM mkUser [1 .. 10]
  ok $ toResponse $
    html $ do
      head $ title "Our Users"
      body $ ol $ mconcat users
  where
    mkUser userId = do
      url <- showURL (UserDetail userId
                      (fromString $ "user " ++ show userId))
      return $ li $ a ! href (toValue url) $
        toHtml $ "User " ++ show userId

userDetailPage :: Int
               -> Text
               -> RouteT Sitemap (ServerPartT IO) Response
userDetailPage userId userName = do
  homeURL <- showURL Home
  ok $ toResponse $
    html $ do
      head $ title (toHtml $ "User " <> userName)
      body $ do
        p $ toHtml $ "You are now view user detail page for " <> userName
        clickOk homeURL

clickOk homeURL = 
        p $ do "Click "
               a ! href (toValue homeURL) $ "here"
               " to return home."

site :: AcidState Storage -> Site Sitemap (ServerPartT IO Response)
site acid =
  setDefault Home $ boomerangSite (runRouteT $ route acid) sitemap

main :: IO ()
main =
    bracket (openLocalState ISS.initialStorageState)
           chkPoint
           doWork
    where 
        chkPoint st = do 
                    print "checkPoint close"
                    createCheckpointAndClose st

        doWork acid = do
            putStrLn ("Listening at http://localhost:" ++ show (port nullConf) ++ "/") 
            fmap show getCurrentTime >>= print
            simpleHTTP nullConf $ msum
                [ 
                 dir "favicon.ico" $ notFound (toResponse ())
                {-,dir "imgs" $ serveDirectory EnableBrowsing ["index.html"] "~"-}
                , implSite "http://localhost:8000" "" (site acid)
                {-, seeOther ("/route/" :: String) (toResponse ())-}
                ]
