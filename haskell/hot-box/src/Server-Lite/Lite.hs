{-# LANGUAGE OverloadedStrings, ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances,UndecidableInstances #-}

import Control.Applicative ((<$>), optional)
import Data.Maybe (fromMaybe)
import Data.Text (Text)
import Data.Text.Lazy (unpack)
import Text.Blaze.Html5 (Html, (!), a, form, input, p, toHtml, label)
import Text.Blaze.Html5.Attributes (action, enctype, href, name, size, type_, value)
import qualified Text.Blaze.Html5 as H
import qualified Text.Blaze.Html5.Attributes as A
import qualified Data.ByteString.Char8 as B
import Data.Time.Clock
import Happstack.Lite
import Data.HotBox
import Data.Aeson
import Data.Foldable
import Data.Aeson.Encode.Pretty 
import Text.Read
import Web.Routes
import qualified Play.InitialState as IS

main =  putStrLn ("Listening at http://localhost:" ++ show (port serverConfig) ++ "/") 
        >>= \x -> serve (Just serverConfig) myApp 
        where serverConfig = defaultServerConfig

myApp :: ServerPart Response
myApp = msum
  [ 
      dir "echo" echo
    , dir "query"   queryParams
    , dir "form"    formPage
    , dir "fortune" fortune
    , dir "files"   fileServing
    , dir "upload"  upload
    , dir "restaurant"  restaurants
    , homePage
  ]

homePage =
    ok $ template "home page" $ do
           H.h1 "Hello!"
           H.p "Writing applications with happstack-lite is fast and simple!"
           H.p "Check out these killer apps."
           H.p $ a ! href "/echo/secret%20message/onesecretmore"  $ "echo"
           H.p $ a ! href "/query?foo=bar" $ "query parameters"
           H.p $ a ! href "/form"          $ "form processing"
           H.p $ a ! href "/fortune"       $ "(fortune) cookies"
           H.p $ a ! href "/files"         $ "file serving"
           H.p $ a ! href "/upload"        $ "file uploads"
           H.p $ a ! href "/restaurant"   $ "all restaurants"

template :: Text -> Html -> Response
template title body = toResponse $
  H.html $ do
    H.head $ 
      H.title (toHtml title)
    H.body $ do
      body
      p $ a ! href "/" $ "back home"

echo :: ServerPart Response
echo =
    path $ \(msg :: String) ->
        path $ \(msg2 :: String) ->
            ok $ template "echo" $ do
            p $ "echo says: " >> toHtml (msg ++ "/" ++ msg2)
            p "Change the url to echo something else."

queryParams :: ServerPart Response
queryParams = do 
      mFoo <- optional $ lookText "foo"
      ok $ template "query params" $ do
        p $ "foo is set to: " >> toHtml (show mFoo)
        p "change the url to set it to something else."

formPage :: ServerPart Response
formPage = msum [ viewForm, processForm ]
  where
    viewForm :: ServerPart Response
    viewForm =
        do method GET
           ok $ template "form" $
              form ! action "/form" ! enctype "multipart/form-data" ! A.method "POST" $ do
                label ! A.for "msg" $ "Say something clever"
                input ! type_ "text" ! A.id "msg" ! name "msg"
                input ! type_ "submit" ! value "Say it!"

processForm :: ServerPart Response
processForm =  do
    method POST
    msg <- lookText "msg"
    ok $ template "form" $ do
        H.p "You said:"
        H.p (toHtml msg)

fortune :: ServerPart Response
fortune = msum [ viewFortune, updateFortune ]
    where
      viewFortune :: ServerPart Response
      viewFortune =
          do method GET
             mMemory <- optional $ lookCookieValue "fortune"
             let memory = fromMaybe "Your future will be filled with web programming." mMemory
             ok $ template "fortune" $ do
                    H.p "The message in your (fortune) cookie says:"
                    H.p (toHtml memory)
                    form ! action "/fortune" ! enctype "multipart/form-data" ! A.method "POST" $ 
                        do
                        label ! A.for "fortune" $ "Change your fortune: "
                        input ! type_ "text" ! A.id "fortune" ! name "new_fortune"
                        input ! type_ "submit" ! value "Say it!"

updateFortune :: ServerPart Response
updateFortune = do 
        method POST
        fortune <- lookText "new_fortune"
        addCookies [(Session, mkCookie "fortune" (unpack fortune))]
        seeOther ("/fortune" :: String) (toResponse ())

fileServing :: ServerPart Response
fileServing =
    serveDirectory EnableBrowsing ["index.html"] "."

upload :: ServerPart Response
upload =
       msum [ uploadForm
            , handleUpload
            ]
    where
    uploadForm :: ServerPart Response
    uploadForm =
        do method GET
           ok $ template "upload form" $ 
            form ! enctype "multipart/form-data" ! A.method "POST" ! action "/upload" $ 
                do
                    input ! type_ "file" ! name "file_upload" ! size "40"
                    input ! type_ "submit" ! value "upload"

handleUpload :: ServerPart Response
handleUpload =
    do (tmpFile, uploadName, contentType) <- lookFile "file_upload"
       ok $ template "file uploaded" $ do
            p (toHtml $ "temporary file: " ++ tmpFile)
            p (toHtml $ "uploaded name:  " ++ uploadName)
            p (toHtml $ "content-type:   " ++ show contentType)

instance (ToJSON a) => ToMessage a where
  toContentType _ = B.pack "application/json"
  toMessage       = encodePretty

restaurants :: ServerPart Response
restaurants =  
        path parseResponse 
        where 
            parseResponse All          = ok $ toResponse IS.allRestaurants
            parseResponse (JustOne i)  = resourceFromMaybe $ 
                                            find ((== (RestId i)) . _restId) IS.allRestaurants

resourceFromMaybe :: (ToMessage a) => Maybe a -> ServerPart Response
resourceFromMaybe = maybe nothing f 
        where 
              nothing = resourceNotFound ("Not found yet"::String)
              f = ok . toResponse

resourceNotFound :: (ToMessage a) => a -> ServerPart Response
resourceNotFound = notFound . toResponse

data Restaurants = All | JustOne Int

instance FromReqURI Restaurants where
    fromReqURI "all" = Just All
    fromReqURI xs = readMaybe xs >>= Just . JustOne 
