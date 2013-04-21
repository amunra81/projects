{-# LANGUAGE ExistentialQuantification #-}
module Projection (
) where

import Tree
import Monad
import Data.Foldable(toList)


data Proj a = forall m. MonadZero m => Proj ( Div m a )

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

getDiv' ::  Proj t -> Tree t -> [Tree t]
getDiv' (Proj div) n = toList $ runDiv div n

-- project :: Tree (Proj a) -> Tree a -> [PassParent a]
-- project prjTree tree =
--     map (\a -> node (getVal a) []) list
--     where
--     list = toList m     -- :: [Tree a]
--     m    = runDiv div1 tree -- :: m (Tree a)
--     div1  = case getVal prjTree of   -- :: Div m a
--             Proj x -> x 
-- 

    
 
 
