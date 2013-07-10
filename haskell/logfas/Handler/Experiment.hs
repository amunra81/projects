module Handler.Experiment where
import Import
import Yesod.Core.Widget(addScript,toWidget)
import Data.Conduit(MonadThrow)
import Data.Conduit(MonadUnsafeIO)
import Data.Text(pack,unpack)
import Text.Julius(rawJS,renderJavascriptUrl,RawJavascript,Javascript,ToJavascript)

getExperimentR :: Handler Html
getExperimentR = defaultLayout $  do 
                                    addScript $ StaticR js_ext_debug_js
                                    --create two divs
                                    div <- clickedDiv 
                                    div2 <- clickedDiv
                                    --some event hooking
                                    onClick div $ jurlToJS [julius| $("##{rawJS $ ident div2}").html("clicked from #{rawJS $ ident div}"); |]
                                    onClick div2 $ jurlToJS [julius| $("##{rawJS $ ident div}").html("clicked from #{rawJS $ ident div2}"); |]

                                    return ()
                                   
jurlToJS :: JavascriptUrl url -> RawJavascript
jurlToJS = rawJS . (renderJavascriptUrl blank) 
           where blank _ _ = undefined 

data Div = Div { 
    ident :: Text, 
    onClick :: ( ToJavascript a, MonadThrow m, MonadUnsafeIO m, MonadBaseControl IO m, MonadIO m) => a -> WidgetT site m () 
}

minJquery ::  MonadWidget m => m ()
minJquery = addScriptRemote "http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"

clickedDiv :: (MonadIO m, MonadBaseControl IO m, MonadThrow m,MonadUnsafeIO m) =>WidgetT site m Div
clickedDiv = do
              id <- newIdent ; minJquery
              [whamlet|<div ##{id}>My Header|]
              return $ Div id $ \ a -> toWidget [julius|
 $("##{rawJS id}").click(function(){
        #{a} })|]
