{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE ExistentialQuantification #-}
{-# LANGUAGE MultiParamTypeClasses #-}
module Projection (
ProjX(..),Proj,ProjIO,ProjRIO
-- * projection tree constructors
,proot,pnode,pleaf,pnodeOrLeaf
-- * projection utils
,project,projectToRoot
) where

import Tree
import Monad
import Prelude hiding (div)
import Control.Monad.List
import Control.Monad.Trans.Reader(ReaderT)
import Control.Monad.Trans.Maybe

data ProjX l a = forall m. ( Monad m,Monad l,Convertible m l) => ProjX ( Div m a )

-- ProjX aliasses
type Proj a = ProjX [] a
type ProjIO a = ProjX (ListT IO) a
type ProjRIO r a = ProjX (ReaderT r (ListT IO)) a

-- * CONSTRUCTORS
proot :: ( Monad m,Monad l,Convertible m l)
      => Div m a 
      -> [PassParent (ProjX l a)] 
      -> Tree (ProjX l a)
proot = root . ProjX 

pnode :: ( Monad m,Monad l,Convertible m l)
      => Div m a 
      -> [PassParent (ProjX l a)] 
      -> PassParent (ProjX l a)
pnode = node . ProjX 

pleaf ::  ( Monad m,Monad l,Convertible m l)
      => Div m a 
      -> PassParent (ProjX l a)
pleaf = leaf . ProjX 

pnodeOrLeaf :: ( Monad m,Monad l,Convertible m l)
            => Div m a 
            -> [PassParent (ProjX l a)] 
            -> PassParent (ProjX l a)
pnodeOrLeaf = nodeOrLeaf . ProjX 

-- * Convertible
class Convertible m l where
   convert :: m a -> l a

instance Convertible [] [] where
    convert = id

instance Convertible (MaybeT IO) (ListT IO)  where
    convert m = ListT $ do 
                    a <- runMaybeT m
                    return $ maybe [] (\x -> [x]) a
                     
    --maybe (ListT . return []) id 

instance Convertible (ListT IO) (ListT IO)  where
    convert = id

instance Convertible Maybe [] where
    convert (Just a)  = [a]
    convert Nothing = []

projectNode :: ProjX l a -> Tree a -> l (Tree a)
projectNode (ProjX div) tree = convert $ runDiv  div tree
                                
project :: Monad l => Tree (ProjX l a) -> Tree a -> l (PassParent a)
project pTree tree = do
        -- get the node from the projection
        tnode <- projectNode (value pTree) tree -- r l

        -- get the projected children
        tchildren <- sequence $ map (\ pNode -> project pNode tnode) $ getChildren pTree

        -- construct the final node
        return $ nodeOrLeaf (value tnode) tchildren

projectToRoot :: Monad l => Tree (ProjX l a) -> Tree a -> l (Tree a)
projectToRoot pTree tree = do
        -- get the node from the projection
        tnode <- projectNode (value pTree) tree -- r l

        -- get the projected children
        tchildren <- sequence $ map (\ pNode -> project pNode tnode) $ getChildren pTree

        -- construct the root
        return $ root (value tnode) tchildren
