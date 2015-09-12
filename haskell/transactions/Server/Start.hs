{-# LANGUAGE OverloadedStrings, ScopedTypeVariables #-}

module Main where
import Control.Applicative ((<$>), optional)
import Data.Maybe (fromMaybe)
import Data.Text (Text)
import Data.Text.Lazy (unpack)
import Text.Blaze.Html5 (Html, (!), a, form, input, p, toHtml, label)
import Text.Blaze.Html5.Attributes (action, enctype, href, name, size, type_, value)
import qualified Text.Blaze.Html5 as H
import qualified Text.Blaze.Html5.Attributes as A
import Data.Time.Clock
import Happstack.Lite

main = serve (Just defaultServerConfig) myApp

myApp :: ServerPart Response
myApp = msum
  [ 
    dir "echo" echo
  --, dir "query"   $ queryParams
  --, dir "form"    $ formPage
  --, dir "fortune" $ fortune
  --, dir "files"   $ fileServing
  --, dir "upload"  $ upload
    , homePage
  ]

homePage :: ServerPart Response
homePage =
        print "adssakj"
    ok $ template "home page" $ do
           H.h1 "Hello!"
           H.p "Writing applications with happstack-lite is fast and simple!"
           H.p "Check out these killer apps."
           H.p $ a ! href "/echo/secret%20message"  $ "echo"
           H.p $ a ! href "/query?foo=bar" $ "query parameters"
           H.p $ a ! href "/form"          $ "form processing"
           H.p $ a ! href "/fortune"       $ "(fortune) cookies"
           H.p $ a ! href "/files"         $ "file serving"
           H.p $ a ! href "/upload"        $ "file uploads"

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
        ok $ template "echo" $ do
          p $ "echo says: " >> toHtml msg
          p "Change the url to echo something else."
