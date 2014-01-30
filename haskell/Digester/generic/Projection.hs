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
projectToRoot :: (MonadPlus m, Countable m) => Tree m (Div m a) -> Tree m a -> m (Tree m a)
projectToRoot pTree tree = do
        -- get the node from the projection
        tnode <- runDiv (value pTree) tree

        -- get the projected children
        let tchildren = do
                           x <- getChildren pTree
                           project x tnode

        -- construct the root
        return $ root (value tnode) tchildren

transform :: (m a -> n a) -> Tree m a -> Tree n a
transform f n2 = case n2 of
                  Root a ch -> na
                  Node a ch parent pos -> na 

