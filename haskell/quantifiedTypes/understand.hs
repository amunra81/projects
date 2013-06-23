{-# LANGUAGE ExistentialQuantification #-}
{-# LANGUAGE Rank2Types #-}

-- Quantified types

g:: (forall a. a -> a) -> (Bool,Char)
g f = (f True,f 'a')

x ::  (forall a. Num a => a -> a) -> ()
x f = let ff = f 2 in ()

data T = MkT (forall a.Show a => a)
-- GHCi g $ \a -> a
h:: ( Fractional b , Read b ) => (forall a.(Num a,Fractional a,Show a) => a) -> b
h x = let s = show x 
          y = read s 
          in y

some =  h
--
-- GHCi h 2

-- Existential polymorphic types

data Accum a = forall s. Show s => MkAccum s (a -> s) 

-- Compilation error : data Accum a = MkAccum s (a -> s)
accumList = [ MkAccum True (\ x -> read x), MkAccum 1 (\x -> let i = read x in i*2) ]  
