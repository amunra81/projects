module Model where

import Prelude
import Yesod
import Data.Text (Text)
import Database.Persist.Quasi
import Data.Typeable (Typeable)
import Yesod.Core.Json(FromJSON)
import Control.Applicative
import Control.Monad

-- You can define all of your database entities in the entities file.
-- You can find more information on persistent and how to declare entities
-- at:
-- http://www.yesodweb.com/book/persistent/
share [mkPersist sqlOnlySettings, mkMigrate "migrateAll"]
    $(persistFileWith lowerCaseSettings "config/models")

instance ToJSON Force where
   toJSON (Force name nation parentId weight) = 
        object [ "name"     .= name  
               , "nation"   .= nation 
               , "parent"   .= parentId 
               , "weight"    .= weight ]

instance FromJSON Force where 
    parseJSON (Object v) = Force <$>
                           v .: "name" <*>
                           v .: "nation" <*>
                           v .: "force" <*>
                           v .: "weight"
    parseJSON _ = mzero
