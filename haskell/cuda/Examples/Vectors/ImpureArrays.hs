module Examples.Vectors.ImpureArrays where

import qualified System.Random.Mersenne      as R
 
import qualified Data.Vector.Generic         as G
import qualified Data.Vector.Generic.Mutable as GM
import Data.Vector as V 

random :: (R.MTRandom a, G.Vector v a)
       => R.MTGen -> Int -> IO (v a)
random g n = do
    v  <- GM.new n
    fill v 0
    G.unsafeFreeze v
  where
    fill v i
        | i < n = do
            x <- R.random g
            GM.unsafeWrite v i x
            fill v (i+1)
        | otherwise = return ()

main :: IO (Vector Int)
main = do
    a <- R.getStdGen 
    random a 6 :: IO (Vector Int)
