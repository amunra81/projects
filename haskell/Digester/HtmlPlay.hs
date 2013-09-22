module HtmlPlay where
import Tree
import Html

haskellPage ::  IO (Tree Html)
haskellPage = downloadTree "http://www.haskell.com"
