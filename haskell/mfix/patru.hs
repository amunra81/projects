{-# LANGUAGE RecursiveDo #-}
import Data.IORef
data BTree = Z | B (IORef Int) BTree BTree
repsum t = mdo
    s <- rep_x_sum t s
    putStrLn ""
    return ()
 
rep_x_sum Z _ = return 0
rep_x_sum (B ref l r) s = do
  i <- readIORef ref
  writeIORef ref s
  putStr "("
  sl <- rep_x_sum l s
  putStr (show i)
  sr <- rep_x_sum r s
  putStr ")"
  return (i + sl + sr)
main = do
  r4 <- newIORef 4
  r3 <- newIORef 3
  r5 <- newIORef 5
  r1 <- newIORef 1
  let t = (B r4 (B r3 Z Z) (B r5 Z (B r1 Z Z)))
  repsum t
  repsum t
