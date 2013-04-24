import Tree
import Monad
import Control.Monad.Cont
import Printers
                    
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
                            leaf 4,
                            node 5 [
                                    leaf 9 ]]],
            leaf 4 ] 




-- Parent --
-- ------ -- 

p1 =  mdiv1 ^< ( mdiv2 ^< mdiv5 ) ^< mdiv7      -- RESULT: Some 
p2 =  mdiv5 ^< mdiv7                            -- RESULT : NONE
p3 =  (first ... mdiv2) ^< (mdiv5 ^< mdiv7)     -- Will search in all the tree RESULT: SOME
p4 =  first ...  mdiv2 ^< mdiv5 ^< mdiv7        -- RESULT: SOME 
p5 =  first ... ( mdiv2 ^< mdiv5 ) ^< mdiv7     -- RESULT: SOME
p6 =  first ... mdiv2 
---- GHCi runDiv p1 tree 

-- Maybe vs Seqence --
-- ---------------- --

s11 =  sdiv1 ... parentOf ... sdiv2       -- two results
m11 =  mdiv1 ... parentOf ... mdiv2       -- one result

s12 =  first ... ( sdiv2 ^< sdiv5 ) ^< sdiv7       -- RESULT: Some 
m12 =  first ... ( mdiv2 ^< mdiv5 ) ^< mdiv7       -- RESULT: Some 

s13 =  anyware ... ( sdiv2 ^< sdiv5 ) ^< sdiv7       -- RESULT: Some 
m13 =  anyware ... ( mdiv2 ^< mdiv5 ) ^< mdiv7       -- RESULT: Some 
---- GHCi runDiv s11 tree 


-- DIGGING AND ESCALATION --
-- ---------------------- --

s21 = anyware ... sdiv7 ... escalate 1
m21 = anyware ... mdiv7 ... escalate 1
---- GHCi runDiv s21 tree 

s22 = anyware ... sdiv2 ... dig [1,0]
m22 = anyware ... mdiv2 ... dig [1,0]
---- GHCi runDiv s22 tree 

s23 = dig [0] :: Div [] Integer
m23 = dig [0] :: Div Maybe Integer
---- GHCi runDiv s22 tree 
