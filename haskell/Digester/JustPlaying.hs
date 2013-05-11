import Tree
import Monad
import Projection
import Control.Monad.Trans.Maybe
import Control.Monad.Trans.List
import Prelude hiding (any)
import Printers
import Data.Foldable
import Control.Monad

newtype MaybeIO a = MaybeIO { runMIO :: MaybeT IO a }

instance Monad MaybeIO where
    return a = MaybeIO $ return a
    m >>= f = MaybeIO $ do 
                        a <- runMIO m
                        runMIO $ f a

instance MonadPlus MaybeIO where
    mzero = MaybeIO $ mzero
    mplus m1 m2 = MaybeIO $ (runMIO m1) `mplus` (runMIO m2)

instance MonadNonZero MaybeIO where 
    nonzero mx my = MaybeIO $ (MaybeT $ do 
                       let runIO =  runMaybeT . runMIO 
                       x <- runIO mx
                       let r = runIO $ case x of
                                       Nothing -> my
                                       _       -> mx
                       r)
--
--    firstnonzero (Nothing:xs) = firstnonzero xs
--    firstnonzero (x:xs)  = x
--    firstnonzero []      = Nothing
-- Foldable, MonadPlus,MonadIO,MonadZero

--
----(sdiv1:sdiv2:sdiv3:sdiv4:sdiv5:sdiv6:sdiv7:sdiv8:_) = map equal [1..]::[Div (ListT IO) Integer]
--(mdiv1:mdiv2:mdiv3:mdiv4:mdiv5:mdiv6:mdiv7:mdiv8:_) = map equal [1..]::[Div ( MaybeIO ) Integer]
--
--tree1 = 
--    root 1 [
--            --from here 
--            node 2 [
--                    leaf 6,
--                    node 5 [
--                            leaf 7 ], -- to here is repeating
--                    node 2 [
--                            leaf 6,
--                            node 5 [
--                                    leaf 7 ],
--                            leaf 7 ],
--                    leaf 7 ],
--            leaf 3,
--            node 2 [
--                    leaf 6,
--                    node 5 [
--                            leaf 7 ],
--                     leaf 7 ],
--            leaf 4 ]
--
---- Maybe vs List --
---- ------------- --
--
----s11 = proot (first ... sdiv2) [] -- only one result
--m11 = proot (first ... mdiv2) [] -- only one result
--
----s12 = proot (any ... sdiv2) [] -- three results
--m12 = proot (any ... mdiv2) [] -- only one result
---- GHCi  projectToRoot m11 tree1
---- GHCi  projectToRoot s11 tree1
---- GHCi  projectToRoot m12 tree1
---- GHCi  projectToRoot s12 tree1 
