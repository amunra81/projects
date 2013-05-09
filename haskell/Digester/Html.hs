module Html(mapTree ,  downloadTree,Html(..))
where 

import Text.XML.HXT.Core hiding (Tree,root)
import Text.XML.HXT.HTTP
import Data.List
import Text.XML.HXT.DOM.TypeDefs
import Data.Tree.NTree.TypeDefs
import Tree
import Printers

type Html = XNode
type HtmlTree = Tree Html

downloadTree :: String -> IO ( Tree Html )
downloadTree url = do
    (al, src, dst) <- cmdlineOpts [url, "ilidenta.html"] 
    (x:_) <- runX (application al src dst)
    return $ mapTree x
    

mapTree :: XmlTree -> Tree Html
mapTree (NTree val xs) = 
    root val $ children xs 
    where 
        children xs = [ getTreeNode x | x <- xs]
        getTreeNode xml = case xml of
                          NTree val [] -> leaf val
                          NTree val xs -> node val (children xs)

-- | the dummy for the boring stuff of option evaluation,
-- usually done with 'System.Console.GetOpt'
cmdlineOpts 	:: [String] -> IO (SysConfigList, String, String)
cmdlineOpts argv
    = return ([withValidate no, withParseHTML yes,withHTTP []], argv!!0, argv!!1)


application	:: SysConfigList -> String -> String -> IOSArrow b XmlTree
application cfg src dst
    = configSysVars (withTrace 1 : cfg)                            
      >>> traceMsg 1 "start reading document"                        
      >>> readDocument [] src
      >>> traceMsg 1 "document read"               

