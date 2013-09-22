{-# LANGUAGE ViewPatterns #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances #-} 
{-# LANGUAGE OverlappingInstances #-}

-- {-# LANGUAGE  #-}
module Tree (
-- * Tree data
Tree(..),TreeProps(..),Pos,
-- * Tree constructor
root,node,leaf,nodeOrLeaf,PassParent,toPassParent,
-- * Tree utils
value,children,getChildren,parent,
rightBrothers,leftBrothers,position,
index,commonIndexes,stringIndex
) where
import Data.List
import System.IO.Unsafe(unsafePerformIO)
import Control.Monad.Trans.Maybe(MaybeT,runMaybeT)
import GHC.IO.Encoding(setLocaleEncoding)
import GHC.IO.Encoding(setFileSystemEncoding)
import GHC.IO.Encoding(setForeignEncoding)
import GHC.IO.Encoding(utf8)
import Control.Monad.Trans.List

type Pos = Int 

type PassParent a = Tree a -> Pos -> Tree a  

data Tree a =   Root a [Tree a] |               -- value , children
                Node a [Tree a] (Tree a) Pos |  -- value , children , parent , position
                Leaf a (Tree a) Pos             -- value , parent , position

data TreeProps a = None
                 | HasChildren [Tree a]
                 | HasParent (Tree a)

toPassParent ::  Tree a -> PassParent a
toPassParent tree = case tree of
                    Root a xs -> \ p i -> Node a xs p i
                    Node a xs _ _ -> \ p i -> Node a xs p i 
                    Leaf a _ _ -> \ p i -> Leaf a p i

root ::  a -> [PassParent a] -> Tree a
root a xs = 
           Root a zs
              where
              zs = map toNode $ zip [0..] xs
              toNode (pos,passParent) = passParent p pos 
              p = root a xs

node :: a -> [PassParent a] -> PassParent a
node a xs p pos =
           Node a cs p pos
              where 
              cs = map toNode $ Data.List.zip [0..] xs
              toNode (i,passParent) = passParent thisNode i 
              thisNode = node a xs p pos

leaf :: a -> PassParent a
leaf a p i = Leaf a p i
                
nodeOrLeaf :: a -> [PassParent a] -> PassParent a
nodeOrLeaf a (x:xs) = node a (x:xs)
nodeOrLeaf a [] = leaf a

value ::  Tree t -> t
value (Root v _)     = v 
value (Node v _ _ _) = v
value (Leaf v _ _ )  = v

position ::  Tree t -> Pos
position (Root _ _)      = 0
position (Node _ _ _ i)  = i
position (Leaf _ _ i )   = i

index :: Tree a -> [Pos]
index tree = 
    case parent tree of
    (HasParent p) -> (position tree : index p)
    None -> [0]

commonIndexes :: Tree a -> Tree a -> ([Pos],[Pos])
commonIndexes n1 n2= 
    let reduce i1 i2 = 
            case (i1,i2) of
            (x:xs,y:ys) -> if x == y then reduce xs ys 
                                     else (i1,i2)
            _ -> (i1,i2)
    in
    reduce (index n1) (index n2) 

stringIndex ::  Tree a -> [Char]
stringIndex tree = foldl (\a x -> a ++ (show x)) "" $ index tree

getChildren ::  Tree a -> [Tree a]
getChildren tree = case children tree of
                   HasChildren xs -> xs
                   None           -> []

children ::  Tree a -> TreeProps a
children (Root _ (x:xs))      = HasChildren (x:xs)
children (Node _ (x:xs) _ _)  = HasChildren (x:xs)
children _                    = None

parent ::  Tree a -> TreeProps a
parent (Node _ _ p _)  = HasParent p
parent (Leaf _ p _)    = HasParent p
parent _               = None

rightBrothers ::  Tree t -> [Tree t]
rightBrothers tree = 
    case tree of
    (parent -> HasParent (children -> HasChildren xs)) -> 
        map (\(_,child) -> child) 
        $ filter (\(i,_) -> i > position tree) 
        $ zip [0..] xs
    _ -> []

leftBrothers ::  Tree t -> [Tree t]
leftBrothers tree = 
    case tree of
    (parent -> HasParent (children -> HasChildren xs)) -> 
        map (\(_,child) -> child) 
        $ filter (\(i,_) -> i < position tree) 
        $ zip [0..] xs
    _ -> []

arrow ::  [Char]
arrow = "->"

showNode:: Show a => Integer -> Tree a -> String
showNode depth (Root a cs)        = "R("++(show a)++",["++(showChildren (depth + 1) cs)++ "])"
showNode depth (Node a cs _ pos)  = "N"++(show pos)++"("++(show a)++",["++ (showChildren (depth + 1) cs)++ "])"
showNode _     (Leaf a _ pos)     = "L"++(show pos)++"("++(show a)++")"

showChildren :: Show a => Integer -> [Tree a] -> String
showChildren  depth = concatStr . map (ident . showNode depth)
                where
                concatStr  = foldl (++) ""  
                ident str = ( foldl (\acc _-> acc ++ "       ") "\n" [1..depth] ) ++ str

instance Show a => Show (Tree a) where
    show = showNode 0 

instance Show a => Show ([(Tree a)]) where

    show (x:xs) = foldl (\acc b -> acc ++ "\n+ " ++ (show b)) ("+ " ++ show x) xs   
    show _ = "n/a"

instance Show a => Show (ListT IO (Tree a)) where

    show ls = "IO "++arrow++" \n" ++ (unsafePerformIO msg)
              where msg = do 
                           setLocaleEncoding utf8
                           setFileSystemEncoding utf8
                           setForeignEncoding utf8
                           xs <- runListT ls 
                           (return . show) xs

instance Show a => Show (MaybeT IO (Tree a)) where

    show m = "IO "++arrow++"\n" ++ (unsafePerformIO msg)
              where msg = do 
                           xs <- runMaybeT m 
                           (return . show) xs
