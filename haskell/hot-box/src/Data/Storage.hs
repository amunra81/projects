{-# LANGUAGE DeriveDataTypeable,TemplateHaskell,TypeFamilies ,RecordWildCards
             ,GeneralizedNewtypeDeriving #-}

module Data.Storage (Storage(..),initialStorageState,GetAllRests(..)
                    ,GetAllUsers(..),AddNewUser(..),AddNewRest(..))
where 

import Data.HotBox          ( Restaurant(..), User(..), UserOrder(..)
                            , Table(..), Product(..), allRestaurants )
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

data Storage = Storage { restaurants :: IxSet Restaurant
                       , nextRestId  :: Int
                       , users       :: IxSet User
                       , nextUserId  :: Int
                       , orders      :: [UserOrder]
                       }

newtype RestaurantId = RestId { unRestId :: Int }
    deriving (Eq, Ord, Data, Enum, Typeable)

newtype UserId = UserId { unUserId :: Int }
    deriving (Eq, Ord, Data, Enum, Typeable)

instance Indexable Restaurant where
  empty = ixSet 
        [ ixFun $ \r -> [ RestId $ _id r ]
        ]

instance Indexable User where
  empty = ixSet 
        [ ixFun $ \r -> [ UserId $ _userId r ]
        ]
  
-- | derive for safecopy
$(deriveSafeCopy 0 'base ''User)
$(deriveSafeCopy 0 'base ''RestaurantId)
$(deriveSafeCopy 0 'base ''Table)
$(deriveSafeCopy 0 'base ''Restaurant)
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

-- | insert a new restaurant 
addNewRest :: Restaurant -> Update Storage Restaurant
addNewRest r = 
    do s@Storage{..} <- get
       let newR = r { _id = nextRestId }
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

$(makeAcidic ''Storage ['getAllRests,'addNewRest,'getAllUsers,'addNewUser])

initialStorageState  = Storage rests nextRestId users nextRestId []
                       where rests      = IxSet.fromList allRestaurants 
                             nextRestId = succ $ IxSet.size rests
                             users      = IxSet.fromList []
                             nextUserId = succ $ IxSet.size users
