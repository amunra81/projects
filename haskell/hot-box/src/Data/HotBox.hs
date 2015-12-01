{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

module Data.HotBox where

import Data.Aeson
import Control.Monad
import GHC.Generics
import Web.Routes

data Restaurant = Restaurant { _id :: Int
                             , _name :: String
                             , _tables :: [Table] 
                             }

data Table = Table { tableName :: String }

data Product

type Menu = [Product]

data User = User

data UserOrder = UserOrder User [Product]

data Order = Order  { _restOrder :: Restaurant
                    , _userOrder :: [UserOrder] 
                    }

-- | FROM JSON

instance FromJSON User where
    parseJSON (Object v) = pure User 

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
    parseJSON _ = mzero

-- TO JSON  

instance ToJSON Product where
    toJSON _ = object []

instance ToJSON User where
    toJSON User = object []

instance ToJSON UserOrder where
    toJSON (UserOrder user xs) = object ["user" .= user,"products" .= xs]

instance ToJSON Table where
    toJSON (Table name) =
            object ["name" .= name]

instance ToJSON Restaurant where
    toJSON (Restaurant i name tables) =
            object ["name" .= name,"id" .= i,"tables" .= tables]

repeatList :: Int -> [a] -> [a]
repeatList 0 xs = xs
repeatList i xs = xs ++ repeatList (i-1) xs

allRestaurants :: [Restaurant]
allRestaurants = map toRest $ repeatList 10
                            [(1,"Zvon",["masa1","masa2"])
                            ,(2,"Colectiv",["t1","asdad"])
                            ,(3,"La mama",["t1"])] 
                 where 
                      toRest (i,n,ts) = Restaurant i n (tables ts)
                      tables xs = [ Table x | x <- xs ]
