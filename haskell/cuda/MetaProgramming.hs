module MetaProgramming where

import Control.Monad.Par.Meta.AccSMP
import Data.Array.Accelerate

trivEx :: Int -> Acc (Scalar Float)
trivEx no = let arr = generate (constant (Z :. no)) 
                          (\ _ -> 3 )
       in fold (+) 0 arr

triv ::  Acc (Scalar Float)
<<<<<<< HEAD
triv = trivEx 5002

runDirect :: Int -> IO ()
runDirect = print . CUDA.run . trivEx
=======
triv = trivEx 4

h :: Int 
h = undefined
>>>>>>> f2a1a4eaaf16e27db5deeb7de006fcdbcb08e8b8

k = case h of
    3 -> ""
--    undefined -> "asdas"

--runDirect :: Int ->  IO ()
--runDirect = print . CUDA.run . trivEx

<<<<<<< HEAD
hybrid :: Par (IVar Float)
hybrid = unsafeHybridWith CUDA.run (`indexArray` Z) 
                          (return 33.0, triv)

runHybrid ::  IO ()
runHybrid = print (runPar (hybrid >>= get))

=======
runWPar1 :: IO() --,runWPar2 ::  IO ()
runWPar1 = print $ runPar $ runAcc triv
--runWPar2 = print $ runPar $ runAccWith CUDA.run triv
--
--main :: IO ()
--main = runDirect 10
--
---- unsafe-hibrid
--
--hybrid :: Par (IVar Float)
--hybrid = unsafeHybridWith CUDA.run (`indexArray` Z) 
--                          (return 33.0, triv)
--
--runHybrid = print (runPar (hybrid >>= get))
>>>>>>> f2a1a4eaaf16e27db5deeb7de006fcdbcb08e8b8
