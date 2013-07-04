module Handler.Experiment where
import Import
import Text.Julius(ToJavascript)

getExperimentR :: Handler Html
getExperimentR = error ""

data Div = Div { 
    ident :: Text, 
    click :: ToJavascript a => a -> WidgetT site m () -- maybe is just to compile easier in the design process 
    }

clickedDiv = do
              id <- newIdent
              [whamlet|<h1 .#{id}>My Header|]
              return $ Div id $ error ""
