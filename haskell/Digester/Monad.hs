{-# LANGUAGE ViewPatterns #-}
module Monad(
-- * Types
DivCont,Div
-- * Utils
,runDiv
-- * Div constructors
,parentOf,equal,alt,first
,(...)
) where

import Tree
import Control.Monad.Cont
import Data.List
import Data.Function(fix)


type DivCont a = ContT (Tree a) Maybe (Tree a)
type Div a = Tree a -> DivCont a

runDiv ::  Div a -> Tree a -> Maybe (Tree a)
runDiv comp node = runContT (do x <- return node 
                                comp x) $ Just

equal :: Eq a => a ->  Div a
equal val node = ContT $ \next ->
                       if getVal node == val then next node 
                                             else Nothing
parentOf ::  Div a
parentOf node =  ContT $ 
    \next -> case getChildren node of
             HasChildren xs  -> findDiv next xs
             _               -> Nothing

specificChildAt :: Int -> Div a
specificChildAt pos node = ContT $ 
    \next -> case getChildren node of
            HasChildren xs  -> 
                if pos < length xs then next $ xs !! pos 
                else Nothing
            _               -> Nothing

rightBrother :: Div a
rightBrother node = ContT $ 
    \next -> case getRightBrothers node of
            x:xs -> findDiv next (x:xs)
            [] -> Nothing

leftBrother :: Div a
leftBrother node = ContT $ 
    \next -> case getLeftBrothers node of
            x:xs -> findDiv next (x:xs)
            [] -> Nothing

-- alternative paths
alt :: Div a -> Div a -> Div a
alt div1 div2 node =  ContT $ 
    \next -> case runContT (div1 node) next of
             Just node -> Just node
             _         -> runContT (div2 node) next

brother ::  Div a
brother = alt leftBrother rightBrother

childOf ::  Tree a -> ContT r Maybe (Tree a)
childOf node = ContT $ 
    \next -> case getParent node of
             HasParent parent -> next parent
             None             -> Nothing
    
subNodeOf ::  Div a
subNodeOf node = ContT $ \next ->
    let parents node = case getParent node of
                       HasParent parent -> parent : parents parent
                       None             -> []
    in
    findDiv next $ parents node

first :: Div a
first node = ContT $ 
    \next -> fix (\cont n1 -> case next n1 of
                         Just ret -> Just ret
                         _  ->    
                           case getChildren node of
                             HasChildren xs -> findDiv cont xs
                             _ -> Nothing) node

(...) ::  Monad m => (t -> m a) -> (a -> m b) -> t -> m b
f ... g = \b -> (f b) >>= g 

findDiv ::  (a -> Maybe b) -> [a] -> Maybe b
findDiv next xs = do 
                     x <- find isJust $ map next $ xs
                     x
