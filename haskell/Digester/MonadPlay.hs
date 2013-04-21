{-# LANGUAGE FlexibleInstances #-} 
{-# LANGUAGE  OverlappingInstances #-}

import Tree
import Monad
import Control.Monad.Cont
import Prelude hiding (any)
                    
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


-- GHCi found tree
(^<) d1 d2 = d1 ... parentOf ... d2

---- PARENT 
p1 =  mdiv1 ^< ( mdiv2 ^< mdiv5 ) ^< mdiv7      -- RESULT: Some 
p2 =  mdiv5 ^< mdiv7                            -- RESULT : NONE
p3 =  (first ... mdiv2) ^< (mdiv5 ^< mdiv7)     -- Will search in all the tree RESULT: SOME
p4 =  first ...  mdiv2 ^< mdiv5 ^< mdiv7        -- RESULT: SOME 
p5 =  first ... ( mdiv2 ^< mdiv5 ) ^< mdiv7     -- RESULT: SOME
p6 =  first ... mdiv2 

---- GHCi runDiv p1 tree 

---- Maybe vs Seqence
s11 =  sdiv1 ... parentOf ... sdiv2       -- two results
m11 =  mdiv1 ... parentOf ... mdiv2       -- one result

s12 =  first ... ( sdiv2 ^< sdiv5 ) ^< sdiv7       -- RESULT: Some 
m12 =  first ... ( mdiv2 ^< mdiv5 ) ^< mdiv7       -- RESULT: Some 

s13 =  any ... ( sdiv2 ^< sdiv5 ) ^< sdiv7       -- RESULT: Some 
m13 =  any ... ( mdiv2 ^< mdiv5 ) ^< mdiv7       -- RESULT: Some 

---- GHCi runDiv s11 tree 
