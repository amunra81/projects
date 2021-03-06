{-# LANGUAGE FlexibleInstances #-}
module ShowInstances where 

import Control.Monad.Trans.List(ListT(..))
import Tree
import System.IO.Unsafe(unsafePerformIO)

ltoStr m = do
            xs <- runListT m
            return $ foldl (\acc t -> acc ++ (show t)) "" xs

instance Show a => Show (ListT IO (Tree (ListT IO) a)) where
    show = unsafePerformIO . ltoStr

instance Show (ListT IO String) where
    show = show . unsafePerformIO . runListT

instance Show (ListT IO Bool) where
    show = show . unsafePerformIO . runListT 

instance Show (ListT IO Integer) where
    show = showL 

showL = show . unsafePerformIO . runListT
