{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE ExistentialQuantification #-}
module Projection (
-- * projection tree constructors
proot,pnode,pleaf,pnodeOrLeaf
-- * projection utils
,MonadListT(..)
--,project,projectToRoot
) where

import Tree
import Monad
import Control.Monad.Trans.List
import Control.Monad.Trans.Class
import Control.Monad.Trans.Maybe(MaybeT)
import Control.Monad.Trans.Maybe(runMaybeT)
import Prelude hiding (div)
import Control.Monad.Trans.Identity(IdentityT)
import Control.Monad.Trans.Reader(ReaderT)

-- aici sau la monadListT trebuie lucrat pentru a pune in applicare readerul pentru web
type Proj a = ProjX IdentityT a
data ProjX r a = forall m. ( Monad m, MonadListT m, MonadListTX r ) => ProjX ( Div (r m) a )

proot :: (Monad m, MonadListT m, MonadListTX r) 
        => Div (r m) a 
        -> [PassParent (ProjX r a)] 
        -> Tree (ProjX r a)
proot = root . ProjX 

pnode :: (Monad m, MonadListT m, MonadListTX r) 
        => Div (r m) a 
        -> [PassParent (ProjX r a)] 
        -> PassParent (ProjX r a)
pnode = node . ProjX 

pleaf :: (Monad m, MonadListT m, MonadListTX r) 
        => Div (r m) a 
        -> PassParent (ProjX r a)
pleaf = leaf . ProjX 

pnodeOrLeaf :: (Monad m, MonadListT m, MonadListTX r) 
            => Div (r m) a 
            -> [PassParent (ProjX r a)] 
            -> PassParent (ProjX r a)
pnodeOrLeaf = nodeOrLeaf . ProjX 

class MonadListT m where
   toListT :: m a -> ListT IO a

class MonadTrans n => MonadListTX n where
   toListTX :: (MonadListT m) => n m a -> n (ListT IO) a

instance MonadListTX (ReaderT a) where
    toListTX = error ""
    
instance MonadListT [] where
   toListT xs = ListT $ return xs

instance MonadListT Maybe where
   toListT (Just a) = ListT $ (return [a])
   toListT (Nothing) = ListT $ (return [])

instance MonadListT (ListT IO) where
   toListT m = m

instance MonadListT (MaybeT IO) where
   toListT m = 
    ListT $ do 
        x <- runMaybeT m
        case x of
         Just a -> return [a]
         Nothing -> return []

--projectNode :: Proj t -> Tree t -> ListT IO (Tree t)
--projectNode (Proj div) tree = toListT $ runDiv div tree 
--
--project :: Tree (Proj a) -> Tree a -> ListT IO (PassParent a)
--project prjTree tree = do 
--    tnode <- projectNode (value prjTree) tree 
--    let childSeq = case children prjTree of 
--                   None -> toListT []
--                   HasChildren xs -> do -- ListT IO (PassParent a)
--                                    x <- toListT xs
--                                    project x tnode 
--    lift $ do  -- :: IO 
--        xs <- runListT $ childSeq -- :: IO [PassParent a], xs is a list
--        return $ nodeOrLeaf (value tnode) xs -- :: IO (PassParent)
--
--projectToRoot ::  Tree (Proj a) -> Tree a -> ListT IO (Tree a)
--projectToRoot  prjTree tree = do 
--        tnode <- projectNode (value prjTree) tree -- 
--        let passParentList = case children prjTree of 
--                          None -> toListT []
--                          HasChildren xs -> do 
--                                            x <- toListT xs -- ListT IO (PassParent a)
--                                            project x tnode -- :: [PassParent t]
--
--        lift $ do 
--            xs <- runListT $ passParentList -- :: IO [PassParent a], xs is a list
--            return $ root (value tnode) xs
