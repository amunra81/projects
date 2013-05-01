{-# LANGUAGE ScopedTypeVariables #-}
import Tree
import Monad
import Control.Monad.Cont
import Prelude hiding (any) 
import Printers
                    
(sdiv1:sdiv2:sdiv3:sdiv4:sdiv5:sdiv6:sdiv7:sdiv8:sdiv9:_) = map equal [1..]::[Div [] Integer]
(mdiv1:mdiv2:mdiv3:mdiv4:mdiv5:mdiv6:mdiv7:mdiv8:mdiv9:_) = map equal [1..]::[Div Maybe Integer]

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

s13 =  any ... ( sdiv2 ^< sdiv5 ) ^< sdiv7       -- RESULT: Some 
m13 =  any ... ( mdiv2 ^< mdiv5 ) ^< mdiv7       -- RESULT: Some 
---- GHCi runDiv s11 tree 

-- DIGGING AND ESCALATION --
-- ---------------------- --
s21 = any ... sdiv7 ... escalate 1
m21 = any ... mdiv7 ... escalate 1
---- GHCi runDiv s21 tree 

s22 = any ... sdiv2 ... dig [1,0]
m22 = any ... mdiv2 ... dig [1,0]
---- GHCi runDiv s22 tree 

s23 = dig [0] :: Div [] Integer
m23 = dig [0] :: Div Maybe Integer
---- GHCi runDiv s22 tree 

-- INDEXES --
-- ------- --
indexOf ::  MonadPlus m => Div m Integer -> m [Pos]
indexOf div = do
                x <- runDiv div tree 
                return (index x)

s31 = indexOf $ any ... sdiv2
m31 = indexOf $ any ... mdiv2
-- GHCi s31

commonIndexesOf div1 div2 = do 
                    x <- runDiv div1 tree
                    y <- runDiv div2 tree 
                    return (commonIndexes x y)

s32 = commonIndexesOf (any ... sdiv9) (any ... sdiv6)
m32 = commonIndexesOf (any ... mdiv9) (any ... mdiv6)
-- GHCi s32

s33 = commonIndexesOf (any ... sdiv2) (any ... sdiv2) -- all the posibilities
m33 = commonIndexesOf (any ... mdiv2) (any ... mdiv2) -- the same one
-- GHCi s33

-- Path --
-- ---- --
