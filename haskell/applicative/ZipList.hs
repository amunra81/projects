module ZipList where 

import Control.Applicative hiding (ZipList(..))
newtype ZipList a = ZipList { getZipList :: [a] }
 
instance Functor ZipList where
 fmap g = ZipList . (fmap g) . getZipList

instance Applicative ZipList where
  pure = ZipList . (:[])
  (ZipList gs) <*> (ZipList xs) = ZipList (zipWith ($) gs xs)

s = 4  / 0
