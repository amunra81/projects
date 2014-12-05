module Algorithms.Segment where

import Algorithms.InSynapse
import Data.Word(Word32)
import Data.List(sort)

data InSynapses = InSynapses {  _srcCellIdx :: Word32,
                                _permanence :: Rational } deriving Show

data Segment = Segment 
             { inSynapses :: InSynapse
             , frequency :: Rational
             , seqSegFlag :: Bool
             , permConnected :: Rational
             , iteration :: Word32 }


quicksort (x:xs) = quicksort [y | y <- xs, y <= x]  
                   ++ [x] ++ 
                   quicksort [y | y <- xs, y > x]
quicksort [] = []

