{-# LANGUAGE ViewPatterns #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances #-} 
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE OverlappingInstances #-}
{-# LANGUAGE UndecidableInstances #-}

module TreeM () where 
import Control.Monad.Trans.Class(MonadTrans)

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

-- |constructor for a node of type root. first argurment is the value, and the second the list of passparent elements.
-- the returning part is the tree node
--root ::  a -> m (PassParent m a) -> Tree m a
--root a ms = 
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

node :: (Monad m,Countable m) => a -> m (PassParent m a) -> PassParent m a
node a ms p pos =
           Node a cs p pos
              where 
              cs = do 
                    (passParent,pos) <- count ms 
                    return $ passParent p pos 

class Countable m where
  count :: m a -> m (a,Int)

instance Countable [] where
  count xs = zip xs [0..] 
                
instance Countable Maybe where
  count (Just a) = Just (a,0)              
  count Nothing = Nothing
