module Algorithms.InSynapse(InSynapse) where
import Data.Word(Word32)
import Common.Core

data InSynapse = InSynapse 
               { _srcCellIdx :: Word32
               , _permanence :: Rational }

