{-# LANGUAGE ViewPatterns #-}
import Tree

some =   root 3 [ 
                node 1  [
                        leaf 1,  
                        leaf 1, 
                        leaf 3 ], 
                leaf 2 ] 



getCh (Root _ (x:xs))      = HasChildren (x:xs)
getCh (Node _ (x:xs) _ _)  = HasChildren (x:xs)
getCh _                    = None


hasChildren (getCh -> HasChildren xs) = True
hasChildren (_)                       = False


hasChildren2 node = case node of 
                    (getCh -> HasChildren xs) -> True
                    (_) -> False
