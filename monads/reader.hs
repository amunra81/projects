import Control.Monad

newtype Reader r a = Reader { runReader :: r -> a } 

-- get a reader
simple :: Reader String Int
simple = Reader $ \str -> read str 

-- GHCi :t simple
-- GHCi runReader simple "343"

instance Monad ( Reader r ) where 
 return a = Reader $ \_ -> a
 m >>= k  = Reader $ \r -> runReader (k (runReader m r)) r

instance Monad ((->) r) where
   return a = \_ -> a
   m >>= f = \r -> f ( m r ) r  

max' x y = if x > y then x else y
min' x y = if max' x y == x then y else x

sameNumber = do
       mx <- max 5
       mn <- min mx
       return mn

-- GHCi sameNumber 3
-- GHCi sameNumber 6

limit5 = do
      mn <- min 5
      return mn
-- GHCi some 3
-- GHCi some 6

limit6 = min 5 >> min 6

-- GHCi some 3
-- GHCi some 6
