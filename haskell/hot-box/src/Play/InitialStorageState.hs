module Play.InitialStorageState where

import Data.HotBox
import Data.Storage
import Play.InitialState

import qualified Data.IxSet as IxSet

initialStorageState  = Storage { restaurants = IxSet.fromList allRestaurants 
                               , nextRestId  = succ $ _restId (last allRestaurants)
                               , users       = IxSet.fromList allUsers
                               , nextUserId  = succ $ _userId (last allUsers)
                               , orders      = IxSet.fromList allOrders
                               , nextOrderId = succ $ _orderId (last allOrders)
                               }
