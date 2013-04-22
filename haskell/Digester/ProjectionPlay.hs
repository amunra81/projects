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

s11 = proot (first ... sdiv2) [] -- only one result
m11 = proot (first ... mdiv2) [] -- only one result

s12 = proot (any ... sdiv2) [] -- three results
m12 = proot (any ... mdiv2) [] -- only one result

-- GHCi  projectToRoot m11 tree1
-- GHCi  projectToRoot s11 tree1
-- GHCi  projectToRoot m12 tree1
-- GHCi  projectToRoot s12 tree1 

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
d = proot ( first ... sdiv8 ) [
                                pleaf mdiv5 ,
                                pnode sdiv1 [
                                            pleaf mdiv6]]
