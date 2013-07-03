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
             -- fetch data
             forces <- runDB $ do 
                        insert $ Force "Force" "Nation" Nothing 2
                        selectList [] [Asc ForceName]
             
             -- presenter
             let json = return forces
                 widget = do
                  addScriptRemote "http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"
                  toWidget [julius|
                    $(function(){
                        $("#ajax a").click(function(){
                            $.ajax({
                                headers: { 
        Accept : "text/plain; charset=utf-8",
        "Content-Type": "text/plain; charset=utf-8"
    }
                                url : $(this).attr("href"),
                                success : function(response) {
                                    $("#res").html(response);
                                }
                            })
                            return false;
                        });
                    });
                    |]
                  [whamlet|
                    <ul #ajax>
                       $forall Entity id (Force name nation _ weight) <- forces
                            <a href="@{ForceR id}"> #{name} - #{name} - #{weight}
                    <div #res> Rezultat aici
                 |]

             defaultLayoutJson widget json

getForceR forceId = do
            force <- runDB $ get $ forceId
            let json = return $ toJSON force
                widget = [whamlet| Is like you would have the javascript off |]
            defaultLayoutJson widget json
