{-# LANGUAGE OverloadedStrings , TypeFamilies #-}
{-# LANGUAGE DeriveDataTypeable,GeneralizedNewtypeDeriving,RecordWildCards #-}
{-# LANGUAGE TemplateHaskell #-}

module Data.HotBox where

import Data.Aeson
import Control.Monad
import Data.Data            (Data, Typeable)
import Control.Lens hiding ((.=))

-- | Data ID's

newtype RestId = RestId { _unRestId :: Int }
                             deriving (Show,Eq, Ord, Data, Enum, Typeable)
newtype TableId = TableId { unTableId :: Int }
    deriving (Show,Eq, Ord, Data, Enum, Typeable)

newtype UserId = UserId { _unUserId :: Int }
    deriving (Show,Eq, Ord, Data, Enum, Typeable)

newtype OrderId = OrderId { _unOrderId :: Int }
    deriving (Show,Eq, Ord, Data, Enum, Typeable)

newtype ProdId = ProdId { _unProdId :: Int }
    deriving (Show,Eq, Ord, Data, Enum, Typeable)

newtype OrderItemId = OrderItemId { _unOrderItemId :: Int }
    deriving (Show,Eq, Ord, Data, Enum, Typeable)

-- | Actual Data
data Restaurant = Restaurant { _restId  :: Id Restaurant 
                             , _restName    :: String
                             , _restTables  :: [Table] 
                             , _restMenu    :: Menu
                             }
                  deriving (Show,Eq, Ord, Data, Typeable)

data Table = Table { _tableId:: Id Table,_tableName :: String }
             deriving (Show,Eq, Ord, Data, Typeable)

data Product = Product { _prodId :: Id Product 
                       , _productName :: String
                       }
               deriving (Show,Eq, Ord, Data, Typeable)

type Menu = [Product] 

data User = User { _userId :: Id User
                 } deriving (Show,Eq, Ord, Data, Typeable)

data OrderItem = OrderItem { _orderItemId :: Id OrderItem
                           , _orderItemProduct :: Product
                           } deriving (Show,Eq, Ord, Data, Typeable)

data UserOrder = UserOrder { _userOrder :: User 
                           , _nextOrderItemId :: Id OrderItem
                           , _userOrderProducts :: [OrderItem]
                           } deriving (Show,Eq,Ord,Data)


data Order = Order  { _orderId :: Id Order
                    , _orderRest :: Restaurant
                    , _orderTable :: Table
                    , _userOrders :: [UserOrder] 
                    , _closed :: Bool
                    } deriving (Show,Eq, Ord, Data, Typeable)

-- | FROM JSON

instance FromJSON OrderItemId where
    parseJSON v = OrderItemId <$> parseJSON v

instance FromJSON ProdId where
    parseJSON v = ProdId <$> parseJSON v

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
            emptyOrder 
            <$> v .: "user" 
            <*> v .: "nextId"
            where emptyOrder u n = UserOrder u n []

instance FromJSON Table where
        parseJSON (Object v) =
            Table
            <$> v .: "id"
            <*> v .: "name"
        parseJSON _ = mzero

instance FromJSON Restaurant where
    parseJSON (Object v) =
        toRestaurant 
            <$> v .: "id"
            <*> v .: "name"
            <*> v .: "tables"
            <*> v .: "menu" 
         where toRestaurant = Restaurant . RestId 
    parseJSON _ = mzero

instance FromJSON Product where
    parseJSON (Object v) =
        Product <$> v .: "id"
                <*> v .: "name"

-- TO JSON  

instance ToJSON OrderItemId where
    toJSON (OrderItemId i) = toJSON i

instance ToJSON ProdId where
    toJSON (ProdId i) = toJSON i

instance ToJSON TableId where
    toJSON (TableId i) = toJSON i

instance ToJSON UserId where
    toJSON (UserId i) = toJSON i

instance ToJSON OrderId where
    toJSON (OrderId i) = toJSON i

instance ToJSON Product where
    toJSON (Product i xs) = object ["id" .= i,"name" .= xs]

instance ToJSON User where
    toJSON (User id) = object ["id" .= id]

instance ToJSON OrderItem where
    toJSON (OrderItem i product) = object ["id" .= _unOrderItemId i,"product" .= product]

instance ToJSON UserOrder where
    toJSON (UserOrder user i xs) = object ["user" .= user,"nextId" .= i,"items" .= xs]

instance ToJSON Table where
    toJSON (Table id name) =
            object ["id" .= id,"name" .= name]

instance ToJSON Restaurant where
    toJSON r@Restaurant{..} =
            object ["name" .= _restName,"id" .= _unRestId _restId,"tables" .= _restTables,"menu" .= _restMenu]

--TODO split menu from order
instance ToJSON Order where
    toJSON (Order{..}) = 
            object ["id" .= _orderId
                   ,"restId" .= restId
                   ,"menu" .= _restMenu _orderRest
                   ,"tableId" .= _tableId _orderTable
                   ,"userOrders" .= _userOrders
                   ,"closed" .= _closed
                   ]
            where restId = _unRestId $ getId _orderRest

repeatList :: Int -> [a] -> [a]
repeatList 0 xs = xs
repeatList i xs = xs ++ repeatList (i-1) xs

-- | IDENTIFIABLE typeclass 

class Identifiable a where
    type Id a :: *
    getId :: a -> Id a

instance Identifiable Restaurant where
    type Id Restaurant = RestId
    getId = _restId

instance Identifiable Table where
    type Id Table =  TableId
    getId = _tableId

instance Identifiable User where
    type Id User =  UserId
    getId = _userId

instance Identifiable Order where
    type Id Order =  OrderId
    getId = _orderId

instance Identifiable OrderItem where
    type Id OrderItem =  OrderItemId
    getId = _orderItemId

instance Identifiable Product where
    type Id Product =  ProdId
    getId = _prodId

-- | LENSES 

makeLenses ''RestId
makeLenses ''UserId
makeLenses ''TableId
makeLenses ''OrderId
makeLenses ''OrderItemId
makeLenses ''ProdId

makeLenses ''User
makeLenses ''Table
makeLenses ''Restaurant
makeLenses ''Order
makeLenses ''OrderItem
makeLenses ''UserOrder
makeLenses ''Product
