module JustPlaying() where

import Tree
import Html
import Control.Monad.Trans.Maybe(MaybeT)
import Monad
import Projection
import Control.Monad.Trans.Maybe
import Control.Monad.Trans.List
import Prelude hiding (any)
import Control.Monad 
import Control.Monad.IO.Class

(sdiv1:sdiv2:sdiv3:sdiv4:sdiv5:sdiv6:sdiv7:sdiv8:_) = map equal [1..]::[Div (ListT IO) Integer]
(mdiv1:mdiv2:mdiv3:mdiv4:mdiv5:mdiv6:mdiv7:mdiv8:_) = map equal [1..]::[Div (MaybeT IO) Integer]

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
---- GHCi  projectToRoot m11 tree1
