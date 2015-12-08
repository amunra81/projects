module Play.InitialStorageState where

import Data.HotBox
import Data.Storage
import Play.InitialState

import qualified Data.IxSet as IxSet

initialStorageState  = Storage rests nextRestId users nextUserId orders nextOrderId
                       where rests      = IxSet.fromList allRestaurants 
                             nextRestId = RestId $ succ $ IxSet.size rests
                             users      = IxSet.fromList allUsers
                             nextUserId = UserId $ succ $ IxSet.size users
                             orders     = IxSet.fromList $ allOrders
                             nextOrderId = OrderId 0
