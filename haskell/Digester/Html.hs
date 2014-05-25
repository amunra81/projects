{-# LANGUAGE FlexibleContexts #-}

module Html where 
import Text.XML.HXT.Core hiding (Tree,root)
import Text.XML.HXT.HTTP
import Data.Tree.NTree.TypeDefs
import Tree

newtype Html = Html {runNode :: XNode} 

-- | download a html page and transform it into a html-tree
downloadTree ::  Convertible [] n => String -> IO (Tree n Html)
downloadTree url = do
    (al, src, dst) <- cmdlineOpts [url, "ilidenta.html"] 
    (x:_) <- runX (application al src dst)
    return $ transform $ mapTree x

-- | the dummy for the boring stuff of option evaluation,
-- usually done with 'System.Console.GetOpt'
cmdlineOpts :: [String] -> IO (SysConfigList, String, String)
cmdlineOpts argv
  = return ([withValidate no, withParseHTML yes,withHTTP []], argv!!0, argv!!1)

-- | mapping an XmlTree to a Tree of Html
mapTree :: XmlTree -> Tree [] Html
mapTree (NTree val xs) 
  = root (Html val) $ g xs
    where 
    g zs = [getTreeNode x | x <- zs]
    getTreeNode xml = case xml of
                      NTree a [] -> leaf (Html $ a)
                      NTree a ys -> node (Html $ a) (g ys)

-- | application
application	:: SysConfigList -> String -> String -> IOSArrow b XmlTree
application cfg src _
  = configSysVars (withTrace 1 : cfg)                            
    >>> traceMsg 1 "start reading document"                        
    >>> readDocument [] src
    >>> traceMsg 1 "document read"               

-- show instance of HTML data
instance Show Html where
  show  (Html (XText s))            = s
  show  (Html (XCharRef n))         = show n
  show  (Html (XEntityRef s))       = "{ entityRef = "++s++ " }"
  show  (Html (XCmt s))             = "{ comment = "++ s ++ " }"
  show  (Html (XCdata s))           = "{ cdata = " ++ s ++ " }"
  show  (Html (XPi name _))         = "{ pi = " ++ show name ++ " }"
  show  (Html (XTag name _))        = show name
  show  (Html (XDTD _ _))           = "{ xdtd }"
  show  (Html (XAttr name))         = "a"++show name
  show  (Html (XError errno msg))   = "{ error = "++ show errno ++ " - " ++ msg ++ " }"
  show  (Html (XBlob _))            = na

