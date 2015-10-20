{-# LANGUAGE OverloadedStrings #-}

module Data.HotBox where

import Data.Aeson
import Control.Monad

type Seq a = [a]

data Restaurant = Restaurant { _id :: Int
                             , _name :: Maybe String
                             , _tables :: [Table] 
                             }

data Table = Table { tableName :: String }

data Product

type Menu = Seq Product

instance FromJSON Table where
    parseJSON (Object v) =
        Table 
            <$> v .: "name"
    parseJSON _ = mzero

instance FromJSON Restaurant where
    parseJSON (Object v) =
        Restaurant 
            <$> v .: "id"
            <*> v .:? "name"
            <*> v .: "tables"
    parseJSON _ = mzero

instance ToJSON Table where
    toJSON (Table name) =
            object ["name" .= name]

instance ToJSON Restaurant where
    toJSON (Restaurant i name tables) =
            object ["name" .= name,"id" .= i,"tables" .= tables]

allRestaurants :: [Restaurant]
allRestaurants = map toRest [
                              (1,"",["masa1","masa2"])
                              ,(2,"La mama",["t1"])
                              ,(2,"La mama",["t1"])
                            ]
                where 
                      toRest (i,"",ts)= Restaurant i Nothing (tables ts)
                      toRest (i,n,ts)= Restaurant i (Just n) (tables ts)
                      tables xs = [ Table x | x <- xs ]
