--{-# LANGUAGE EmptyDataDecls #-}

data T a
data S

put :: a -> a
put a = a

some a = put (a::Bool)
some2 a = put (a::S)

-- GHCi :t put (\a-> a::Bool) 
