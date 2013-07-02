module Handler.Saf where

import Import
import Yesod.Core.Types
import Yesod.Core.Json
import Data.List (head)

instance ToJSON Force where
   toJSON (Force name nation parentId weight) = 
        object [ "name"     .= name  
               , "nation"   .= nation 
               , "parent"   .= parentId 
               , "wight"    .= weight ]

getSafR :: HandlerT App IO TypedContent 
getSafR =  do 
             forces <- runDB $ do 
                        insert $ Force "Force" "Nation" Nothing 2
                        selectList [] [Asc ForceName]
             let json = return forces
                 widget = [whamlet|
                    <ul>
                       $forall Entity _ (Force name nation _ weight) <- forces
                        <li> #{name} - #{name} - #{weight}
                 |]

             defaultLayoutJson widget json
--getSafR = defaultLayout [whamlet| Pula bocanc |] 
--getSafR = HandlerT $ \ x -> return ([hamlet|asdada|] x)

postSafR :: Handler Html
postSafR = error "Not yet implemented: post SafR"
