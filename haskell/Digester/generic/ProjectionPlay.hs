{-# LANGUAGE NoMonomorphismRestriction #-}

module ProjectionPlay where
import Tree
import Monad
import Projection
import Prelude hiding (any)
import Control.Monad.Trans.Maybe(MaybeT)
import Control.Monad.List(ListT)
import Control.Monad(MonadPlus)

(div1:div2:div3:div4:div5:div6:div7:div8:_) = map equal [1..]

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

ss = transform tree1 :: Tree (ListT IO) Integer
-- Maybe vs List --
-- ------------- --

--s11 = proot (first ... sdiv2) []-- only one result
--m11 = proot (first ... mdiv2) [] -- only one result
--
--is11 = proot (first ... isdiv2) [] -- only one result
--im11 = proot (first ... imdiv2) [] -- only one result
--
--s12 = proot (any ... sdiv2) [] -- three results
--m12 = proot (any ... mdiv2) [] -- only one result
--is12 = proot (any ... isdiv2) [] -- three results
--im12 = proot (any ... imdiv2) [] -- only one result
--
------ GHCi  projectToRoot m11 tree1
------ GHCi  projectToRoot s11 tree1
------ GHCi  projectToRoot m12 tree1
------ GHCi  projectToRoot s12 tree1 
--
----s14 = proot sdiv1 [ pleaf $ (first :: (Div [] Integer)) ]                                                   
--s14 = proot mdiv1 [ 
--                    pleaf ( any ... sdiv2 ^< sdiv5)
--                    --pnode (first ... sdiv2 ^< sdiv2) []
--                  ]                                                   
--
--s13 = proot sdiv1 [                                                   -- one
--            pleaf (any ... sdiv2 ^< sdiv5),                            -- three
--            pnode (first ... sdiv2 ^< sdiv2) [                         -- one
--                                            pleaf (any ... sdiv7) ],   -- two
--            pleaf (first ... sdiv3 ^< sdiv5) ]                         -- NONE 
--
---- GHCi  projectToRoot s13 tree1 
--
--m13 = proot mdiv1 [                                                   -- one
--            pleaf (any ... mdiv2 ^< mdiv5),                            -- one
--            pnode (first ... mdiv2 ^< mdiv2) [                         -- one
--                                            pleaf (any ... mdiv7) ],   -- one
--            pleaf (first ... mdiv3 ^< mdiv5) ]                         -- NONE 
--
---- GHCi  projectToRoot m13 tree1 
