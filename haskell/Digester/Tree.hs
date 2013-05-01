{-# LANGUAGE ViewPatterns #-}
-- {-# LANGUAGE  #-}
module Tree (
-- * Tree data
Tree(..),TreeProps(..),Pos,
-- * Tree constructor
root,node,leaf,nodeOrLeaf,PassParent,
-- * Tree utils
value,children,parent,
rightBrothers,leftBrothers,position,
index,commonIndexes,stringIndex
) where
import Data.List
import Data.Maybe

data Tree a =   Root a [Tree a] |                       -- value , children
                Node a [Tree a] (Tree a) Pos |          -- value , children , parent , position
                Leaf a (Tree a) Pos                     -- value , parent , position

data TreeProps a = None
                 | HasChildren [Tree a]
                 | HasParent (Tree a)

--------------------------
 -- CONSTRUCT THE TREE --
--------------------------

root ::  a -> [PassParent a] -> Tree a
root a getChildren = 
           Root a children
              where
              children = map toNode $ Data.List.zip [0..] getChildren
              toNode (pos,passParent) = passParent parent pos 
              parent = root a getChildren

node :: a -> [PassParent a] -> PassParent a
node a getChildren parent pos =
           Node a children parent pos
              where 
              children = map toNode $ Data.List.zip [0..] getChildren
              toNode (pos,passParent) = passParent thisNode pos 
              thisNode = node a getChildren parent pos

leaf :: a -> PassParent a
leaf a parent pos = Leaf a parent pos
                
nodeOrLeaf :: a -> [PassParent a] -> PassParent a
nodeOrLeaf a (x:xs) = node a (x:xs)
nodeOrLeaf a [] = leaf a

type Pos = Int 
type PassParent a = Tree a -> Pos -> Tree a  -- getRoot -> pos -> theTree

------------------
 -- TREE UTILS --
------------------

value ::  Tree t -> t
value (Root v _)     = v 
value (Node v _ _ _) = v
value (Leaf v _ _ )  = v

position ::  Tree t -> Pos
position (Root _ _)      = 0
position (Node _ _ _ i)  = i
position (Leaf _ _ i )   = i

index :: Tree a -> [Pos]
index node = 
    case parent node of
    (HasParent p) -> (position node : index p)
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
stringIndex node = foldl (\a x -> a ++ (show x)) "" $ index node

children ::  Tree a -> TreeProps a
children (Root _ (x:xs))      = HasChildren (x:xs)
children (Node _ (x:xs) _ _)  = HasChildren (x:xs)
children _                    = None

parent ::  Tree a -> TreeProps a
parent (Node _ _ p _)  = HasParent p
parent (Leaf _ p _)    = HasParent p
parent _               = None

rightBrothers ::  Tree t -> [Tree t]
rightBrothers node = 
    case node of
    (parent -> HasParent (children -> HasChildren xs)) -> 
        map (\(_,child) -> child) 
        $ filter (\(i,_) -> i > position node) 
        $ zip [0..] xs
    _ -> []

leftBrothers ::  Tree t -> [Tree t]
leftBrothers node = 
    case node of
    (parent -> HasParent (children -> HasChildren xs)) -> 
        map (\(_,child) -> child) 
        $ filter (\(i,_) -> i < position node) 
        $ zip [0..] xs
    _ -> []
