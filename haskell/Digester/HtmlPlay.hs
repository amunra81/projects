import Text.XML.HXT.Core hiding (Tree,root)
import Text.XML.HXT.HTTP
import Data.List
import Text.XML.HXT.DOM.TypeDefs
import Data.Tree.NTree.TypeDefs
import Tree
import Printers
import Html

haskellPage ::  IO (Tree Html)
haskellPage = downloadTree "http://www.haskell.com"

