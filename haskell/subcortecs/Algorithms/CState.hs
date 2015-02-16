{-# LANGUAGE TemplateHaskell #-}
{- Encapsulate the arrays used to maintain per-cell state.-}
module Algorithms.CState 
(CState(..),isSet,
nCells,pData) 
where
import Data.Array.Unboxed(UArray)
import Data.Word(Word8)
import Data.Array.IArray((!))
import Data.Lens.Light(makeLens)

data CState = CState 
            { _nCells :: Int
            , _pData :: UArray Int Word8 
            }

isSet :: Int -> CState -> Bool
isSet i = (/= 0) . (! i) . _pData

makeLens ''CState
