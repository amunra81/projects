{-# LANGUAGE DeriveDataTypeable, GeneralizedNewtypeDeriving#-}
{-# LANGUAGE TemplateHaskell, TypeOperators, OverloadedStrings #-}
module Main where

import Prelude                 hiding (head, id, (.))
import Control.Category        (Category(id, (.)))

import Control.Monad           (msum)
import Data.Data               (Data, Typeable)
import Data.Monoid             (mconcat)
import Data.String             (fromString)
import Data.Text               (Text)
import Happstack.Server
    ( Response, ServerPartT, ok, toResponse, simpleHTTP
    , nullConf, seeOther, dir, notFound, seeOther)
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
import Web.Routes.Boomerang

newtype ArticleId = ArticleId { unArticleId :: Int }
    deriving (Eq, Ord, Enum, Read, Show, Data, Typeable, PathInfo)

data Sitemap
    = Home
    | Article ArticleId
    | UserOverview
    | UserDetail Int Text
    deriving (Eq, Ord, Read, Show, Data, Typeable)

$(makeBoomerangs ''Sitemap)

sitemap :: Router () (Sitemap :- ())
sitemap =
       rHome
    <> rArticle . (lit "article" </> articleId)
    <> lit "users" . users
    
    where
      users =  rUserOverview
            <> rUserDetail </> int . lit "-" . anyText

articleId :: Router () (ArticleId :- ())
articleId =
    xmaph ArticleId (Just . unArticleId) int

{-main :: IO a-}
main = print "asda"
