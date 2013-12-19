{-# LANGUAGE TypeFamilies #-}
module TypeFamiliesPlay where

class MonadList m where
  data MList :: * -> *   
  toList :: m a -> MList a

class MonadListT n where
  toListM :: (MonadList m) => n m a -> n MList a 
