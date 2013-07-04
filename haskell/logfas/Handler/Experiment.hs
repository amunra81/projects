module Handler.Experiment where
import Import
import Text.Julius(ToJavascript)
import Yesod.Core.Widget(toWidget)
import Data.Conduit(MonadThrow)
import Data.Conduit(MonadUnsafeIO)

getExperimentR :: Handler Html
getExperimentR = error ""

data Div = Div { 
    ident :: Text, 
    click :: ( ToJavascript a, MonadThrow m, MonadUnsafeIO m, MonadBaseControl IO m, MonadIO m) => a -> WidgetT site m () 
}

clickedDiv = do
              id <- newIdent
              [whamlet|<h1 .#{id}>My Header|]
              return $ Div id $ \ a -> toWidget [julius| #{a} |]
