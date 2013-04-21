{-# LANGUAGE FlexibleInstances #-} 
{-# LANGUAGE OverlappingInstances #-}

import Tree
import Monad
import Projection

instance Show a => Show ([(Tree a)]) where
    show (x:xs) = foldl (\acc x -> acc ++ "\n" ++ (show x)) (show x) xs   
    show _ = "n/a"

(sdiv1:sdiv2:sdiv3:sdiv4:sdiv5:sdiv6:sdiv7:sdiv8:_) = map equal [1..]::[Div [] Integer]
(mdiv1:mdiv2:mdiv3:mdiv4:mdiv5:mdiv6:mdiv7:mdiv8:_) = map equal [1..]::[Div Maybe Integer]

tree  = 
    root 1 [
            node 2 [
                    leaf 6 ,
                    node 5 [
                            leaf 7 ] ,
                    leaf 7 ] ,
            leaf 2 ,
            node 3 [
                    node 2 [
                            node 5 [
                                    leaf 7 ]]],
            leaf 4 ] 

proj :: Projection Integer
proj =  root sdiv1 []
