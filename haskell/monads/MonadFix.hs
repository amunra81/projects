module MonadFix where

import Data.IORef
import Control.Monad.Fix(mfix)

data Node = Node Int (IORef Node)

mknode ::  IO (IORef Node)
mknode = mfix (\p -> do
    p' <- newIORef (Node 0 p)
    putStrLn "node created"
    return p')

main :: IO ()
main = do
  p <- mknode
  Node x q <- readIORef p
  print x
  Node y _ <- readIORef q
  print y
