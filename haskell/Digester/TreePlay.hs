module TreePlay where
import Tree
import Data.Traversable(traverse)

some ::  Tree Integer
some =   root 2 [ 
                node 1  [
                        leaf 1,  
                        leaf 1, 
                        leaf 3 ], 
                leaf 2 ] 

-- GHCi some

a :: Maybe [Integer]
a = traverse (\x -> if x == 4 then Nothing else Just x ) [1,2,3] 

