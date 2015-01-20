module Common.Core (foldli) 
where

foldli ::  Num i => (b -> i -> a -> b) -> b -> [a] -> b
foldli f a = snd . foldl g (-1,a)
                where g (i,acc) x = (i+1,f acc (i+1) x)
