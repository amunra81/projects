{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances #-} 
{-# LANGUAGE  OverlappingInstances #-}
import Control.Monad(MonadPlus)

data Time m e = Time e (m (Time m e)) 

get :: Time [] Integer
get = Time 1 []

doi :: Time Maybe Bool
doi = Time True $ Just $
      Time False $ Just $ 
      Time True $ Nothing 

trei :: Time [] Bool
trei = Time True [ Time False [], Time True []]

patru :: Time [] (Integer,Integer)
patru = Time (0,0) [ patru ]

cinci :: Integer -> Time Maybe Integer
cinci n = Time n m
         where m = if n <= 0 then Nothing
                           else Just $ cinci (n - 1)

instance Show (Time Maybe Integer) where
 show (Time n Nothing) = "\nTime " ++ (show n) 
 show (Time n (Just x) ) = "\nTime " ++ (show n) ++ (show x)

-- some advanced
instance (MonadPlus m,Monad m) => Monad (Time m) where
 return e = Time e (return (return e) )
 (Time m _) >>= f = f m
