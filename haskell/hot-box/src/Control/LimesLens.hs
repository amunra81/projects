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
restaurants' = restaurants .% toList
     where 
     toList = IxSet.toDescList (IxSet.Proxy :: IxSet.Proxy (Id Restaurant))

orders' :: Getter Storage [Order]
orders' = orders .% toList
     where 
     toList = IxSet.toDescList (IxSet.Proxy :: IxSet.Proxy (Id Order))

infixr 9 .%

-- | composing a 'lens like' with a function 
(.%) :: (Profunctor p, Contravariant f) =>  -- constraints
        (p s (f s) -> c) -- the lens like
        -> (s -> a) -- the function 
        -- returns 
        -> p a (f a) -> c
(.%) l f = l . to f 

restNames :: Fold Storage Restaurant
restNames =  restaurants' . traversed 





{-type Getter s a = forall f. (Contravariant f, Functor f) => (a -> f a) -> s -> f s-}

