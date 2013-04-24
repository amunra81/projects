module DivFactory() where

import Tree
import Monad
import Control.Monad(MonadPlus)
import Control.Monad.Cont

               
-- dig ( nodeIndex: int list ) div = 
--      nodeIndex |> Seq.fold ( fun acc pos -> specificChildAt pos acc neutralDiv ) initialDiv
