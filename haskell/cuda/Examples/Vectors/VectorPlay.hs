{-# LANGUAGE BangPatterns #-}
module Examples.Vectors.VectorPlay where

import qualified Data.Vector.Storable as V
import Foreign 
import Foreign.C.Types

data Vecc4 = Vec4 {-# UNPACK #-} !CFloat
                  {-# UNPACK #-} !CFloat
                  {-# UNPACK #-} !CFloat
                  {-# UNPACK #-} !CFloat

instance Storable Vecc4 where
    sizeOf _    = sizeOf (undefined :: CFloat ) * 4
    alignment _ = alignment (undefined :: CFloat ) 

    peek p      = do
            a <- peekElemOff q 0
            b <- peekElemOff q 1
            c <- peekElemOff q 2
            d <- peekElemOff q 3
            return (Vec4 a b c d)
        where 
            q = castPtr p

    poke p (Vec4 a b c d) = do
            pokeElemOff q 0 a
            pokeElemOff q 1 b
            pokeElemOff q 2 c
            pokeElemOff q 3 d
        where 
            q = castPtr p

add :: Vecc4 -> Vecc4 -> Vecc4
{-# INLINE add #-}
add (Vec4 a b c d) (Vec4 a' b' c' d') = Vec4 (a+a') (b+b') (c+c') (d+d')

mult :: Vecc4 -> Vecc4 -> Vecc4
{-# INLINE mult #-}
mult (Vec4 a b c d) (Vec4 a' b' c' d') = Vec4 (a*a') (b*b') (c*c') (d*d')

vsum :: Vecc4 -> CFloat
{-# INLINE vsum #-}
vsum (Vec4 a b c d) = a+b+c+d

x,m :: Vecc4
x = Vec4 0.2 0.1 0.6 1.0
m = Vec4 0.99 0.7 0.8 0.6

multList :: Int -> V.Vector Vecc4 -> V.Vector Vecc4 
multList !count !src 
    | count <= 0    = src
    | otherwise    = multList (count-1) $ V.map (\v -> add (mult v m) x) src

main :: IO ()
main = 
    print $ V.sum
          $ V.map vsum
          $ multList repCount
          $ V.replicate arraySize (Vec4 0 0 0 0)
-- please build it with ghc -O2 if you want to see the result 
repCount, arraySize :: Int
repCount = 100000
arraySize = 20000

