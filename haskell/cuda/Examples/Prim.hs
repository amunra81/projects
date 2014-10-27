{-# LANGUAGE TypeOperators #-}
module Examples.Prim where 

import Data.Array.Accelerate 
import Data.Array.Accelerate as Acc
import Data.Array.Accelerate.CUDA as CUDA

dotp :: Vector Float -> Vector Float -> Acc (Scalar Float)
--dotp :: (Elt a, Shape z, IsNum a) =>Array (z :. Int) a -> Array (z :. Int) a -> Acc (Array z a)
dotp xs ys = let xs' = use xs
                 ys' = use ys
             in
             Acc.fold (+) 0 (Acc.zipWith (*) xs' ys')

-- ma joc cu operatorul pentru tip
type XIM0 = Z
type XIM1 = XIM0 :. Int
type XIM2 = XIM1 :. Int
type XIM3 = XIM2 :. Int

type Lupu a b = (a,b) :. Int
type Lupu2 a b = ((a,b),Int)

doi :: Lupu Int String -> String
doi ((1,"") :. _) = "L-am prins"
doi _ = "Inca nu"

triv :: Acc (Scalar Float)
triv = let arr = generate (constant (Z :. (100::Int))) 
                          (\ i -> 3.3 )
       in fold (+) 0 arr

runDirect = print $ CUDA.run $ triv
runDirect2 = print $ CUDA.run $ dotp (fromList (Z:.2) [1..2]) (fromList (Z:.2) [1..2])
