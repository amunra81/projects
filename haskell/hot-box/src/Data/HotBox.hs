{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveDataTypeable #-}
module Data.HotBox where

import Data.Aeson
import Control.Monad
import Data.Data            (Data, Typeable)

data Restaurant = Restaurant { _restId :: Int
                             , _name :: String
                             , _tables :: [Table] 
                             , _menu :: Menu
                             }
                  deriving (Eq, Ord, Data, Typeable)

data Table = Table { _tableName :: String }
             deriving (Eq, Ord, Data, Typeable)

data Product = Product String
               deriving (Eq, Ord, Data, Typeable)

type Menu = [Product]

data User = User { _userId :: Int
                 } deriving (Eq, Ord, Data, Typeable)

data UserOrder = UserOrder User [Product]

data Order = Order  { _restOrder :: Restaurant
                    , _userOrder :: [UserOrder] 
                    }

-- | FROM JSON

instance FromJSON User where
    parseJSON (Object v) =  
        User <$> v .: "id"

instance FromJSON UserOrder where
        parseJSON (Object v) =
            emptyOrder <$> v .: "user" 
            where emptyOrder u = UserOrder u []

instance FromJSON Table where
    parseJSON (Object v) =
        Table 
            <$> v .: "name"
    parseJSON _ = mzero

instance FromJSON Restaurant where
    parseJSON (Object v) =
        Restaurant 
            <$> v .: "id"
            <*> v .: "name"
            <*> v .: "tables"
            <*> v .: "menu"
    parseJSON _ = mzero

instance FromJSON Product where
    parseJSON (Object v) =
        Product <$> v .: "name"

-- TO JSON  

instance ToJSON Product where
    toJSON (Product xs) = object ["name" .= xs]

instance ToJSON User where
    toJSON (User id) = object ["id" .= id]

instance ToJSON UserOrder where
    toJSON (UserOrder user xs) = object ["user" .= user,"products" .= xs]

instance ToJSON Table where
    toJSON (Table name) =
            object ["name" .= name]

instance ToJSON Restaurant where
    toJSON (Restaurant i name tables menu) =
            object ["name" .= name,"id" .= i,"tables" .= tables,"menu" .= menu]

repeatList :: Int -> [a] -> [a]
repeatList 0 xs = xs
repeatList i xs = xs ++ repeatList (i-1) xs

allRestaurants :: [Restaurant]
allRestaurants = map toRest $ repeatList 0
                            [(1,"Zvon",["masa1","masa2"],[])
                            ,(2,"Colectiv",["t1","asdad"],[])
                            ,(3,"La mama",["t1"],[])
                            ]
                 where 
                      toRest (i,n,ts,mn) = Restaurant i n (tables ts) mn
                      tables xs = [ Table x | x <- xs ]
