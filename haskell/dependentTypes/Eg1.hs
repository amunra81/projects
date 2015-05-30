{-# LANGUAGE GADTs #-}
--{-# LANGUAGE StandaloneDeriving #-}
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE UndecidableInstances #-}

import Prelude hiding (tail, head,concat)
data Nat = Z | S Nat

infixl 6 :+
infixl 7 :*

type family   (n :: Nat) :+ (m :: Nat) :: Nat
type instance Z     :+ m = m
type instance S n :+ m = S (n :+ m)

type family   (n :: Nat) :* (m :: Nat) :: Nat
type instance Z     :* m = Z
type instance S n :* m = (n :* m) :+ m

data Vector a n where
  Nil  :: Vector a Z
  (:-) :: a -> Vector a n -> Vector a (S n)
infixr 5 :-

concat ::  Vector a n -> Vector a m -> Vector a (n :+ m)
concat Nil Nil = Nil
concat Nil (x :- xs) = x :- xs
concat (x :- xs) ys = x :- concat xs ys

--deriving instance Eq a => Eq (Vector a n)

toList :: Vector a n -> [a]
toList Nil = []
toList (x :- xs) = x : toList xs

instance Show a => Show (Vector a n) where
  showsPrec d = showsPrec d . toList
head :: Vector a (S n) -> a
head (x :- _) = x

tail :: Vector a (S n) -> Vector a n
tail (_ :- xs) = xs

main ::  IO (Vector Int ('S ('S ('S ('S 'Z)))))
main = do
  let a = (i :- 2 :- Nil)
  let b = (i :- 31 :- Nil)

  print $ head a
  print $ tail b
  print $ concat a b
  print $ concat b a

  return $ concat a b
  where i::Int
        i = 1
  -- | Uncommenting the line below causes type error
  --print $ head Nil
