{-# LANGUAGE DeriveDataTypeable,TemplateHaskell,TypeFamilies ,RecordWildCards
             ,GeneralizedNewtypeDeriving,OverloadedStrings #-}
{-# LANGUAGE OverloadedStrings , TypeFamilies, FlexibleContexts #-}
{-# LANGUAGE DeriveDataTypeable,GeneralizedNewtypeDeriving,RecordWildCards,DataKinds #-}

module Data.Storage 
where

import Data.SafeCopy        ( SafeCopy, base, deriveSafeCopy )
import Data.Acid            ( AcidState, Query, Update
                            , makeAcidic, openLocalState )
import Control.Monad.Reader ( ask )
import qualified Data.IxSet as IxSet
import qualified Data.List as List
import Data.IxSet           ( Indexable(..), IxSet(..), (@=)
                            , Proxy(..), getOne, ixFun, ixSet)
import Data.Data            (Data, Typeable)
import Control.Monad.State  ( get,put )
import Data.Aeson (ToJSON(..),object,(.=))

import Data.HotBox          

data Storage = Storage { restaurants :: IxSet Restaurant
                       , nextRestId  :: Id Restaurant
                       , users       :: IxSet User
                       , nextUserId  :: UserId
                       , orders      :: IxSet Order
                       , nextOrderId :: OrderId
                       }

instance ToJSON Storage where
    toJSON Storage{..} =
            object ["restaurants"   .= IxSet.toList restaurants 
                   ,"nextRestId"    .= unRestId nextRestId
                   ,"users"         .= IxSet.toList users
                   ,"nextOrderId"   .= nextUserId
                   ,"orders"        .= IxSet.toList orders
                   ,"nextOrderId"   .= nextOrderId
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

-- | get all restaurants from the storage
getAllRests :: Query Storage [Restaurant]
getAllRests = getAll restaurants

getRestById ::  Int -> Query Storage (Maybe Restaurant)
getRestById rid = do
    st@Storage{..} <- ask
    return $ getOne $ restaurants @= RestId rid

-- | insert a new restaurant 
addNewRest :: Restaurant -> Update Storage Restaurant
addNewRest r = 
    do s@Storage{..} <- get
       let newR = r { _restId = nextRestId }
       put $ s { restaurants = IxSet.insert newR restaurants
               , nextRestId = succ nextRestId
               }
       return newR
       
 -- | insert a new user 
addNewUser :: User -> Update Storage User
addNewUser user = 
    do s@Storage{..} <- get
       let newUser = user { _userId = nextUserId }
       put $ s { users = IxSet.insert newUser users
               , nextUserId = succ nextUserId
               }
       return newUser 

-- | orders
getOrdersByRestAndTable :: Id Restaurant -> Id Table -> Query Storage [Order]
getOrdersByRestAndTable rid tid = 
    do s@Storage{..} <- ask
       return $ IxSet.toList $ orders @= (rid,tid)

getWholeStorage :: Query Storage Storage
getWholeStorage = ask
 
getCurrentOrder :: Id Restaurant -> Id Table -> Query Storage (Maybe Order)
getCurrentOrder rid tid =
    do s@Storage{..} <- ask
       let ret = IxSet.toDescList (Proxy :: Proxy (Id Order)) $ orders @= (rid,tid) 
       return $ case ret of
                 [] -> Nothing
                 (o@Order{..}:_) -> 
                     if _closed then Nothing
                                else Just o 
 

$(makeAcidic ''Storage 
    ['getAllRests,'addNewRest,'getAllUsers,'addNewUser,'getRestById,'getOrdersByRestAndTable
    ,'getWholeStorage,'getCurrentOrder 
    ])

