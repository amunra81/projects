module Handler.Saf where

import Import
import Yesod.Core.Types
import Yesod.Core.Json
import Data.List (head)


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
                            jQuery.getJSON($(this).attr("href"),function(response) {
                                    $("#res").html(response);
                                })
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

