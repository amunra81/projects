
module Monad(
-- * Types
DivCont,MonadZero(miszero),Div,
-- * Utils
runDiv,
-- * Div constructors
parentOf,equal,alt,first,
Monad.any,childOf,childAt,
escalate,dig,path
,(...),(^<),(^>)
) where

import Tree
import Control.Monad.Cont
import Data.List
import Data.Function(fix)
import Data.Monoid
import Data.Foldable(Foldable)

------------------
 -- Monad Zero --
------------------

class (MonadPlus m,Foldable m) => MonadZero m where
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

matchNodes ::  MonadPlus m => (b -> m a) -> [b] -> m a
matchNodes next xs = foldl (\acc n -> mplus acc (next n)) mzero xs

runDiv ::  MonadPlus m => Div m a -> Tree a -> m (Tree a)
runDiv comp node = runContT (do x <- return node 
                                comp x) $ return

equal :: (Eq a, MonadPlus m) => a -> Div m a
equal val node = ContT $ \next ->
                        if value node == val then next node 
                                              else mzero

parentOf :: MonadPlus m => Div m a
parentOf node =  ContT $ 
    \next -> case children node of
             HasChildren xs  -> matchNodes next xs
             _               -> mzero

childAt :: MonadPlus m => Int -> Div m a
childAt pos node = ContT $ 
    \next -> case children node of
            HasChildren xs  -> 
                if pos < length xs then next $ xs !! pos 
                else mzero
            _               -> mzero

rightBrother :: MonadPlus m => Div m a
rightBrother node = ContT $ 
    \next -> case rightBrothers node of
            x:xs -> matchNodes next (x:xs)
            [] -> mzero

leftBrother :: MonadPlus m => Div m a
leftBrother node = ContT $ 
    \next -> case leftBrothers node of
            x:xs -> matchNodes next (x:xs)
            [] -> mzero

-- conjuction and dijunction
alt :: (MonadZero m) => Div m a -> Div  m a -> Div m a
alt div1 div2 node =  
   ContT $ 
    \next -> let [fst,sec] = [runContT (div node) next | div <- [div1,div2] ]
             in  if not (miszero fst) then fst else sec

both :: MonadPlus m => Div m a -> Div  m a -> Div m a
both div1 div2 node = do 
    x <- div1 node
    y <- div2 node
    if stringIndex x == stringIndex y 
        then return x
        else lift $ mzero

brother ::  (MonadZero m) => Div m a
brother = alt leftBrother rightBrother

childOf ::  MonadPlus m => Div m a
childOf node = ContT $ 
    \next -> case parent node of
             HasParent parent -> next parent
             None             -> mzero

subNodeOf :: MonadPlus m => Div m a
subNodeOf node = ContT $ \next ->
    let parents node = case parent node of
                       HasParent p -> p : parents p
                       None             -> []
    in
    matchNodes next $ parents node

escalate ::  MonadPlus m => Int -> Div m a 
escalate level node = 
   foldl f x [1..level]
   where 
       f = \acc _ -> acc >>= childOf    
       x = do return node

dig :: MonadPlus m => [Int] -> Div m a
dig indexes node = 
    foldl f x indexes
    where 
        f = \acc i -> acc >>= childAt i
        x = do return node

-- here we don't have tail recursion , we should user the ContT monad for recursive application of the function
first :: ( MonadZero m)=> Div m a
first node = ContT $ 
    \next -> fix (\cont subNode -> 
                 let m = next subNode
                     n = case children subNode of
                         HasChildren xs ->                               
                             case find (not . miszero) [cont x | x <- xs] of
                                 Just n -> n
                                 Nothing -> mzero
                         _ -> mzero

                 in if not (miszero m) then m else n) node

any :: ( MonadZero m)=> Div m a
any node = ContT $ 
    \next -> fix (\cont subNode -> 
                    let init = next subNode
                        childSeq =  case children subNode of
                                       HasChildren xs -> map cont xs
                                       _ -> []
                    in foldl mplus init childSeq ) node

path :: MonadPlus m =>Tree a -> Tree a -> Div m a
path fromNode toNode = 
    ( escalate level ) ... dig (tail toIndex)
    where 
    ( fromIndex, toIndex ) = commonIndexes fromNode toNode 
    level =  length fromIndex - 1

(...) ::  Monad m => (t -> m a) -> (a -> m b) -> t -> m b
f ... g = \b -> (f b) >>= g 

-- parentOf
(^<) d1 d2 = d1 ... parentOf ... d2
(^>) d1 d2 = d1 ... childOf ... d2
