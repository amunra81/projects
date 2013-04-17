import Tree
import MonadPlus
import Control.Monad.Cont
                    
(div1:div2:div3:div4:div5:div6:div7:div8:_) = map equal [1..]::[Div [] Integer]

tree = 
     root 1 [
             node 2 [
                      leaf 4 ,
                      leaf 5 ,
                      node 6 [
                              leaf 1 , 
                              leaf 1 , 
                              leaf 1 , 
                              leaf 1 , 
                              leaf 1  ], 
                      leaf 7 ] ,
             leaf 3 ]  

tree1 = 
    root 1 [
            node 2 [
                    leaf 6 ,
                    node 5 [
                            leaf 7 ] ,
                    leaf 7 ] ,
            leaf 3 ,
            leaf 4 ] 

found = runDiv $ div1 ... parentOf ... div2 ... parentOf ... div6 

-- GHCi found tree
(^<) d1 d2 = d1 ... parentOf ... d2

---- PARENT 
p1 =  div1 ^< ( div2 ^< div5 ) ^< div7       -- RESULT: Some 
p2 =  div5 ^< div7                           -- RESULT : NONE
p3 =  (first ... div2) ^< (div5 ^< div7)     -- Will search in all the tree RESULT: SOME
p4 =  first ...  div2 ^< div5 ^< div7        -- RESULT: SOME 
p5 =  first ... ( div2 ^< div5 ) ^< div7     -- RESULT: SOME
p6 =  first ... div2 

---- GHCi runDiv p1 tree1
