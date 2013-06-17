{-# LANGUAGE TypeFamilies, QuasiQuotes, MultiParamTypeClasses, TemplateHaskell, OverloadedStrings #-}
import Yesod

data Links = Links

instance Yesod Links

mkYesod "Links" [parseRoutes| 
    /       HomeR   GET 
    /page1  Page1R  GET
    /page2  Page2R  GET
|]

getHomeR  = defaultLayout [whamlet| <a href=@{Page1R}> Go to Page1! |]
getPage1R = defaultLayout [whamlet| <a href=@{Page2R}> Go to Page2! |]
getPage2R = defaultLayout [whamlet| <a href=@{HomeR}>  Go Home!     |]

main = warp 300 Links
