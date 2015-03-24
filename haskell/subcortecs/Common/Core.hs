module Common.Core (foldli,UInt,UInt64,UChar,Real32,UInt32)
where

type UInt32 = Int
type UInt = UInt32
type UChar = Char
type UInt64 = Int
type Real32 = Double

foldli ::  Num i => (b -> i -> a -> b) -> b -> [a] -> b
foldli f a = snd . foldl g (-1,a)
                where g (i,acc) x = (i+1,f acc (i+1) x)
