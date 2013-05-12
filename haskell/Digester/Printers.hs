{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances #-} 
{-# LANGUAGE  OverlappingInstances #-}

module Printers() where 
import Tree
import Text.XML.HXT.DOM.TypeDefs
import Data.Tree.NTree.TypeDefs
import Control.Monad.Trans.List
import Control.Monad.Trans.Class
import System.IO.Unsafe(unsafePerformIO)

instance Show a => Show (Tree a) where
    show = showNode 0

-- Print the tree --
-- -------------- --

showNode:: Show a => Integer -> Tree a -> String
showNode depth (Root value children)        = "R("++(show value)++",["++(showChildren (depth + 1) children)++ "])"
showNode depth (Node value children _ pos)  = "N"++(show pos)++"("++(show value)++",["++
                                                (showChildren (depth + 1) children)++ "])"
showNode depth (Leaf value _ pos)           = "L"++(show pos)++"("++(show value)++")"

showChildren :: Show a => Integer -> [Tree a] -> String
showChildren  depth = concatStr . map (ident . showNode depth)
                where
                concatStr  = foldl (++) ""  
                ident str = ( foldl (\acc _-> acc ++ "       ") "\n" [1..depth] ) ++ str


-- Print tree list --
-- --------------- --
instance Show a => Show ([(Tree a)]) where
    show (x:xs) = foldl (\acc x -> acc ++ "\n+ " ++ (show x)) ("+ " ++ show x) xs   
    show _ = "n/a"

instance Show a => Show (ListT IO (Tree a)) where
    show ls = unsafePerformIO $ do
                                   xs <- runListT ls 
                                   (return . show) xs
