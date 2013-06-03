import Tree
import Printers
import Html

haskellPage ::  IO (Tree Html)
haskellPage = downloadTree "http://www.haskell.com"

