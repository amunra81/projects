module TreePlay where
import Tree
import Data.Traversable(traverse)
import Control.Monad.List
import Data.Functor.Identity(Identity(..))

exList ::  Tree [] Integer
exList =   root 2 [ 
                node 1  [
                        node 1 [],  
                        node 1 [], 
                        node 3 []], 
                leaf 2 ] 
--GHCi countNodes exList

exMaybe :: Tree Maybe Integer
exMaybe = root 2 $ Just $ node 1 $ Just $ leaf 4
--GHCi countNodes exMaybe

exListT :: Tree (ListT IO) Integer
exListT = root 2 $ ListT $ return [ 
                node 1  $ ListT $ return [
                        node 1 $ ListT $ return [],  
                        node 1 $ ListT $ return [], 
                        node 3 $ ListT $ return []], 
                leaf 2 ] 
listTNodes = runListT $ countNodes exListT
                
-- GHCi some
a :: Maybe [Integer]
a = traverse (\x -> if x == 4 then Nothing else Just x ) [1,2,3] 

-- brothers

Root _ (Node _ (_:x:_) _ _:_) = exList
Root _ (n:_)  = exList
next = nextBrothers x

HasParent p = parent x
