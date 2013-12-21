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
import Control.Monad.Trans.Identity
import Control.Monad.Trans.Reader(ReaderT)

data ProjX r l a = forall m. ( Monad (r m),Monad (r l), Convertible (r m) (r l),MonadTrans r) => ProjX ( Div (r m) a )

-- ProjX aliasses
type Proj a = ProjX IdentityT [] a
type ProjIO a = ProjX IdentityT (ListT IO) a
type ProjRIO r a = ProjX (ReaderT r) (ListT IO) a

-- * CONSTRUCTORS
proot :: ( Monad (r m),Monad (r l), Convertible (r m) (r l),MonadTrans r) 
      => Div (r m) a 
      -> [PassParent (ProjX r l a)] 
      -> Tree (ProjX r l a)
proot = root . ProjX 

pnode :: ( Monad (r m),Monad (r l), Convertible (r m) (r l),MonadTrans r) 
      => Div (r m) a 
      -> [PassParent (ProjX r l a)] 
      -> PassParent (ProjX r l a)
pnode = node . ProjX 

pleaf ::  ( Monad (r m),Monad (r l), Convertible (r m) (r l),MonadTrans r) 
      => Div (r m) a 
      -> PassParent (ProjX r l a)
pleaf = leaf . ProjX 

pnodeOrLeaf :: ( Monad (r m),Monad (r l), Convertible (r m) (r l),MonadTrans r) 
            => Div (r m) a 
            -> [PassParent (ProjX r l a)] 
            -> PassParent (ProjX r l a)
pnodeOrLeaf = nodeOrLeaf . ProjX 

-- * CLASSES
class Convertible m l where
   convert :: m a -> l a

instance Convertible [] [] where
    convert = id

instance Convertible (ListT IO) (ListT IO)  where
    convert = id

instance Convertible Maybe [] where
    convert (Just a)  = [a]
    convert Nothing = []

-- trebuie neaparat sa vezi cu arrows si la MonadNonZero din Monad.hs
instance Convertible a b => Convertible (IdentityT a) (IdentityT b) where
    convert = IdentityT . convert . runIdentityT 

projectNode :: ProjX r l a -> Tree a -> r l (Tree a)
projectNode (ProjX div) tree = convert $ runDiv  div tree
                                
project :: Monad (r l) => Tree (ProjX r l a) -> Tree a -> r l (PassParent a)
project pTree tree = do
        -- get the node from the projection
        tnode <- projectNode (value pTree) tree -- r l

        -- get the projected children
        tchildren <- foldM (\ xs prjNode -> do 
                                    cnode <- project prjNode tnode
                                    return $ xs++[cnode]) 
                  [] $ getChildren pTree  

        -- construct the final node
        return $ nodeOrLeaf (value tnode) tchildren

projectToRoot :: Monad (r l) => Tree (ProjX r l a) -> Tree a -> r l (Tree a)
projectToRoot pTree tree = do
        -- get the node from the projection
        tnode <- projectNode (value pTree) tree -- r l

        -- get the projected children
        tchildren <- foldM (\ xs prjNode -> do 
                                    cnode <- project prjNode tnode
                                    return $ xs++[cnode]) 
                  [] $ getChildren pTree  

        -- construct the root
        return $ root (value tnode) tchildren
