{-# LANGUAGE ViewPatterns #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances #-} 
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE OverlappingInstances #-}
{-# LANGUAGE UndecidableInstances #-}

module TreeM (Tree,na,node,root,leaf,toPassParent,value,position,index,commonIndexes,stringIndex,children,TreeProps(..),getChildren
,parent) where 
import Data.Monoid
import Control.Monad
import Control.Monad(mfilter)

na ::  t
na = error ""

-- |alias for position in a collection of childrent
type Pos = Int 

-- |create a tree based on a parent and a position
type PassParent m a = Tree m a -> Pos -> Tree m a  

-- |the tree structure
data Tree m a = Root a (m (Tree m a)) |                 -- value , children
                Node a (m (Tree m a)) (Tree m a) Pos |  -- value , children , parent , position
                Leaf a (Tree m a) Pos                   -- value , parent , position

-- |tree properties
data TreeProps m a = None
                 | HasChildren (m (Tree m a))
                 | HasParent (Tree m a)

-- * Countable class
class Countable m where
  count :: m a -> m (a,Int)

instance Countable [] where
  count xs = zip xs [0..] 
                
instance Countable Maybe where
  count (Just a) = Just (a,0)              
  count Nothing = Nothing

-- |constructor for a node of type leaf. the single argurment is the value, and the returning element is a passparent
leaf :: a -> PassParent m a
leaf a p i = Leaf a p i

-- |constructor for a node of type node. first argurment is the value, and the second the list of passparent elements
-- |the returning part is a passparent as wel
node :: (Monad m,Countable m) => a -> m (PassParent m a) -> PassParent m a
node a ms p pos =
           Node a cs p pos
              where 
              cs = do 
                    (passParent,cpos) <- count ms 

                    return $ passParent p cpos 

-- |constructor for a node of type root. first argurment is the value, and the second the list of passparent elements.
-- the returning part is the tree node
root :: (Monad m,Countable m) => a -> m (PassParent m a) -> Tree m a
root a xs = 
           Root a cs
              where
              cs = do
                    (passParent,pos) <- count xs
                    return $ passParent p pos
              p = root a xs

toPassParent :: Tree m a -> PassParent m a
toPassParent tree = case tree of
                    Root a m -> \ p i -> Node a m p i
                    Node a m _ _ -> \ p i -> Node a m p i 
                    Leaf a _ _ -> \ p i -> Leaf a p i

-- |fetch the value from a node
value ::  Tree m a -> a
value (Root v _)     = v 
value (Node v _ _ _) = v
value (Leaf v _ _ )  = v

-- |fetch the node position
position ::  Tree m a -> Pos
position (Root _ _)      = 0
position (Node _ _ _ i)  = i
position (Leaf _ _ i )   = i

-- |create a list of pos representing the indexes of each node (parents) until the root is reached
index :: Tree m a -> [Pos]
index tree = 
    case tree of
    Node _ _ p _ -> (position tree : index p) 
    Leaf _ p _   -> (position tree : index p)
    Root _ _ -> [0]

-- |take two nodes and create a tubple of two array of indexes. The difference between the indexes created by the "index" function, the indexes cretead by the commonIndexes represent the index of all parents for each node, till a common parent is found. For sure if no other common parent diffrent then root is found, there will be no diference between the indexes created by the "index" function and the "commonIndexes" method
commonIndexes :: Tree m a -> Tree m a -> ([Pos],[Pos])
commonIndexes n1 n2= 
    let reduce i1 i2 = 
            case (i1,i2) of
            (x:xs,y:ys) -> if x == y then reduce xs ys 
                                   else (i1,i2)
            _ -> (i1,i2)
    in
    reduce (index n1) (index n2) 

-- |instead a list of position, this method return like "index" method the same values, but in a string representation (list of chars). This is good for comparations of nodes.
stringIndex ::  Tree m a -> [Char]
stringIndex tree = foldl (\a x -> a ++ (show x)) "" $ index tree

-- |get the children o a node , under the repsentation of a sequence
getChildren :: Monoid (m (Tree m a)) => Tree m a -> m (Tree m a)
getChildren tree = case tree of
                    Node _ xs _ _   -> xs
                    Root _ xs       -> xs
                    Leaf _ _ _      -> mempty


-- |children of the node
children ::  Tree m a -> TreeProps m a
children (Root _ xs)      = HasChildren xs
children (Node _ xs _ _)  = HasChildren xs
children _                = None

-- |parent properties of a node: None or HasParent
parent ::  Tree m a -> TreeProps m a
parent (Node _ _ p _)  = HasParent p
parent (Leaf _ p _)    = HasParent p
parent _               = None

-- |extract all brothers with the pos index bigger then given noe
rightBrothers ::  MonadPlus m => Tree m t -> m (Tree m t)
rightBrothers tree = 
    case tree of
    (parent -> HasParent (children -> HasChildren m)) -> 
        mfilter  (\n -> position n > position tree) m
    _ -> mzero

-- |extract all brothers with the pos index less then given noe
leftBrothers ::  MonadPlus m => Tree m t -> m (Tree m t)
leftBrothers tree = 
     case tree of
     (parent -> HasParent (children -> HasChildren m)) -> 
         mfilter  (\n -> position n < position tree) m
     _ -> mzero

-- | get a string representing a graphical arrow
arrow ::  [Char]
arrow = "->"


-- |based on a number which represents the number of identations and a list of node, will print (getting the string) the nodes
showChildren :: Show a => Integer -> m (Tree m a) -> String
showChildren  depth = concatStr . map (ident . showNode depth)
                where
                concatStr  = foldl (++) ""  
                ident str = ( foldl (\acc _-> acc ++ "       ") "\n" [1..depth] ) ++ str

-- |based on a given number which represents the number of identation and a node, returns a string representing the tree structure
showNode:: Show a => Integer -> Tree m a -> String
showNode depth (Root a cs)        = "R("++(show a)++",["++(showChildren (depth + 1) cs)++ "])"
showNode depth (Node a cs _ pos)  = "N"++(show pos)++"("++(show a)++",["++ (showChildren (depth + 1) cs)++ "])"
showNode _     (Leaf a _ pos)     = "L"++(show pos)++"("++(show a)++")"
