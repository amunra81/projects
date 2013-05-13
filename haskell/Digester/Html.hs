module Html(mapTree ,  downloadTree,Html(..))
where 

import Text.XML.HXT.Core hiding (Tree,root)
import Text.XML.HXT.HTTP
import Data.List
import Text.XML.HXT.DOM.TypeDefs
import Data.Tree.NTree.TypeDefs
import Tree
import Printers

newtype Html = Html {runNode :: XNode} 

type HtmlTree = Tree Html

-- | download a html page and transform it into a html-tree
downloadTree :: String -> IO ( Tree Html )
downloadTree url = do
    (al, src, dst) <- cmdlineOpts [url, "ilidenta.html"] 
    (x:_) <- runX (application al src dst)
    return $ mapTree x

-- | mapping an XmlTree to a Tree of Html
mapTree :: XmlTree -> Tree Html
mapTree (NTree val xs) = 
    root (Html val) $ children xs 
    where 
        children xs = [ getTreeNode x | x <- xs]
        getTreeNode xml = case xml of
                          NTree val [] -> leaf (Html $ val)
                          NTree val xs -> node (Html $ val) (children xs)

-- | the dummy for the boring stuff of option evaluation,
-- usually done with 'System.Console.GetOpt'
cmdlineOpts 	:: [String] -> IO (SysConfigList, String, String)
cmdlineOpts argv
    = return ([withValidate no, withParseHTML yes,withHTTP []], argv!!0, argv!!1)

-- | application
application	:: SysConfigList -> String -> String -> IOSArrow b XmlTree
application cfg src dst
    = configSysVars (withTrace 1 : cfg)                            
      >>> traceMsg 1 "start reading document"                        
      >>> readDocument [] src
      >>> traceMsg 1 "document read"               

instance Show Html where
  show  (Html (XText s))         = s
  show  (Html (XCharRef n))      = show n
  show  (Html (XEntityRef s))    = "{ entityRef = "++s++ " }"
  show  (Html (XCmt s))          = "{ comment = "++ s ++ " }"
  show  (Html (XCdata s))        = "{ cdata = " ++ s ++ " }"
  show  (Html (XPi name trees))  = "{ pi = " ++ (show name) ++ " }"
  show  (Html (XTag name trees)) = show name
  show  (Html (XDTD a b))        = "{ xdtd }"
  show  (Html (XAttr name))      = "a"++show name
  show  (Html (XError no msg))   = "{ error = "++ (show no) ++ " - " ++ msg ++ " }"

