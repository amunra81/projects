import Control.Monad.Fix

filter':: (a->Bool) -> [a] -> [a]
filter' f [] = []
filter' f (x:xs) = if f x then x:(filter' f xs) else (filter' f xs) 

-- GHCi filter' (<=3) [1,2,3,4,5]

filter'' = fix (\rec f xs -> 
                     case xs of
                     []    -> []
                     x:xs  -> (if f x then x:[] else []) ++ (rec f xs))

-- GHCi filter'' (<=3) [1,2,3,4,5]
