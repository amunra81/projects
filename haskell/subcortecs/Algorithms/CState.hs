module Algorithms.CState 
(CState(..),isSet) 
where
import Data.Array.Unboxed(UArray)
import Data.Word(Word8)
import Data.Array.IArray((!))


data CState = CState 
            { nCells :: Int
            , pData :: UArray Int Word8 
            }

isSet :: Int -> CState -> Bool
isSet ix cst = ((pData cst) ! ix ) /= 0
