{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE OverloadedStrings , TypeFamilies, FlexibleContexts #-}
{-# LANGUAGE Rank2Types #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE DeriveDataTypeable,GeneralizedNewtypeDeriving,RecordWildCards,DataKinds,ScopedTypeVariables #-}

module Control.Storage where
import Data.SafeCopy        ( SafeCopy, base, deriveSafeCopy )
import Data.Acid            
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
import Control.LimesLens
import Control.Monad.Trans.State (StateT)
import Control.Monad.State

getAllUsers :: Query Storage [User]
getAllUsers = getAllUsers

-- | get all restaurants from the storage
getAllRests :: Query Storage [Restaurant]
getAllRests =  view $ restaurants . to IxSet.toList

getRestById ::  Id Restaurant -> Query Storage (Maybe Restaurant)
getRestById rid = 
    view $ restaurants . _ixGetById rid

toUpdate :: State s r -> Update s r
toUpdate h = do
                st <- get
                let (r,nSt)  = runState h st
                put nSt
                return r
zoomU l m = toUpdate $ zoom l m

-- | insert a new restaurant 
addNewRest :: Restaurant -> Update Storage Restaurant
addNewRest r = do
    -- play
    {-rests . restHead . traversed . restId .= RestId 3-}
    -- end play
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
getOrdersByRestAndTable rid tid = view $ orders .% (IxSet.toList . (@= (rid,tid)))

getWholeStorage :: Query Storage Storage
getWholeStorage = ask

getCurrentOrder :: Id Restaurant -> Id Table -> Query Storage (Maybe Order)
getCurrentOrder rid tid = view $ orders . _currentOrder rid tid

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

closeCurrentOrder :: Id Restaurant -> Id Table -> Update Storage Bool
closeCurrentOrder rid tid =  
    zoomU (orders . _currentOrder rid tid ) $ 
    get >>= maybe (return False) 
                  (const $ _Just . closed <.= True) 

attachUserToCurrentOrder :: Id Restaurant -> Id Table -> Id User -> Update Storage (Maybe Order)
attachUserToCurrentOrder rid tid uid = runMaybeT $ do
    -- find proper user / restaurant and table
    user <-  liftPrism $ users . _ixGetById uid . _Just
    (rest,table) <-  liftPrism $ restaurants . _getRestAndTable rid tid . _Just
    currentOrderM <- use (orders . _currentOrder rid tid)
    MaybeT $ case currentOrderM of
     Just o -> do
        let condition = (== uid) . _userId . _userOrder
        let userM  = firstOf (userOrders . traversed . filtered condition) o
        case userM of
            Just _ -> return (Just o) -- user already attached
            Nothing -> 
                zoomU (orders . _ixGetById (_orderId o)) 
                      (do
                        _Just . userOrders .= (o ^. userOrders) ++ [UserOrder { _userOrder = user
                                                                              , _userOrderProducts = []}]
                        get)
     Nothing -> do
                nextId <- nextOrderId <<%= succ
                orders . _ixGetById nextId <.= 
                         Just Order { _orderId = nextId
                                    , _orderRest = rest
                                    , _orderTable = table
                                    , _userOrders = []
                                    , _closed = False
                                    }
    
$(makeAcidic ''Storage 
    ['getAllRests,'addNewRest,'getAllUsers,'addNewUser,'getRestById,'getOrdersByRestAndTable
    ,'getWholeStorage,'getCurrentOrder,'attachUserToCurrentOrder,'closeCurrentOrder
    ])

-- LENSES
