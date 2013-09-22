{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE ExistentialQuantification #-}
module Projection (
-- * projection tree constructors
proot,pnode,pleaf,pnodeOrLeaf
-- * projection utils
,project,projectToRoot,MonadListT(..)
) where

import Tree
import Monad
import Control.Monad.Trans.List
import Control.Monad.Trans.Class
import Control.Monad.Trans.Maybe(MaybeT)
import Control.Monad.Trans.Maybe(runMaybeT)
import Prelude hiding (div)

data Proj a = forall m. (Monad m, MonadListT m ) => Proj ( Div m a )

proot :: (Monad m, MonadListT m) =>Div m a -> [PassParent (Proj a)] -> Tree (Proj a)
proot       n xs = root         (Proj n) xs

pnode :: (Monad m, MonadListT m) =>Div m a -> [PassParent (Proj a)] -> PassParent (Proj a)
pnode       n xs = node         (Proj n) xs

pleaf ::  (Monad m, MonadListT m) => Div m a -> PassParent (Proj a)
pleaf       n    = leaf         (Proj n) 

pnodeOrLeaf :: (Monad m, MonadListT m) =>Div m a -> [PassParent (Proj a)] -> PassParent (Proj a)
pnodeOrLeaf n xs = nodeOrLeaf   (Proj n) xs

class MonadListT m where
   toListT :: m a -> ListT IO a

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

projectNode :: Proj t -> Tree t -> ListT IO (Tree t)
projectNode (Proj div) tree = toListT $ runDiv div tree 

project :: Tree (Proj a) -> Tree a -> ListT IO (PassParent a)
project prjTree tree = do 
    tnode <- projectNode (value prjTree) tree 
    let childSeq = case children prjTree of 
                   None -> toListT []
                   HasChildren xs -> do -- ListT IO (PassParent a)
                                    x <- toListT xs
                                    project x tnode 
    lift $ do  -- :: IO 
        xs <- runListT $ childSeq -- :: IO [PassParent a], xs is a list
        return $ nodeOrLeaf (value tnode) xs -- :: IO (PassParent)

projectToRoot ::  Tree (Proj a) -> Tree a -> ListT IO (Tree a)
projectToRoot  prjTree tree = do 
        tnode <- projectNode (value prjTree) tree -- 
        let passParentList = case children prjTree of 
                          None -> toListT []
                          HasChildren xs -> do 
                                            x <- toListT xs -- ListT IO (PassParent a)
                                            project x tnode -- :: [PassParent t]

        lift $ do 
            xs <- runListT $ passParentList -- :: IO [PassParent a], xs is a list
            return $ root (value tnode) xs
