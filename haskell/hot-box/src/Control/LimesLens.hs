{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE Rank2Types #-}
{-# LANGUAGE FlexibleContexts #-}

module Control.LimesLens where

import Control.Monad.Reader ( ask )
import Control.Lens hiding (Indexable)
import Data.HotBox
import Data.Storage
import Data.Acid            ( AcidState, Query, Update
                            , makeAcidic, openLocalState,liftQuery )
import qualified Data.IxSet as IxSet
import Data.IxSet           ( Indexable(..), IxSet(..), (@=)
                            , Proxy(..), getOne, ixFun, ixSet)
import Play.InitialStorageState
import Data.Data            (Data, Typeable)
import Control.Monad.Trans  (lift)
import Control.Monad.Trans.Maybe
import Control.Monad.State.Class

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

rests :: Lens' Storage [Restaurant]
rests = lens undefined undefined

restHead :: Lens' [Restaurant] (Maybe Restaurant)
restHead = undefined

fMap,fMap2 :: (a -> b -> c) -> a -> c
fMap = undefined
fMap2 = undefined

fMapMerge = fMap2 . fMap2 . fMap2

sMap :: (a -> c) -> f a -> b
sMap = undefined

sMapC = (.) sMap sMap

_head2 :: Prism' [a] a
_head2 =  prism' setter getter
    where setter b = undefined  
          getter = undefined

viewItems l = do
            s <- ask
            return $ s ^.. l

viewPrism l = do
               s <-  ask
               return $ preview l s

liftPrism l = do
                s <-  get
                let p = preview l s
                MaybeT $ return p

usePrism l = get >>= return . preview l

viewHead l = do
            s <- ask
            return $ s ^? l

_ixGetById :: (Ord a,Typeable k,Typeable a,Indexable a) => k -> Lens' (IxSet a) (Maybe a)
_ixGetById uid = lens getter setter
    where 
        getter = getOne . (@= uid)
        setter ix = maybe ix (\a -> IxSet.updateIx uid a ix)  

-- warning do not remove if posible any item
_ixBiQuery :: (Identifiable a,Ord a,Typeable (Id a),Typeable a,Indexable a) 
           => (IxSet a -> [a]) -> Lens' (IxSet a) [a]
_ixBiQuery qr = lens getter setter
    where 
        getter   = qr
        setter   = foldl (flip update)
        update x = IxSet.updateIx (getId x) x

_currentOrder :: Id Restaurant -> Id Table -> Lens' (IxSet Order) (Maybe Order)
_currentOrder rid tid = lens getter setter  
   where 
         getter = preview (_ixBiQuery queryOrders . _head . filtered (not . _closed))
         --setter
         setter ix = maybe ix (\o -> IxSet.updateIx (getId o) o ix)  
         -- getter query function
         queryOrders ix = IxSet.toDescList (Proxy :: Proxy (Id Order)) $ ix @= (rid,tid)

_getRestAndTable :: Id Restaurant -> Id Table -> Getter (IxSet Restaurant) (Maybe (Restaurant,Table))
_getRestAndTable rid tid = to getter
    where 
         getter ix =do 
                    rest <- view (_ixGetById rid) ix
                    table <- firstOf (restTables . traversed . filtered ((== tid) . _tableId)) rest
                    return (rest,table)
