{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE OverloadedStrings , TypeFamilies, FlexibleContexts #-}
{-# LANGUAGE DeriveDataTypeable,GeneralizedNewtypeDeriving,RecordWildCards,DataKinds,ScopedTypeVariables #-}

module Data.Storage 
where

import Data.SafeCopy        ( SafeCopy, base, deriveSafeCopy )
import Data.Acid            ( AcidState, Query, Update
                            , makeAcidic, openLocalState,liftQuery )
import Control.Monad.Reader ( ask )
import qualified Data.IxSet as IxSet
import qualified Data.List as List
import Data.IxSet           ( Indexable(..), IxSet(..), (@=)
                            , Proxy(..), getOne, ixFun, ixSet)
import Data.Data            (Data, Typeable)
import Control.Monad.State  ( get,put )
import Data.Aeson (ToJSON(..),object,(.=))
import Control.Monad.Trans.Maybe
import Data.HotBox          
import Control.Monad.Trans  ( MonadTrans, lift )
import Data.Maybe           (isJust)
import Control.Monad        (liftM)
import Control.Lens hiding  ((.=),Indexable)


data Storage = Storage { _restaurants :: IxSet Restaurant
                       , _nextRestId  :: Id Restaurant
                       , _users       :: IxSet User
                       , _nextUserId  :: UserId
                       , _orders      :: IxSet Order
                       , _nextOrderId :: OrderId
                       }

makeLenses ''Storage

instance ToJSON Storage where
    toJSON Storage{..} =
            object ["restaurants"   .= IxSet.toList _restaurants 
                   ,"nextRestId"    .= _unRestId _nextRestId
                   ,"users"         .= IxSet.toList _users
                   ,"nextOrderId"   .= _nextUserId
                   ,"orders"        .= IxSet.toList _orders
                   ,"nextOrderId"   .= _nextOrderId
                   ]

instance Indexable Restaurant where
  empty = ixSet 
        [ ixFun $ \r -> [ getId r ]
        ]

instance Indexable User where
  empty = ixSet 
        [ ixFun $ \r -> [ getId r ]
        ]
  
instance Indexable Order where
  empty = ixSet 
        [ ixFun $ \r -> [ getId r ]
        , ixFun $ \r -> [ (getId $ _orderRest r,getId $ _orderTable r) ]  
        , ixFun $ \r -> map (getId . _userOrder) (_userOrders r)   
        ]

-- | derive for safecopy
$(deriveSafeCopy 0 'base ''RestId)
$(deriveSafeCopy 0 'base ''UserId)
$(deriveSafeCopy 0 'base ''TableId)
$(deriveSafeCopy 0 'base ''OrderId)
$(deriveSafeCopy 0 'base ''OrderItemId)
$(deriveSafeCopy 0 'base ''ProdId)

$(deriveSafeCopy 0 'base ''User)
$(deriveSafeCopy 0 'base ''Table)
$(deriveSafeCopy 0 'base ''Restaurant)
$(deriveSafeCopy 0 'base ''Order)
$(deriveSafeCopy 0 'base ''OrderItem)
$(deriveSafeCopy 0 'base ''UserOrder)
$(deriveSafeCopy 0 'base ''Product)
$(deriveSafeCopy 0 'base ''Storage)

getAll :: (Ord a) => (Storage -> IxSet a) -> Query Storage [a]
getAll f = 
    do st <- ask
       return $ IxSet.toList (f st)

getAllUsers :: Query Storage [User]
getAllUsers = getAllUsers

restaurantsG :: Getter Storage [Restaurant]
restaurantsG = restaurants . to IxSet.toList

-- | get all restaurants from the storage
getAllRests :: Query Storage [Restaurant]
getAllRests =  view restaurantsG

getRestById ::  Id Restaurant -> Query Storage (Maybe Restaurant)
getRestById rid = 
    view $ restaurants . to (getOne . (@= rid))

-- | insert a new restaurant 
addNewRest :: Restaurant -> Update Storage Restaurant
addNewRest r = 
    do s@Storage{..} <- get
       let newR = r { _restId = _nextRestId }
       put $ s { _restaurants = IxSet.insert newR _restaurants
               , _nextRestId = succ _nextRestId
               }
       return newR
       
 -- | insert a new user 
addNewUser :: User -> Update Storage User
addNewUser user = 
    do s@Storage{..} <- get
       let newUser = user { _userId = _nextUserId }
       put $ s { _users = IxSet.insert newUser _users
               , _nextUserId = succ _nextUserId
               }
       return newUser 

-- | orders
getOrdersByRestAndTable :: Id Restaurant -> Id Table -> Query Storage [Order]
getOrdersByRestAndTable rid tid = 
    do s@Storage{..} <- ask
       return $ IxSet.toList $ _orders @= (rid,tid)

getWholeStorage :: Query Storage Storage
getWholeStorage = ask
 
getCurrentOrder :: Id Restaurant -> Id Table -> Query Storage (Maybe Order)
getCurrentOrder rid tid =
    do s@Storage{..} <- ask
       let ret = IxSet.toDescList (Proxy :: Proxy (Id Order)) $ _orders @= (rid,tid) 
       return $ case ret of
                 [] -> Nothing
                 (o@Order{..}:_) -> 
                     if _closed then Nothing
                                else Just o 

constructOpenEmptyOrderM :: Id Restaurant -> Id Table -> MaybeT (Query Storage) Order
constructOpenEmptyOrderM rid tid = 
    do s@Storage{..} <- ask
       rest@Restaurant{..} <- MaybeT $ getRestById rid
       table <- MaybeT $ return $ List.find ((== tid) . _tableId) _restTables
       return Order { _orderId = _nextOrderId
                            , _orderRest = rest
                            , _orderTable = table
                            , _userOrders = []
                            , _closed = False
                            }

closeCurrentOrderM :: Id Restaurant -> Id Table -> MaybeT (Update Storage) Order
closeCurrentOrderM rid tid = do
    cOrder <- MaybeT $ liftQuery $ getCurrentOrder rid tid
    s@Storage{..} <- get
    put $ s { _orders = IxSet.updateIx (_orderId cOrder) cOrder { _closed = True } _orders}
    return cOrder

closeCurrentOrder :: Id Restaurant -> Id Table -> Update Storage Bool
closeCurrentOrder rid tid =  
        liftM isJust (runMaybeT $ closeCurrentOrderM rid tid)  

addProductToCurrentOrderM :: Id Restaurant -> Id Table -> Id User -> Id Product -> MaybeT (Update Storage) OrderItem
addProductToCurrentOrderM rid tid uid pid= do
    cOrder <- MaybeT $ liftQuery $ getCurrentOrder rid tid
    cUserOrder <- MaybeT $ return $ List.find ((== uid) . _userId . _userOrder) (_userOrders cOrder)
    undefined

attachUserToCurrentOrderM :: Id Restaurant -> Id Table -> Id User -> MaybeT (Update Storage) Order
attachUserToCurrentOrderM rid tid uid = do
    -- find proper user
    user <- MaybeT $ fmap (getOne . (@= uid) . _users) get
    -- find current order
    cOrderM <- lift $ liftQuery $ getCurrentOrder rid tid
    cOrder <-  
        case cOrderM of
            -- new order must be created created
            Nothing ->  do
                order <- mapMaybeT liftQuery $ constructOpenEmptyOrderM rid tid
                s@Storage{..} <- get
                put $ s { _nextOrderId = succ _nextOrderId }
                return order { _userOrders = [UserOrder user []]}
            -- already exists
            Just order@Order{..} -> 
                if isJust (List.find ((== uid) . _userId . _userOrder) _userOrders)  -- user already in order 
                    then return order
                    else return order { _userOrders = _userOrders ++ [UserOrder user []]}

    -- update the userOrder
    s@Storage{..} <- get
    put $ s { _orders = IxSet.updateIx (_orderId cOrder) cOrder _orders}
    return cOrder

attachUserToCurrentOrder rid tid uid = runMaybeT $ attachUserToCurrentOrderM rid tid uid
 

$(makeAcidic ''Storage 
    ['getAllRests,'addNewRest,'getAllUsers,'addNewUser,'getRestById,'getOrdersByRestAndTable
    ,'getWholeStorage,'getCurrentOrder,'attachUserToCurrentOrder,'closeCurrentOrder
    ])

-- LENSES
