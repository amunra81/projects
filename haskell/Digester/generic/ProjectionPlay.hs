{-# LANGUAGE NoMonomorphismRestriction #-}
{-# LANGUAGE FlexibleInstances #-}

module ProjectionPlay where
import Tree
import Monad
import Projection
import Prelude hiding (any)
import Control.Monad.Trans.Maybe(MaybeT)
import Control.Monad.List(ListT)
import Control.Monad(MonadPlus)
import Control.Monad.List
import Data.Foldable(foldMap)
import Data.Monoid(Sum(..))
import System.IO.Unsafe(unsafePerformIO)

(div1:div2:div3:div4:div5:div6:div7:div8:_) =  map equal [1..]

instance Show a => Show (ListT IO (Tree (ListT IO) a)) where
    show = unsafePerformIO . ltoStr

instance Show (ListT IO Integer) where
    show = show . unsafePerformIO . runListT

ltoStr m = do
            xs <- runListT m
            return $ foldl (\acc t -> acc ++ (show t)) "" xs

tree1 :: Tree [] Integer
tree1 = 
    root 1 [
            node 2 [
                    leaf 6,
                    node 5 [
                            leaf 7 ], 
                    node 2 [
                            leaf 6,
                            node 5 [
                                    leaf 7 ],
                            leaf 7 ],
                    leaf 7 ],
            leaf 3,
            node 2 [
                    leaf 6,
                    node 5 [
                            leaf 7 ],
                     leaf 7 ],
            leaf 4 ]

ltree1 = transform tree1 :: Tree (ListT IO) Integer


-- Maybe vs List --
-- ------------- --

s11 = root (first ==. div2) []  -- only one result : FUCK ME :)) there are two of them
s12 = root (any ==. div2) []    -- three results

-- GHCi  projectToRoot s11 tree1
-- GHCi  projectToRootC s11 ltree1
-- GHCi  projectToRoot s12 tree1
-- GHCi  projectToRootC s12 ltree1

s13 = root div1 [                                                -- one
            leaf (any ==. div2 ==< div5),                          -- three
            node (any ==. div2 ==< div2) [                         -- one
                        leaf (any ==. div7) ],                    -- two
            leaf (any ==. div3 ==< div5),                          -- NONE 
            leaf (any ==. div5 ==. brother ==. div6),               -- three
            leaf (any ==. div2 ==. nextBrother ==. div7)            -- one
-- put here all the Tree.Monad functions for testing
            ]                         

-- GHCi  projectToRoot s13 tree1
-- GHCi  projectToRootC s13 ltree1

