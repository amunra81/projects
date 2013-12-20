{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE ExistentialQuantification #-}
{-# LANGUAGE MultiParamTypeClasses #-}
module Projection (
-- * projection tree constructors
proot,pnode,pleaf,pnodeOrLeaf
-- * projection utils
--,MonadListT(..)
--,project,projectToRoot
) where

import Tree
import Monad
import Prelude hiding (div)
import Control.Monad.List
import Control.Monad.Trans.Identity(IdentityT)
import Data.List.Class


-- aici sau la monadListT trebuie lucrat pentru a pune in applicare readerul pentru web
type Proj a = ProjX IdentityT (ListT IO) a
data ProjX r l a = forall m. ( Monad m, Convertable m l,List l ) => ProjX ( Div (r m) a )

-- * CONSTRUCTORS
proot :: ( Monad m, Convertable m l,List l)
      => Div (r m) a 
      -> [PassParent (ProjX r l a)] 
      -> Tree (ProjX r l a)
proot = root . ProjX 

pnode :: ( Monad m, Convertable m l,List l) 
      => Div (r m) a 
      -> [PassParent (ProjX r l a)] 
      -> PassParent (ProjX r l a)
pnode = node . ProjX 

pleaf ::  ( Monad m, Convertable m l,List l) 
      => Div (r m) a 
      -> PassParent (ProjX r l a)
pleaf = leaf . ProjX 

pnodeOrLeaf :: ( Monad m, Convertable m l,List l) 
            => Div (r m) a 
            -> [PassParent (ProjX r l a)] 
            -> PassParent (ProjX r l a)
pnodeOrLeaf = nodeOrLeaf . ProjX 

-- * CLASSES
class Convertable m l where
   convert :: m a -> l a

instance Convertable m m where
    convert = id

projectNode :: ProjX r l t -> Tree t -> r l (Tree t)
projectNode (ProjX rt) tree = err -- toListTX $ rt 

----toListTX $ runDiv div tree 

--instance MonadListT Maybe where
--   toListT (Just a) = ListT $ (return [a])
--   toListT (Nothing) = ListT $ (return [])
--
--instance MonadListT (ListT IO) where
--   toListT m = m
--
--instance MonadListT (MaybeT IO) where
--   toListT m = 
--    ListT $ do 
--        x <- runMaybeT m
--        case x of
--         Just a -> return [a]
--         Nothing -> return []
--
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
