{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE OverloadedStrings , TypeFamilies, FlexibleContexts #-}
{-# LANGUAGE DeriveDataTypeable,GeneralizedNewtypeDeriving,RecordWildCards,DataKinds,ScopedTypeVariables #-}

module Control.Storage where
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
import Data.Aeson (ToJSON(..),object,)
import qualified Data.Aeson as Aeson
import Control.Monad.Trans.Maybe
import Data.HotBox          
import Control.Monad.Trans  ( MonadTrans, lift )
import Data.Maybe           (isJust)
import Control.Monad        (liftM)
import Control.Lens hiding  (Indexable)
import Data.Storage

getAll :: (Ord a) => (Storage -> IxSet a) -> Query Storage [a]
getAll f = 
    do st <- ask
       return $ IxSet.toList (f st)

getAllUsers :: Query Storage [User]
getAllUsers = getAllUsers

-- | get all restaurants from the storage
getAllRests :: Query Storage [Restaurant]
getAllRests =  view $ restaurants . to IxSet.toList

getRestById ::  Id Restaurant -> Query Storage (Maybe Restaurant)
getRestById rid = 
    view $ restaurants . to (getOne . (@= rid))

-- | insert a new restaurant 
addNewRest :: Restaurant -> Update Storage Restaurant
addNewRest r = do
    nextId <- nextRestId <<%= succ -- increment id and bind the old one
    let newR = set restId nextId r -- replace with next id
    restaurants %= IxSet.insert newR -- insert new restaurant
    return newR
       
 -- | insert a new user 
addNewUser :: User -> Update Storage User
addNewUser user = do
       nextId <- nextUserId <<%= succ -- increment id and bind the old one
       let newU = set userId nextId user -- replace with next id
       users %= IxSet.insert newU -- insert new user
       return newU

-- | orders
getOrdersByRestAndTable :: Id Restaurant -> Id Table -> Query Storage [Order]
getOrdersByRestAndTable rid tid = 
       view $ orders . to (IxSet.toList . (@= (rid,tid)))

getWholeStorage :: Query Storage Storage
getWholeStorage = ask
 
getCurrentOrder :: Id Restaurant -> Id Table -> Query Storage (Maybe Order)
getCurrentOrder rid tid = do
       ret <-  viewHead (orders . to queryOrders . traversed  )
       return $ case ret of
                 Nothing -> Nothing
                 Just o@Order{..} -> 
                     if _closed then Nothing
                                else Just o 
    where queryOrders o = IxSet.toDescList (Proxy :: Proxy (Id Order)) $ o @= (rid,tid)

viewItems l = do
            s <- ask
            return $ s ^.. l

viewHead l = do
            s <- ask
            return $ s ^? l

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
