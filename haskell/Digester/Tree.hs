{-# LANGUAGE ViewPatterns #-}
module Tree (
-- * Tree data
Tree(..),TreeProps(..),
-- * Tree constructor
root,node,leaf,PassParent,
-- * Tree utils
getVal,getChildren,getParent,
getRightBrothers,getLeftBrothers
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
                
type Pos = Integer 
type PassParent a = Tree a -> Pos -> Tree a  -- getRoot -> pos -> theTree

----------------------
 -- PRINT THE TREE --
----------------------

instance Show a => Show (Tree a) where
    show = showNode 0

showNode:: Show a => Integer -> Tree a -> String
showNode depth (Root value children)        = "R("++(show value)++",["++(showChildren (depth + 1) children)++ "])"
showNode depth (Node value children _ pos)  = "N"++(show pos)++"("++(show value)++",["++
                                                (showChildren (depth + 1) children)++ "])"
showNode depth (Leaf value _ pos)           = "L"++(show pos)++"("++(show value)++")"

showChildren :: Show a => Integer -> [Tree a] -> String
showChildren  depth = concatStr . map (ident . showNode depth)
                where
                concatStr  = foldl (++) ""  
                ident str = ( foldl (\acc _-> acc ++ "       ") "\n" [1..depth] ) ++ str

------------------
 -- TREE UTILS --
------------------


getVal ::  Tree t -> t
getVal (Root val _)     = val 
getVal (Node val _ _ _) = val
getVal (Leaf val _ _ )  = val

getPos ::  Tree t -> Pos
getPos (Root _ _)       = 0
getPos (Node _ _ _ pos) = pos
getPos (Leaf _ _ pos )  = pos

getChildren ::  Tree a -> TreeProps a
getChildren (Root _ (x:xs))      = HasChildren (x:xs)
getChildren (Node _ (x:xs) _ _)  = HasChildren (x:xs)
getChildren _                    = None

getParent ::  Tree a -> TreeProps a
getParent (Node _ _ parent _)  = HasParent parent
getParent (Leaf _ parent _)    = HasParent parent
getParent _                    = None

getRightBrothers ::  Tree t -> [Tree t]
getRightBrothers node = 
    case node of
    (getParent -> HasParent (getChildren -> HasChildren xs)) -> 
        map (\(_,child) -> child) 
        $ filter (\(i,_) -> i > getPos node) 
        $ zip [0..] xs
    _ -> []

getLeftBrothers ::  Tree t -> [Tree t]
getLeftBrothers node = 
    case node of
    (getParent -> HasParent (getChildren -> HasChildren xs)) -> 
        map (\(_,child) -> child) 
        $ filter (\(i,_) -> i < getPos node) 
        $ zip [0..] xs
    _ -> []
