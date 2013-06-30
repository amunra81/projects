module Handler.Saf where

import Import
import Yesod.Core.Types

getSafR :: Handler Html
getSafR = defaultLayout [whamlet| Pula bocanc |] 
--getSafR = HandlerT $ \ x -> return ([hamlet|asdada|] x)

postSafR :: Handler Html
postSafR = error "Not yet implemented: postSafR"
