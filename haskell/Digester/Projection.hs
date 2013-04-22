{-# LANGUAGE ExistentialQuantification #-}
module Projection (
-- * projection tree constructors
proot,pnode,pleaf,pnodeOrLeaf
-- * projection utils
,project,projectToRoot
) where

import Tree
import Monad
import Data.Foldable(toList)

data Proj a = forall m. MonadZero m => Proj ( Div m a )

proot       n xs = root         (Proj n) xs
pnode       n xs = node         (Proj n) xs
pleaf       n    = leaf         (Proj n) 
pnodeOrLeaf n xs = nodeOrLeaf   (Proj n) xs

projectNode ::  Proj t -> Tree t -> [Tree t]
projectNode (Proj div) node = toList $ runDiv div node 

project ::  Tree (Proj a) -> Tree a -> [PassParent a]
project prjTree tree = 
    do 
        tnode <- projectNode (getVal prjTree) tree -- :: [Tree t]
        let children = case getChildren prjTree of -- :: [PassParent t]
                        None -> []
                        HasChildren xs -> do 
                                            x <- xs -- :: Tree (Proj t)
                                            project x tnode -- :: [PassParent t]
        return $ nodeOrLeaf (getVal tnode) children

projectToRoot ::  Tree (Proj a) -> Tree a -> [Tree a]
projectToRoot  prjTree tree = 
    do 
        tnode <- projectNode (getVal prjTree) tree -- :: [Tree t]
        let passParentList = case getChildren prjTree of -- :: [PassParent t]
                          None -> []
                          HasChildren xs -> do 
                                            x <- xs -- :: Tree (Proj t)
                                            project x tnode -- :: [PassParent t]

        return $ root (getVal tnode) passParentList
