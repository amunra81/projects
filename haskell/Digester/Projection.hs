{-# LANGUAGE ExistentialQuantification #-}
module Projection (
) where

import Tree
import Monad


data Proj a = forall m. MonadZero m => Proj (Div m a)

prj :: MonadZero m => Div m a -> Proj a
prj = Proj

(sdiv1:sdiv2:sdiv3:sdiv4:sdiv5:sdiv6:sdiv7:sdiv8:_) = map equal [1..]::[Div [] Integer]
(mdiv1:mdiv2:mdiv3:mdiv4:mdiv5:mdiv6:mdiv7:mdiv8:_) = map equal [1..]::[Div Maybe Integer]

proot n xs = root (Proj n) xs
pnode n xs = node (Proj n) xs
pleaf n = leaf (Proj n) 

d :: Tree (Proj Integer)
d = proot ( first ... sdiv8 ) [
                                pleaf mdiv5,
                                pnode sdiv1 [
                                            pleaf mdiv6]]

project :: Tree (Proj a) -> Tree a -> PassParent a
project prj tree = 
    let val = getVal prj
