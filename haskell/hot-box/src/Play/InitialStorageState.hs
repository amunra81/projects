module Play.InitialStorageState where

import Data.HotBox
import Data.Storage
import Play.InitialState

import qualified Data.IxSet as IxSet

initialStorageState  = Storage { _restaurants = IxSet.fromList allRestaurants 
                               , _nextRestId  = succ $ _restId (last allRestaurants)
                               , _users       = IxSet.fromList allUsers
                               , _nextUserId  = succ $ _userId (last allUsers)
                               , _orders      = IxSet.fromList allOrders
                               , _nextOrderId = succ $ _orderId (last allOrders)
                               }
