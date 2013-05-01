{-# LANGUAGE Arrows #-}

module ArrowFun where

import Control.Arrow hiding ((***),(&&&))
import Control.Category
import Prelude hiding (id,(.))


newtype SimpleFunc a b = SimpleFunc { runF :: (a -> b) }

instance Arrow SimpleFunc where
     arr f = SimpleFunc f
     first (SimpleFunc f) = SimpleFunc (mapFst f)
                   where mapFst g = \ (a,b) -> (g a, b)
     second (SimpleFunc f) = SimpleFunc (mapSnd f)
                   where mapSnd g = \ (a,b) -> (a, g b)

instance Category SimpleFunc where
     (SimpleFunc g) . (SimpleFunc f) = SimpleFunc (g . f)
     id = arr id

-- | Split is an arrow that splits a single value into a pair of duplicate values:
split :: (Arrow a) => a b (b, b)
split = arr (\x -> (x,x))

-- | Unsplit is an arrow that takes a pair of values and combines them to return a single value:
unsplit :: (Arrow a) => (b -> c -> d) -> a (b, c) d
unsplit = arr . uncurry  

-- | combines two arrows into a new arrow by running the two arrows on a pair of values (one arrow on the first item of the pair and one arrow on the second item of the pair).
f *** g = first f >>> second g

-- | combines two arrows into a new arrow by running the two arrows on the same value:
f &&& g = split >>> first f >>> second g

-- | LiftA2 makes a new arrow that combines the output from two arrows using a binary operation. It works by splitting a value and operating on both halfs and then combining the result:
liftA2 :: (Arrow a) => (b -> c -> d) -> a e b -> a e c -> a e d
liftA2 op f g = split >>> first f >>> second g >>> unsplit op

-- Example 1 --
-- --------- --

s1 = first $ SimpleFunc $ \ x -> x * x 
g1 = runF s1 (3,9)

s21 = SimpleFunc $ \ x -> x * x
s22 = SimpleFunc $ \ y -> y + y
g21 = s21 *** s22
g22 = s21 &&& s22
g23 = liftA2 (+) s21 s22 

-- Example 2 --
-- --------- --

h' :: SimpleFunc Int Int
h' = proc x -> do
      fx <- s21 -< x
      gx <- s22 -< x
      returnA -< (fx + gx)

hOutput' :: Int
hOutput' = runF h' 8
