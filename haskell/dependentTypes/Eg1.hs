{-# LANGUAGE DataKinds, TypeFamilies #-}
module Eg1 where

data Nat = Z | S Nat

type family Plus (n :: Nat) (m :: Nat) :: Nat

type instance Plus Z m = m
type instance Plus (S n) m = S (Plus n m)


haqify ::  [Char] -> [Char]
haqify s = "Haq! " ++ s
