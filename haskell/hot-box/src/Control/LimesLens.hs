{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE RecordWildCards #-}

module Control.LimesLens where

import Control.Lens
import Data.HotBox
import Data.Storage
import Data.Acid            ( AcidState, Query, Update
                            , makeAcidic, openLocalState,liftQuery )
import qualified Data.IxSet as IxSet
import Data.IxSet           ( Indexable(..), IxSet(..), (@=)
                            , Proxy(..), getOne, ixFun, ixSet)
import Play.InitialStorageState
import Data.Data            (Data, Typeable)
import Http.Handlers

defRest = Restaurant (RestId 3) "Name" [] []
ss = defRest ^. restId . unRestId

defStorage :: Storage
defStorage = initialStorageState


restaurants' :: Getter Storage [Restaurant]
restaurants' = restaurants . to toList
     where 
     toList = IxSet.toDescList (IxSet.Proxy :: IxSet.Proxy (Id Restaurant))

restNames :: Fold Storage Restaurant
restNames =  restaurants' . traversed 
