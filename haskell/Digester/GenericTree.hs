{-# LANGUAGE ViewPatterns #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances #-} 
{-# LANGUAGE OverlappingInstances #-}
{-# LANGUAGE FlexibleContexts #-}

module Tree (

) where 

-- |alias for position in a collection of childrent
type Pos = Int 

-- |create a tree based on a parent and a position
type PassParent m a = Tree m a -> Pos -> Tree m a  

-- |the tree structure
data Tree m a = Root a (m (Tree m a)) |                 -- value , children
                Node a (m (Tree m a)) (Tree m a) Pos |  -- value , children , parent , position
                Leaf a (Tree m a) Pos                   -- value , parent , position

-- |constructor for a node of type root. first argurment is the value, and the second the list of passparent elements.
-- the returning part is the tree node
--root ::  a -> m (PassParent m a) -> Tree m a
--root a xs = 
--           Root a zs
--              where
--              zs = map toNode $ zip [0..] xs
--              toNode (pos,passParent) = passParent p pos 
--              p = root a xs

-- |constructor for a node of type leaf. the single argurment is the value, and the returning element is a passparent
leaf :: a -> PassParent m a
leaf a p i = Leaf a p i

-- |constructor for a node of type node. first argurment is the value, and the second the list of passparent elements
-- |the returning part is a passparent as wel
node :: a -> m (PassParent m a) -> PassParent m a
node a xs p pos =
           Node a cs p pos
              where 
              cs = map toNode $ zip [0..] xs
              toNode (i,passParent) = passParent thisNode i 
              thisNode = node a xs p pos
