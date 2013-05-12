{-# LANGUAGE ExistentialQuantification #-}
module Projection (
-- * projection tree constructors
proot,pnode,pleaf,pnodeOrLeaf
-- * projection utils
,project,projectToRoot,MonadListT(..)
) where

import Tree
import Monad
import Data.Foldable(toList,Foldable)
import Control.Monad.Trans.List
import Control.Monad.Trans.Class

data Proj a = forall m. (Monad m,MonadListT m ) => Proj ( Div m a )

proot       n xs = root         (Proj n) xs
pnode       n xs = node         (Proj n) xs
pleaf       n    = leaf         (Proj n) 
pnodeOrLeaf n xs = nodeOrLeaf   (Proj n) xs

class MonadListT m where
   toListT :: m a -> ListT IO a

instance MonadListT [] where
   toListT xs = ListT $ return xs

instance MonadListT Maybe where
   toListT (Just a) = ListT $ (return [a])
   toListT (Nothing) = ListT $ (return [])

projectNode :: Proj t -> Tree t -> ListT IO (Tree t)
projectNode (Proj div) node = toListT $ runDiv div node 


project ::  Tree (Proj a) -> Tree a -> ListT IO (PassParent a)
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
