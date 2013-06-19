{-# LANGUAGE TypeFamilies, QuasiQuotes, MultiParamTypeClasses,
             TemplateHaskell, OverloadedStrings #-}
import Yesod

data HelloWorld = HelloWorld | FuckYouWorld

mkYesod "HelloWorld" [parseRoutes| / HomeR GET |]
 
instance Yesod HelloWorld

getHomeR :: Handler Html
getHomeR = defaultLayout [whamlet|
    <table>
       <tr>
         <td>Hello World!
|] 

main :: IO ()
main = warp 3000 FuckYouWorld


some = "asda" ++ "/"

-- some blank line
