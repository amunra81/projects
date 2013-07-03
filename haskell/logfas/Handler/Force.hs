module Handler.Force where

import Import

getForcesR :: Handler TypedContent
getForcesR = do
             forces <- runDB $ selectList [] [Asc ForceName]
             let json = return forces
             defaultLayoutJson $(widgetFile "forces") json             

getForceR forceId = do
            force <- runDB $ get $ forceId
            let json = return $ toJSON force
                widget = [whamlet| Is like you would have the javascript off |]
            defaultLayoutJson widget json
