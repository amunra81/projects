module Handler.Force where

import Import
import Data.Text(pack,unpack)
import Database.Persist.Types(fromPersistValueText)

getForcesR :: Handler TypedContent
getForcesR = do
             forces <- runDB $ selectList [] [Asc ForceName]
             let json = return forces
             defaultLayoutJson $(widgetFile "forces") json             

getForceR ::  Key Force -> Handler TypedContent
getForceR forceId = do
            -- db
            force <- runDB $ get $ forceId

            -- form
            form  <- forceForm forceId
            ( widget,enctype ) <- generateFormPost form
            
            -- presentation
            let json = return $ toJSON force
                personForm = [whamlet|
                <form method=post action=@{ForceR forceId} enctype=#{enctype}>
                    ^{widget}
                    <input type=submit>
                |]
            defaultLayoutJson personForm json

forceForm id = do 
        return $ renderDivs $ Force 
         <$> areq textField "Name" Nothing
         <*> areq textField "Nation" Nothing
         <*> aopt (selectField optForces) "Parent Force" (Just Nothing)--Just id))
         <*> areq doubleField "Weight" Nothing

postForceR ::  Key Force -> Handler TypedContent
postForceR forceId = error "Pula bocanc ba"

optForces :: Handler (OptionList (Key Force))
optForces = do
        forces <- runDB $ selectList [] [Asc ForceName]
        let toOptList (Entity id _) = Option (keyToText id) id (keyToText id) 
        let mforces =  map toOptList forces  

        return $ OptionList mforces textToKey

keyToText ::  Key entity -> Text
keyToText k = case fromPersistValueText $ unKey k of
              Left str -> error str
              Right txt -> txt

textToKey ::  Text -> Maybe (Key entity)
textToKey = Just . Key . PersistInt64 . read . unpack
