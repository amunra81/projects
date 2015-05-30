{-# LANGUAGE TemplateHaskell #-}
{- Encapsulate the arrays used to maintain per-cell state.-}
module Algorithms.CState 
(CState(..),isSet,nCells,pData) 
where
import Data.Array.Unboxed(UArray)
import Data.Word(Word8)
import Data.Array.IArray((!))
import Control.Lens

data CState = CState 
            { _nCells :: Int
            , _pData :: UArray Int Word8 
            }

makeLenses ''CState

isSet :: Int -> CState -> Bool
isSet i = (/= 0) . (! i) . view pData
