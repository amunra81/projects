module MetaProgramming where

import Control.Monad.Par.Meta.AccSMP
import Data.Array.Accelerate
import Data.Array.Accelerate.CUDA as CUDA

trivEx :: Int -> Acc (Scalar Float)
trivEx no = let arr = generate (constant (Z :. no)) 
                          (\ _ -> 3 )
       in fold (+) 0 arr

triv ::  Acc (Scalar Float)
triv = trivEx 5002

runDirect :: Int -> IO ()
runDirect = print . CUDA.run . trivEx

runWPar1,runWPar2 ::  IO ()
runWPar1 = print $ runPar $ runAcc triv
runWPar2 = print $ runPar $ runAccWith CUDA.run triv

main :: IO ()
main = runDirect 10

-- unsafe-hibrid

hybrid :: Par (IVar Float)
hybrid = unsafeHybridWith CUDA.run (`indexArray` Z) 
                          (return 33.0, triv)

runHybrid ::  IO ()
runHybrid = print (runPar (hybrid >>= get))

