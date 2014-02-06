module HtmlPlay where
import Tree
import Html
import Control.Monad.List

haskellPage ::  IO (Tree (ListT IO) Html)
haskellPage = downloadTree "http://www.haskell.com"
