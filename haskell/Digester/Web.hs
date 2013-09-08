import Tree
import Html

import Text.XML.HXT.Core hiding (Tree,root)
import Text.XML.HXT.HTTP
import Data.List
import Text.XML.HXT.DOM.TypeDefs
import Data.Tree.NTree.TypeDefs
import Printers

createWeb ::  Tree Html
createWeb = root (xText "za veb") []

createDomain ::  [PassParent Html]
createDomain = map xNode domainNames
               where domainNames = ["www.haskell.com","www.google.com"]
                     xNode = (flip node []) . xText 
               
xText ::  String -> Html
xText = Html . XText 
