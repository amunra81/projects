
module Monad(
-- * Types
DivCont,MonadNonZero(nonzero,firstnonzero),Div,
-- * Utils
runDiv,
-- * Div constructors
parentOf,equal,alt,first,
Monad.any,childOf,childAt,rightBrother,leftBrother,subNodeOf,
both,brother,
escalate,dig,path
,(...),(^<),(^>)
) where

import Tree
import Control.Monad.Cont hiding (cont)
import Data.Function(fix)
import Control.Monad.Trans.List
import Control.Monad.Trans.Maybe
import Prelude hiding (div)

class (MonadPlus m) => MonadNonZero m where
    -- | chosing the non-zero monad from the list
    nonzero :: m a -> m a -> m a
    
    -- | optimizing searching for nonzero monad in a list
    firstnonzero :: [m a] -> m a
    firstnonzero xs = foldl nonzero mzero xs

instance MonadNonZero [] where
    nonzero ([]) b = b
    nonzero a _ = a

    firstnonzero ([]:xs) = firstnonzero xs
    firstnonzero (x:_)  = x
    firstnonzero []      = []

instance MonadNonZero Maybe where 
    nonzero Nothing b = b
    nonzero a _ = a

    firstnonzero (Nothing:xs) = firstnonzero xs
    firstnonzero (x:_)  = x
    firstnonzero []      = Nothing

instance Monad m => MonadNonZero (ListT m) where 
    nonzero mx my = ListT $ do
        x <- runListT mx
        runListT $ case x of
                   [] -> my
                   _  -> mx

    firstnonzero []         = mzero
    firstnonzero (mx:mxs)   = ListT $ do 
       x <- runListT mx
       runListT $ case x of
                   [] -> firstnonzero mxs
                   _  -> mx

instance Monad m => MonadNonZero (MaybeT m) where 
    nonzero mx my = MaybeT $ 
     do 
       x <- runMaybeT mx
       runMaybeT $ case x of
                   Nothing -> my
                   _       -> mx

    firstnonzero []      = mzero
    firstnonzero (mx:mxs)  = MaybeT $ 
     do 
       x <- runMaybeT mx
       runMaybeT $ case x of
                   Nothing -> firstnonzero mxs
                   _       -> mx

type DivCont m a = ContT (Tree a) m (Tree a)
type Div m a = Tree a -> DivCont m a

matchNodes ::  MonadPlus m => (b -> m a) -> [b] -> m a
matchNodes next xs = foldl (\ acc n -> mplus acc (next n)) mzero xs

-- | running s div trough a tree
runDiv ::  Monad m => Div m a -> Tree a -> m (Tree a)
runDiv comp tree = runContT (comp tree) $ return

equal :: (Eq a, MonadPlus m) => a -> Div m a
equal val tree = ContT $ \ next ->
                        if value tree == val then next tree 
                                              else mzero

parentOf :: MonadPlus m => Div m a
parentOf = \ tree ->  ContT $ 
    \next -> case children tree of
             HasChildren xs  -> matchNodes next xs
             _               -> mzero

childAt :: MonadPlus m => Int -> Div m a
childAt pos tree = ContT $ 
    \ next -> case children tree of
            HasChildren xs  -> 
                if pos < length xs then next $ xs !! pos 
                else mzero
            _               -> mzero

rightBrother :: MonadPlus m => Div m a
rightBrother tree = ContT $ 
    \next -> case rightBrothers tree of
            x:xs -> matchNodes next (x:xs)
            [] -> mzero

leftBrother :: MonadPlus m => Div m a
leftBrother tree = ContT $ 
    \next -> case leftBrothers tree of
            x:xs -> matchNodes next (x:xs)
            [] -> mzero

-- conjuction and dijunction
alt :: (MonadNonZero m) => Div m a -> Div m a -> Div m a
alt div1 div2 tree =  
   ContT $ 
    \ next -> let [a,b] = [runContT (div tree) next | div <- [div1,div2] ]
             in nonzero a b

both :: MonadPlus m => Div m a -> Div m a -> Div m a
both div1 div2 tree = do 
    x <- div1 tree
    y <- div2 tree
    if stringIndex x == stringIndex y 
        then return x
        else lift $ mzero

brother ::  (MonadNonZero m) => Div m a
brother = alt leftBrother rightBrother

childOf ::  MonadPlus m => Div m a
childOf tree = ContT $ 
    \ next -> case parent tree of
             HasParent p -> next p
             None             -> mzero

subNodeOf :: MonadPlus m => Div m a
subNodeOf tree = ContT $ \ next ->
    let parents t = case parent t of
                       HasParent p -> p : parents p
                       None             -> []
    in
    matchNodes next $ parents tree

escalate ::  MonadPlus m => Int -> Div m a 
escalate level tree = 
   foldl f x [1..level]
   where 
       f = \ acc _ -> acc >>= childOf    
       x = return tree

dig :: MonadPlus m => [Int] -> Div m a
dig indexes tree = 
    foldl f x indexes 
    where 
        f = \ acc i -> acc >>= childAt i
        x = do return tree

-- here we don't have tail recursion , we should use the ContT monad for recursive application of the function
first :: ( MonadNonZero m)=> Div m a
first tree = ContT $ 
    \next -> fix (\cont subNode -> 
                    let x = next subNode
                        xs =  case children subNode of
                                       HasChildren ys -> map cont ys
                                       _ -> []
                    in firstnonzero (x:xs)) tree

any :: ( MonadNonZero m) => Div m a
any tree = ContT $ 
    \next -> fix (\cont subNode -> 
                    let x = next subNode
                        xs =  case children subNode of
                                       HasChildren ys -> map cont ys
                                       _ -> []
                    in foldl mplus x xs ) tree

path :: MonadPlus m => Tree a -> Tree a -> Div m a
path fromNode toNode = 
    (escalate level) ... dig (tail toIndex)
    where 
    (fromIndex, toIndex) = commonIndexes fromNode toNode 
    level =  length fromIndex - 1

(...) ::  Monad m => (t -> m a) -> (a -> m b) -> t -> m b
f ... g = \ b -> (f b) >>= g 

(^<) :: MonadPlus m => Div m a -> Div m a -> Div m a
(^<) d1 d2 = d1 ... parentOf ... d2

(^>) :: MonadPlus m => Div m a -> Div m a -> Div m a
(^>) d1 d2 = d1 ... childOf ... d2
