{-# LANGUAGE ForeignFunctionInterface #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}

module Data.Exports where
import Data.Transactions(startCounter2)
import GHC.Exts(FunPtr)
import Foreign.Storable(Storable(..))
import Foreign.Ptr(Ptr)

foreign export ccall "startC2" startCounter2 :: Int -> IO ()

foreign import ccall "&exp" a_exp :: FunPtr (Double -> Double)
foreign import ccall "dynamic" mkFun :: FunPtr (Double -> Double) -> Double -> Double

foreign export ccall getComplex :: Ptr Complex

getComplex :: Ptr Complex
getComplex = undefined

cexp :: Double -> Double
cexp = mkFun a_exp

data Complex = Complex Double Double
newtype Pair = Pair Complex deriving (Storable)

instance Storable Complex where
    alignment _ = alignment (undefined :: Double)
    sizeOf _ = 2 * sizeOf (undefined :: Double) -- stored complex size = 2 * size of a stored Double
    peek ptr = do
        real <- peekByteOff ptr 0
        img  <- peekByteOff ptr (sizeOf real) -- we skip the bytes containing the real part
        return $ Complex real img

    poke ptr (Complex real img) = do
        pokeByteOff ptr 0 real
        pokeByteOff ptr (sizeOf real) img
