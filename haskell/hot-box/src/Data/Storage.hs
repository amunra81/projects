{-# LANGUAGE TemplateHaskell #-}
module Data.Storage (Storage(..),initialStorageState)where 
import Data.HotBox (Restaurant,User,UserOrder,Table,Product,allRestaurants)
import Data.SafeCopy        (SafeCopy, base, deriveSafeCopy)
import Data.Acid            ( AcidState, Query, Update
                            , makeAcidic, openLocalState )
import Control.Monad.Reader ( ask )

data Storage = Storage { restaurants :: [Restaurant] 
                       , users       :: [User] 
                       , orders      :: [UserOrder]
                       }

$(deriveSafeCopy 0 'base ''User)
$(deriveSafeCopy 0 'base ''Table)
$(deriveSafeCopy 0 'base ''Restaurant)
$(deriveSafeCopy 0 'base ''UserOrder)
$(deriveSafeCopy 0 'base ''Product)
$(deriveSafeCopy 0 'base ''Storage)

$(makeAcidic ''Storage [])

initialStorageState  = Storage allRestaurants [] []

peekCount :: Query Storage [Restaurant]
peekCount = restaurants <$> ask

