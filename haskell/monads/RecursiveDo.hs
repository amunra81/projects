{-# LANGUAGE RecursiveDo #-}
module RecursiveDo(na,Node(..),main) where
import Data.IORef

na :: t
na = error "Not implemented"

data Node = Node Int (IORef Node)

mknode ::  IO (IORef Node)
mknode = do
    rec p <- newIORef (Node 0 p)
    putStrLn "node created"
    return p

main :: IO ()
main = do
  p <- mknode
  Node x q <- readIORef p
  print x
  Node y _ <- readIORef q
  print y 
