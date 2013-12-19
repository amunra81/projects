{-# LANGUAGE TypeFamilies #-}
module TypeFamiliesPlay where
import Control.Monad.Trans.Identity

class MonadList m where
  type MList m 
  toList :: m a -> (MList m) a

class MonadListT n where
  toListM :: (MonadList m) => n m a -> n (MList m) a 


instance MonadList Maybe where
  type MList Maybe = []
  toList (Just a) = [a]
  toList _ = []

instance MonadListT IdentityT where
  toListM = IdentityT . toList . runIdentityT

p = Just 3

r = runIdentityT $ toListM $ IdentityT p
