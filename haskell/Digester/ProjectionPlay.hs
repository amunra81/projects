module ProjectionPlay where
import Tree
import Monad
import Projection
import Prelude hiding (any)
import Control.Monad.Trans.List(ListT)
import Control.Monad.Trans.Maybe(MaybeT)



sdiv1,sdiv2,sdiv3,sdiv4,sdiv5,sdiv6,sdiv7,sdiv8 ::  Div [] Integer
(sdiv1:sdiv2:sdiv3:sdiv4:sdiv5:sdiv6:sdiv7:sdiv8:_) = map equal [1..]

mdiv1,mdiv2,mdiv3,mdiv4,mdiv5,mdiv6,mdiv7,mdiv8 ::  Div Maybe Integer
(mdiv1:mdiv2:mdiv3:mdiv4:mdiv5:mdiv6:mdiv7:mdiv8:_) = map equal [1..]

isdiv1,isdiv2,isdiv3,isdiv4,isdiv5,isdiv6,isdiv7,isdiv8 ::  Div (ListT IO) Integer
(isdiv1:isdiv2:isdiv3:isdiv4:isdiv5:isdiv6:isdiv7:isdiv8:_) = map equal [1..]::[Div (ListT IO) Integer]

imdiv1,imdiv2,imdiv3,imdiv4,imdiv5,imdiv6,imdiv7,imdiv8 ::  Div (MaybeT IO) Integer
(imdiv1:imdiv2:imdiv3:imdiv4:imdiv5:imdiv6:imdiv7:imdiv8:_) = map equal [1..]::[Div (MaybeT IO) Integer]

tree1 ::  Tree Integer
tree1 = 
    root 1 [
            --from here 
            node 2 [
                    leaf 6,
                    node 5 [
                            leaf 7 ], -- to here is repeating
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

-- Maybe vs List --
-- ------------- --

s11 = proot (first ... sdiv2) [] -- only one result
m11 = proot (first ... mdiv2) [] -- only one result
is11 = proot (first ... isdiv2) [] -- only one result
im11 = proot (first ... imdiv2) [] -- only one result

s12 = proot (any ... sdiv2) [] -- three results
m12 = proot (any ... mdiv2) [] -- only one result
is12 = proot (any ... isdiv2) [] -- three results
im12 = proot (any ... imdiv2) [] -- only one result

-- GHCi  projectToRoot m11 tree1
-- GHCi  projectToRoot s11 tree1
-- GHCi  projectToRoot m12 tree1
-- GHCi  projectToRoot s12 tree1 

s13 = proot sdiv1 [                                                   -- one
            pleaf (any ... sdiv2 ^< sdiv5),                            -- three
            pnode (first ... sdiv2 ^< sdiv2) [                         -- one
                                            pleaf (any ... sdiv7) ],   -- two
            pleaf (first ... sdiv3 ^< sdiv5) ]                         -- NONE 

-- GHCi  projectToRoot s13 tree1 

m13 = proot mdiv1 [                                                   -- one
            pleaf (any ... mdiv2 ^< mdiv5),                            -- one
            pnode (first ... mdiv2 ^< mdiv2) [                         -- one
                                            pleaf (any ... mdiv7) ],   -- one
            pleaf (first ... mdiv3 ^< mdiv5) ]                         -- NONE 

-- GHCi  projectToRoot m13 tree1 

tree2 = 
    root 1 [
            --from here 
            node 1 [
                    leaf 6,
                    node 5 [],
                    leaf 5 ],
            node 2 [
                    leaf 6,
                    leaf 5 ],
            node 3 [
                    leaf 6,
                    leaf 5 ]
            ] 

p1 = proot ( mdiv1 ) [
         pnode (parentOf::Div [] Integer) [
              pleaf (first ... sdiv5)]]

-- GHCi  projectToRoot p1 tree2 

p2 = proot ( mdiv1 ) [
         pnode (parentOf::Div Maybe Integer) [
              pleaf (parentOf ... sdiv5)]]

-- GHCi  projectToRoot p2 tree2 

p3 = proot ( mdiv1 ) [
         pnode (parentOf::Div (ListT IO) Integer) [
              pleaf (first ... sdiv5)]]

-- GHCi  projectToRoot p3 tree2 

p4 = proot ( mdiv1 ) [
         pnode (parentOf::Div (MaybeT IO) Integer) [
              pleaf (parentOf ... sdiv5)]]

-- GHCi  projectToRoot p4 tree2 

