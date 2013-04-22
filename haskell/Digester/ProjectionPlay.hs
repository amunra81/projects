{-# LANGUAGE FlexibleInstances #-} 
{-# LANGUAGE OverlappingInstances #-}

import Tree
import Monad
import Projection
import Prelude hiding (any)

instance Show a => Show ([(Tree a)]) where
    show (x:xs) = foldl (\acc x -> acc ++ "\n" ++ (show x)) (show x) xs   
    show _ = "n/a"

(sdiv1:sdiv2:sdiv3:sdiv4:sdiv5:sdiv6:sdiv7:sdiv8:_) = map equal [1..]::[Div [] Integer]
(mdiv1:mdiv2:mdiv3:mdiv4:mdiv5:mdiv6:mdiv7:mdiv8:_) = map equal [1..]::[Div Maybe Integer]

(^<) d1 d2 = d1 ... parentOf ... d2

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

s12 = proot (anyware ... sdiv2) [] -- three results
m12 = proot (anyware ... mdiv2) [] -- only one result

-- GHCi  projectToRoot m11 tree1
-- GHCi  projectToRoot s11 tree1
-- GHCi  projectToRoot m12 tree1
-- GHCi  projectToRoot s12 tree1 


s13 = proot sdiv1 [                                                    -- one
            pleaf (anyware ... sdiv2 ^< sdiv5),                            -- three
            pnode (first ... sdiv2 ^< sdiv2) [                         -- one
                                            pleaf (anyware ... sdiv7) ],   -- two
            pleaf (first ... sdiv3 ^< sdiv5) ]                         -- NONE 

-- GHCi  projectToRoot s13 tree1 

m13 = proot mdiv1 [                                                    -- one
            pleaf (anyware ... mdiv2 ^< mdiv5),                            -- one
            pnode (first ... mdiv2 ^< mdiv2) [                         -- one
                                            pleaf (anyware ... mdiv7) ],   -- one
            pleaf (first ... mdiv3 ^< mdiv5) ]                         -- NONE 

-- GHCi  projectToRoot s13 tree1 

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

p3 = proot ( anyware ... mdiv1 ) [
                                 pnode ( parentOf::Div [] Integer ) [
                                                                    pleaf ( parentOf ... sdiv5 )],
                                 pleaf ( anyware ... sdiv6 )]

-- GHCi  projectToRoot p3 tree2 
