module Exercices where
import Prelude hiding (Either(..))





---------------- Create functor for Either -----------------------

data Either a b = Left a | Right b

instance Functor (Either e) where
 fmap _ (Left e) = Left e
 fmap g (Right a) = Right (g a)

instance (Show a, Show b) => Show (Either a b) where
 show (Left a) = "Left " ++ show a
 show (Right b) = "Right " ++ show b

testEither :: (Show a,Show e) => Either e a -> Either e String
testEither = fmap show 

------------------------------------------------------------------

---------------- Create functor for ITree ------------------------

data ITree a = Leaf (Int -> a) |
               Node [ITree a]
instance Functor ITree where
 fmap g (Leaf h) = Leaf $ g . h
 fmap g (Node xs) = Node $ map (fmap g) xs
