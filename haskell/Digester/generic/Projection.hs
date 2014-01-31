{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE ExistentialQuantification #-}
{-# LANGUAGE MultiParamTypeClasses #-}

module Projection (
-- * projection utils
project,projectToRoot,transform
) where

import Tree
import Monad
import Prelude hiding (div)
import Control.Monad.List
import Control.Monad.Trans.Maybe(MaybeT(..))

-- |project a tree based on a tree of divs. The projection result is a M(PassParent)
project :: (MonadPlus m, Countable m) => Tree m (Div m a) -> Tree m a -> m (PassParent m a)
project pTree tree = do
        -- project the main node
        tnode <- runDiv (value pTree) tree

        -- get the projected children
        let tchildren = do
                            x <- getChildren pTree
                            project x tnode

        -- construct the final node
        return $ node (value tnode) tchildren

-- |project a tree based on a tree of divs. The projection result is a M(Tree)
projectToRoot :: ( MonadPlus m, Countable m ) => Tree m (Div m a) -> Tree m a -> m (Tree m a)
projectToRoot pTree tree = do
        -- get the node from the projection
        tnode <- runDiv (value pTree) tree

        -- get the projected children
        let tchildren = do
                           x <- getChildren pTree
                           project x tnode

        -- construct the root
        return $ root (value tnode) tchildren

class Convertible m l where
   convert :: m a -> l a

instance Convertible [] [] where
    convert = id

instance Convertible [] (ListT IO)  where
    convert = na

instance Convertible (MaybeT IO) (ListT IO)  where
    convert m = ListT $ do 
                    a <- runMaybeT m
                    return $ maybe [] (\x -> [x]) a

instance Convertible (ListT IO) (ListT IO)  where
    convert = id

instance Convertible Maybe [] where
    convert (Just a)  = [a]
    convert Nothing = []

transform :: (Convertible m n,Monad m) => Tree m a -> Tree n a
transform n = case n of
                  Root a ch -> Root a (f ch)
                  Node a ch p pos -> Node a (f ch) (transform p) pos
               where f c = convert (c >>= \x -> return $ transform x)
