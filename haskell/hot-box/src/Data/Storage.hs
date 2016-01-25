{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE OverloadedStrings , TypeFamilies, FlexibleContexts #-}
{-# LANGUAGE DeriveDataTypeable,GeneralizedNewtypeDeriving,RecordWildCards,DataKinds,ScopedTypeVariables #-}

module Data.Storage 
where

import Data.SafeCopy        
import Data.Acid            ( AcidState, Query, Update
                            , makeAcidic, openLocalState,liftQuery )
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


data Storage = Storage { _restaurants :: IxSet Restaurant
                       , _nextRestId  :: Id Restaurant
                       , _users       :: IxSet User
                       , _nextUserId  :: UserId
                       , _orders      :: IxSet Order
                       , _nextOrderId :: OrderId
                       }

makeLenses ''Storage

instance ToJSON Storage where
    toJSON Storage{..} =
            object ["restaurants" Aeson..= IxSet.toList _restaurants 
                   ,"nextRestId"  Aeson..= _unRestId _nextRestId
                   ,"users"       Aeson..= IxSet.toList _users
                   ,"nextOrderId" Aeson..= _nextUserId
                   ,"orders"      Aeson..= IxSet.toList _orders
                   ,"nextOrderId" Aeson..= _nextOrderId
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
        , ixFun $ \r -> map (getId . _segmentUser) (_orderSegments r)   
        ]

-- | derive for safecopy
$(deriveSafeCopy 0 'base ''RestId)
$(deriveSafeCopy 0 'base ''UserId)
$(deriveSafeCopy 0 'base ''TableId)
$(deriveSafeCopy 0 'base ''OrderId)
$(deriveSafeCopy 0 'base ''OrderItemId)
$(deriveSafeCopy 0 'base ''ProdId)

$(deriveSafeCopy 0 'base ''User)
$(deriveSafeCopy 0 'base ''Table)
$(deriveSafeCopy 0 'base ''Restaurant)
$(deriveSafeCopy 0 'base ''WaiterResponse)
$(deriveSafeCopy 0 'base ''RequestAction)

instance SafeCopy a => SafeCopy (UserRequest a) where
   putCopy (Request{..}) = contain $ do safePut _reqAction;safePut _reqTime;safePut _reqUser;safePut _response
   getCopy = contain $ Request <$> safeGet <*> safeGet <*> safeGet <*> safeGet

$(deriveSafeCopy 0 'base ''Order)
$(deriveSafeCopy 0 'base ''OrderItemStatus)
$(deriveSafeCopy 0 'base ''OrderItem)
$(deriveSafeCopy 0 'base ''OrderSegment)
$(deriveSafeCopy 0 'base ''Product)
$(deriveSafeCopy 0 'base ''Storage)
