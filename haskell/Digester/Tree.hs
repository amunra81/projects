{-# LANGUAGE ViewPatterns #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances #-} 
{-# LANGUAGE OverlappingInstances #-}
{-# LANGUAGE FlexibleContexts #-}

module Tree (
-- * Tree data
Tree(..),TreeProps(..),Pos,
-- * Tree constructor
root,node,leaf,nodeOrLeaf,PassParent,toPassParent,
-- * Tree utils
value,children,getChildren,parent,
rightBrothers,leftBrothers,position,
index,commonIndexes,stringIndex
,na) where
import Data.List
import System.IO.Unsafe(unsafePerformIO)
import Control.Monad.Trans.Maybe(MaybeT,runMaybeT)
import GHC.IO.Encoding(setLocaleEncoding)
import GHC.IO.Encoding(setFileSystemEncoding)
import GHC.IO.Encoding(setForeignEncoding)
import GHC.IO.Encoding(utf8)
import Control.Monad.List(ListT)
import Control.Monad.List(runListT)
import Control.Monad.Trans.Identity(IdentityT)
import Control.Monad.Trans.Identity(runIdentityT)

-- |alias for position in a collection of childrent
type Pos = Int 

-- |create a tree based on a parent and a position
type PassParent a = Tree a -> Pos -> Tree a  

-- |the tree structure
data Tree a =   Root a [Tree a] |               -- value , children
                Node a [Tree a] (Tree a) Pos |  -- value , children , parent , position
                Leaf a (Tree a) Pos             -- value , parent , position

-- |tree properties
data TreeProps a = None
                 | HasChildren [Tree a]
                 | HasParent (Tree a)

-- |poject a tree into a passparent
toPassParent :: Tree a -> PassParent a
toPassParent tree = case tree of
                    Root a xs -> \ p i -> Node a xs p i
                    Node a xs _ _ -> \ p i -> Node a xs p i 
                    Leaf a _ _ -> \ p i -> Leaf a p i

-- |constructor for a node of type root. first argurment is the value, and the second the list of passparent elements.
-- the returning part is the tree node
root ::  a -> [PassParent a] -> Tree a
root a xs = 
           Root a zs
              where
              zs = map toNode $ zip [0..] xs
              toNode (pos,passParent) = passParent p pos 
              p = root a xs

-- |constructor for a node of type node. first argurment is the value, and the second the list of passparent elements
-- |the returning part is a passparent as wel
node :: a -> [PassParent a] -> PassParent a
node a xs p pos =
           Node a cs p pos
              where 
              cs = map toNode $ Data.List.zip [0..] xs
              toNode (i,passParent) = passParent thisNode i 
              thisNode = node a xs p pos

-- |constructor for a node of type leaf. the single argurment is the value, and the returning element is a passparent
leaf :: a -> PassParent a
leaf a p i = Leaf a p i
                
-- |create a node or leaf.
nodeOrLeaf :: a -> [PassParent a] -> PassParent a
nodeOrLeaf a (x:xs) = node a (x:xs)
nodeOrLeaf a [] = leaf a

-- |fetch the value from a node
value ::  Tree t -> t
value (Root v _)     = v 
value (Node v _ _ _) = v
value (Leaf v _ _ )  = v

-- |fetch the node position
position ::  Tree t -> Pos
position (Root _ _)      = 0
position (Node _ _ _ i)  = i
position (Leaf _ _ i )   = i

-- |create a list of pos representing the indexes of each node (parents) until the root is reached
index :: Tree a -> [Pos]
index tree = 
    case parent tree of
    (HasParent p) -> (position tree : index p)
    None -> [0]

-- |take two nodes and create a tubple of two array of indexes. The difference between the indexes created by the "index" function, the indexes cretead by the commonIndexes represent the index of all parents for each node, till a common parent is found. For sure if no other common parent diffrent then root is found, there will be no diference between the indexes created by the "index" function and the "commonIndexes" method
commonIndexes :: Tree a -> Tree a -> ([Pos],[Pos])
commonIndexes n1 n2= 
    let reduce i1 i2 = 
            case (i1,i2) of
            (x:xs,y:ys) -> if x == y then reduce xs ys 
                                   else (i1,i2)
            _ -> (i1,i2)
    in
    reduce (index n1) (index n2) 

-- |instead a list of position, this method return like "index" method the same values, but in a string representation (list of chars). This is good for comparations of nodes.
stringIndex ::  Tree a -> [Char]
stringIndex tree = foldl (\a x -> a ++ (show x)) "" $ index tree

-- |get the children o a node , under the repsentation of a sequence
getChildren :: Tree a -> [Tree a]
getChildren tree = case children tree of
                   HasChildren xs -> xs
                   None           -> []
-- |children of the node
children ::  Tree a -> TreeProps a
children (Root _ (x:xs))      = HasChildren (x:xs)
children (Node _ (x:xs) _ _)  = HasChildren (x:xs)
children _                    = None

-- |parent properties of a node: None or HasParent
parent ::  Tree a -> TreeProps a
parent (Node _ _ p _)  = HasParent p
parent (Leaf _ p _)    = HasParent p
parent _               = None

-- |extract all brothers with the pos index bigger then given noe
rightBrothers ::  Tree t -> [Tree t]
rightBrothers tree = 
    case tree of
    (parent -> HasParent (children -> HasChildren xs)) -> 
        map (\(_,child) -> child) 
        $ filter (\(i,_) -> i > position tree) 
        $ zip [0..] xs
    _ -> []

-- |extract all brothers with the pos index less then given noe
leftBrothers ::  Tree t -> [Tree t]
leftBrothers tree = 
    case tree of
    (parent -> HasParent (children -> HasChildren xs)) -> 
        map (\(_,child) -> child) 
        $ filter (\(i,_) -> i < position tree) 
        $ zip [0..] xs
    _ -> []

-- |get a string representing a graphical arrow
arrow ::  [Char]
arrow = "->"

-- |based on a given number which represents the number of identation and a node, returns a string representing the tree structure
showNode:: Show a => Integer -> Tree a -> String
showNode depth (Root a cs)        = "R("++(show a)++",["++(showChildren (depth + 1) cs)++ "])"
showNode depth (Node a cs _ pos)  = "N"++(show pos)++"("++(show a)++",["++ (showChildren (depth + 1) cs)++ "])"
showNode _     (Leaf a _ pos)     = "L"++(show pos)++"("++(show a)++")"

-- |based on a number which represents the number of identations and a list of node, will print (getting the string) the nodes
showChildren :: Show a => Integer -> [Tree a] -> String
showChildren  depth = concatStr . map (ident . showNode depth)
                where
                concatStr  = foldl (++) ""  
                ident str = ( foldl (\acc _-> acc ++ "       ") "\n" [1..depth] ) ++ str
--
-- INSTANCES
--
instance Show a => Show (Tree a) where
    show = showNode 0 

instance Show a => Show ([(Tree a)]) where
    show (x:xs) = foldl (\acc b -> acc ++ "\n+ " ++ (show b)) ("+ " ++ show x) xs   
    show _ = "n/a"

instance Show (m (Tree a)) => Show (IdentityT m (Tree a)) where 
    show = show . runIdentityT

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

na :: t
na = error "Not implemented"
