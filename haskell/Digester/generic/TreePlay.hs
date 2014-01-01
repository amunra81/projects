module TreePlay where
import Tree
import Data.Traversable(traverse)

exList ::  Tree [] Integer
exList =   root 2 [ 
                node 1  [
                        leaf 1,  
                        leaf 1, 
                        leaf 3 ], 
                leaf 2 ] 

exMaybe :: Tree Maybe Integer
exMaybe = root 2 $ Just $ node 1 $ Just $ leaf 4

-- GHCi some
a :: Maybe [Integer]
a = traverse (\x -> if x == 4 then Nothing else Just x ) [1,2,3] 

