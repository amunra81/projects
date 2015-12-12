{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveDataTypeable,GeneralizedNewtypeDeriving,RecordWildCards #-}
module Data.HotBox where

import Data.Aeson
import Control.Monad
import Data.Data            (Data, Typeable)

-- | Data ID's
newtype RestId = RestId { unRestId :: Int }
    deriving (Show,Eq, Ord, Data, Enum, Typeable)

newtype TableId = TableId { unTableId :: Int }
    deriving (Show,Eq, Ord, Data, Enum, Typeable)

newtype UserId = UserId { unUserId :: Int }
    deriving (Show,Eq, Ord, Data, Enum, Typeable)

newtype OrderId = OrderId { unOrderId :: Int }
    deriving (Show,Eq, Ord, Data, Enum, Typeable)

-- | Actual Data
data Restaurant = Restaurant { _restId  :: RestId
                             , _name    :: String
                             , _tables  :: [Table] 
                             , _menu    :: Menu
                             }
                  deriving (Show,Eq, Ord, Data, Typeable)

data Table = Table { _tableId:: TableId,_tableName :: String }
             deriving (Show,Eq, Ord, Data, Typeable)

data Product = Product String
               deriving (Show,Eq, Ord, Data, Typeable)

type Menu = [Product] 

data User = User { _userId :: UserId
                 } deriving (Show,Eq, Ord, Data, Typeable)

data UserOrder = UserOrder { _userOrder :: User 
                           , _userOrderProducts :: [Product]
                           } deriving (Show,Eq,Ord,Data)

data Order = Order  { _orderId :: OrderId
                    , _orderRest :: Restaurant
                    , _orderTable :: Table
                    , _userOrders :: [UserOrder] 
                    } deriving (Show,Eq, Ord, Data, Typeable)

-- | FROM JSON

instance FromJSON RestId where
    parseJSON v = RestId <$> parseJSON v

instance FromJSON TableId where
    parseJSON v = TableId <$> parseJSON v

instance FromJSON UserId where
    parseJSON v = UserId <$> parseJSON v

instance FromJSON OrderId where
    parseJSON v = OrderId <$> parseJSON v

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
            <$> v .: "id"
            <*> v .: "name"
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

instance ToJSON RestId where
    toJSON (RestId i) = toJSON i

instance ToJSON TableId where
    toJSON (TableId i) = toJSON i

instance ToJSON UserId where
    toJSON (UserId i) = toJSON i

instance ToJSON OrderId where
    toJSON (OrderId i) = toJSON i

instance ToJSON Product where
    toJSON (Product xs) = object ["name" .= xs]

instance ToJSON User where
    toJSON (User id) = object ["id" .= id]

instance ToJSON UserOrder where
    toJSON (UserOrder user xs) = object ["user" .= user,"products" .= xs]

instance ToJSON Table where
    toJSON (Table id name) =
            object ["id" .= id,"name" .= name]

instance ToJSON Restaurant where
    toJSON (Restaurant i name tables menu) =
            object ["name" .= name,"id" .= i,"tables" .= tables,"menu" .= menu]

--TODO split menu from order
instance ToJSON Order where
    toJSON (Order{..}) = 
            object ["id" .= _orderId
                   ,"restId" .= _restId _orderRest
                   ,"menu" .= _menu _orderRest
                   ,"tableId" .= _tableId _orderTable
                   ,"userOrders" .= _userOrders
                   ]

repeatList :: Int -> [a] -> [a]
repeatList 0 xs = xs
repeatList i xs = xs ++ repeatList (i-1) xs


