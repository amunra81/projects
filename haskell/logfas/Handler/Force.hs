module Handler.Force where

import Import
import Data.Text(pack,unpack)

getForcesR :: Handler TypedContent
getForcesR = do
             forces <- runDB $ selectList [] [Asc ForceName]
             let json = return forces
             defaultLayoutJson $(widgetFile "forces") json             

getForceR ::  Key Force -> Handler TypedContent
getForceR forceId = do
            force <- runDB $ get $ forceId
            form  <- forceForm forceId
            (widget,enctype) <- generateFormPost form
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
         <*> aopt (selectField allForces) "Parent Force" (Just (Just id))
         <*> areq doubleField "Weight" Nothing


postForceR ::  Key Force -> Handler TypedContent
postForceR forceId = error "Pula bocanc ba"



allForces :: Handler (OptionList (Key Force))
allForces = do
        forces <- runDB $ selectList [] [Asc ForceName]
        let toOptList (Entity id _) = Option (keyToStr id) id (keyToStr id) 
        let mforces =  map toOptList forces  

        return $ OptionList mforces strToKey

keyToStr ::  Key entity -> Text
keyToStr k = let PersistInt64 x = unKey k
             in  pack $ (show x) 

strToKey ::  Text -> Maybe (Key entity)
strToKey = Just . Key . PersistInt64 . read . unpack
