{-# LANGUAGE QuasiQuotes           #-}
{-# LANGUAGE TemplateHaskell       #-}
{-# LANGUAGE TypeFamilies          #-}
import           Yesod

na :: t
na = error "na"

data HelloWorld = HelloWorld

mkYesod "HelloWorld" [parseRoutes|
/ HomeR GET
/sample SampleR GET
|]

instance Yesod HelloWorld

getHomeR :: Handler Html
getHomeR = defaultLayout [whamlet|Hello World!|]

--getSampleR :: Handler Html
getSampleR = defaultLayout $ do
    --setTitle "My Awesome Site"
    toWidget [julius| alert("Hello World"); |]


main :: IO ()
main = warp 3000 HelloWorld
