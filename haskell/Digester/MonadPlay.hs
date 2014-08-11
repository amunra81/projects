module MonadPlay where

import Tree
import Monad
import Prelude hiding (any) 
import Control.Monad.Trans.Maybe(MaybeT)
import Control.Monad.List(ListT)

sdiv1,sdiv2,sdiv3,sdiv4,sdiv5,sdiv6,sdiv7,sdiv8,sdiv9 :: Div [] Integer
mdiv1,mdiv2,mdiv3,mdiv4,mdiv5,mdiv6,mdiv7,mdiv8,mdiv9 :: Div Maybe Integer
isdiv1,isdiv2,isdiv3,isdiv4,isdiv5,isdiv6,isdiv7,isdiv8,isdiv9 :: Div (ListT IO) Integer
imdiv1,imdiv2,imdiv3,imdiv4,imdiv5,imdiv6,imdiv7,imdiv8,imdiv9 :: Div (MaybeT IO) Integer
(sdiv1:sdiv2:sdiv3:sdiv4:sdiv5:sdiv6:sdiv7:sdiv8:sdiv9:_) = map equal [1..]
(mdiv1:mdiv2:mdiv3:mdiv4:mdiv5:mdiv6:mdiv7:mdiv8:mdiv9:_) = map equal [1..]
(isdiv1:isdiv2:isdiv3:isdiv4:isdiv5:isdiv6:isdiv7:isdiv8:isdiv9:_) = 
                                    map equal [1..]::[Div (ListT IO) Integer]
(imdiv1:imdiv2:imdiv3:imdiv4:imdiv5:imdiv6:imdiv7:imdiv8:imdiv9:_) = 
                                    map equal [1..]::[Div (MaybeT IO) Integer]

tree :: Tree [] Integer
tree  = 
    root 1 
        [ node 2 
            [ leaf 6 ,
              node 5 
                [ leaf 7 ] ,
              leaf 7 ] ,
          leaf 2 ,
          node 3 
            [ node 2 
                [ leaf 4,
                  node 5 
                    [ leaf 9 ]]],
          leaf 4 ] 
--equal / first / any
s11 = (first ==. sdiv1)                      -- one
-- first is now well designed for the desired purpose
s12 = first ==. sdiv2                        -- one
s13 = any ==. sdiv2                          -- three
--parent of
s21 = sdiv1 ==. parentOf ==. sdiv2            -- two
s22 = sdiv1 ==< sdiv2                        -- two
--brothers
s31 = any ==. sdiv3 ==. nextBrother ==. sdiv4  -- one
s32 = any ==. sdiv4 ==. nextBrother ==. sdiv5  -- one
s33 = any ==. sdiv5 ==. prevBrother ==. sdiv4  -- one
s34 = any ==. sdiv2 ==. brother ==. sdiv2      -- two
--alt
s41 = alt (any ==. sdiv2 ==< sdiv5) (any ==. sdiv6 ==. brother ==. sdiv5) --two
s42 = alt (any ==. sdiv6 ==. brother ==. sdiv5) (any ==. sdiv2 ==< sdiv5) --one
--both
--both nu testeaza daca se intoarce acelasi nod, ci doar e bazat pe mzero
s51 = both (any ==. sdiv2 ==< sdiv5) (any ==. sdiv6 ==. brother ==. sdiv5) --two
s52 = both (any ==. sdiv6 ==. brother ==. sdiv5) (any ==. sdiv2 ==< sdiv5) --one
--childof and subnodeOf of
s61 = any ==. sdiv5 ==> sdiv2              --two
s62 = any ==. sdiv5 ==. subNodeOf ==. sdiv1 --two
--escalate / dig / childAt
s71 = any ==. sdiv1 ==< sdiv2 ==< sdiv5 ==< sdiv7 ==. (escalate 2) --one
s72 = sdiv1 ==. dig [0,1]                                      -- one
s73 = sdiv1 ==. childAt 3                                      -- one
-- GHCi runDiv  s11 tree

-- INDEXES --
-- ------- --
indexOf ::  Div [] Integer -> [[Pos]]
indexOf div = do
                x <- runDiv div tree 
                return (index x)

i31 = indexOf $ any ==. sdiv2
-- GHCi i31

commonIndexesOf div1 div2 = do 
                    x <- runDiv div1 tree
                    y <- runDiv div2 tree 
                    return (commonIndexes x y)

i32 = commonIndexesOf (any ==. sdiv9) (any ==. sdiv6)
-- GHCi i32

i33 = commonIndexesOf (any ==. sdiv2) (any ==. sdiv2) -- all the posibilities
-- GHCi i33
