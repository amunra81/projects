{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes       #-}
{-# LANGUAGE TemplateHaskell   #-}
{-# LANGUAGE TypeFamilies      #-}
import           Data.Text (Text)
import qualified Data.Text as T
import           Yesod
import           Yesod.Core.Types
import Data.Functor.Identity(Identity)

data App = App
instance Yesod App

mkYesod "App" [parseRoutes|
/person/#Text PersonR GET
/year/#Integer/month/#Text/day/#Int DateR
/wiki/*Texts WikiR GET
|]

--some extra definition to prove myself that i understand
instance ToContent Int where 
    toContent = toContent . show
instance ToTypedContent Int where
    toTypedContent = toTypedContent . show
    
getPersonR :: Text -> HandlerT App IO Int
getPersonR name = (HandlerT $ \ _ -> do return 3) >>= \ val -> (HandlerT $ \ _ -> do return $  (4+3))

--defaultLayout [whamlet|<h1>Hello #{name}!|]


handleDateR :: Integer -> Text -> Int -> Handler Text -- text/plain
handleDateR year month day =
    return $
        T.concat [month, " ", T.pack $ show day, ", ", T.pack $ show year]

getWikiR :: [Text] -> Handler Text
getWikiR = return . T.unwords

main :: IO ()
main = warp 3000 App
