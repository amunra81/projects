module Handler.Saf where

import Import
import Yesod.Core.Types
import Yesod.Core.Json


instance ToJSON Force where
   toJSON (Force name nation parentId weight) = object [ "name"     .= name  
                                                       , "nation"   .= nation 
                                                       , "parent"   .= parentId 
                                                       , "wight"    .= weight ]

getSafR :: HandlerT App IO Value 
getSafR =  do 
             fors <- runDB $ do 
                        insert $ Force "Force" "Nation" Nothing 2
                        selectList [] [Asc ForceName]
             returnJson fors
--getSafR = defaultLayout [whamlet| Pula bocanc |] 
--getSafR = HandlerT $ \ x -> return ([hamlet|asdada|] x)

postSafR :: Handler Html
postSafR = error "Not yet implemented: post SafR"
