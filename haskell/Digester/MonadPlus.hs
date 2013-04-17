
module MonadPlus(
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
import Data.Monoid



-------------------
 -- Monad Zero --
-------------------

class MonadPlus m => MonadZero m where
    miszero :: m a -> Bool

instance MonadZero [] where
    miszero [] = True
    miszero _ = False

instance MonadZero Maybe where 
    miszero Nothing = True
    miszero _ = False

---------------------------
 -- Div types and utils --
---------------------------

type DivCont m a = ContT (Tree a) m (Tree a)
type Div m a = Tree a -> DivCont m a

findDiv ::  MonadPlus m => (b -> m a) -> [b] -> m a
findDiv next xs = foldl (\acc n -> mplus acc (next n)) mzero xs

runDiv ::  MonadPlus m => Div m a -> Tree a -> m (Tree a)
runDiv comp node = runContT (do x <- return node 
                                comp x) $ return

equal :: (Eq a, MonadPlus m) => a -> Div m a
equal val node = ContT $ \next ->
                        if getVal node == val then next node 
                                              else mzero

parentOf :: MonadPlus m => Div m a
parentOf node =  ContT $ 
    \next -> case getChildren node of
             HasChildren xs  -> findDiv next xs
             _               -> mzero

specificChildAt :: MonadPlus m => Int -> Div m a
specificChildAt pos node = ContT $ 
    \next -> case getChildren node of
            HasChildren xs  -> 
                if pos < length xs then next $ xs !! pos 
                else mzero
            _               -> mzero

rightBrother :: MonadPlus m => Div m a
rightBrother node = ContT $ 
    \next -> case getRightBrothers node of
            x:xs -> findDiv next (x:xs)
            [] -> mzero

leftBrother :: MonadPlus m => Div m a
leftBrother node = ContT $ 
    \next -> case getLeftBrothers node of
            x:xs -> findDiv next (x:xs)
            [] -> mzero

-- alternative paths
alt :: (MonadZero m) => Div m a -> Div  m a -> Div m a
alt div1 div2 node =  ContT $ 
    \next -> let fst = runContT (div1 node) next 
                 sec = runContT (div2 node) next 
             in  if not (miszero fst) then fst else sec

brother ::  (MonadZero m) => Div m a
brother = alt leftBrother rightBrother

childOf ::  MonadPlus m => Div m a
childOf node = ContT $ 
    \next -> case getParent node of
             HasParent parent -> next parent
             None             -> mzero

subNodeOf :: MonadPlus m => Div m a
subNodeOf node = ContT $ \next ->
    let parents node = case getParent node of
                       HasParent parent -> parent : parents parent
                       None             -> []
    in
    findDiv next $ parents node

-- here we don't have tail recursion , we should user the ContT monad for recursive application of the function
first :: ( MonadZero m)=> Div m a
first node = ContT $ 
    \next -> fix (\cont subNode -> 
                 let m = next subNode
                     n = case getChildren subNode of
                          HasChildren xs ->                               
                             case find (not . miszero) [cont x | x <- xs] of
                              Just n -> n
                              Nothing -> mzero
                          _ -> mzero

                 in if not (miszero m) then m else n) node

(...) ::  Monad m => (t -> m a) -> (a -> m b) -> t -> m b
f ... g = \b -> (f b) >>= g 
