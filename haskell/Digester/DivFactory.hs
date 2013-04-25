module DivFactory() where

import Tree
import Monad
import Control.Monad(MonadPlus)
import Control.Monad.Cont

path :: MonadPlus m =>Tree a -> Tree a -> Div m a
path fromNode toNode = 
    ( escalate level ) ... dig (tail toIndex)
    where 
    ( fromIndex, toIndex ) = commonIndexes fromNode toNode 
    level =  length fromIndex - 1
