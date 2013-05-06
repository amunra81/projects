import Text.XML.HXT.Core
import Text.XML.HXT.HTTP
 
import System.Environment
import System.IO
import System.Environment
import System.Console.GetOpt
import System.Exit
 
main :: IO ()
main
    = do
      --argv <- getArgs
      (al, src, dst) <- cmdlineOpts ["http://haskell.com", "ilidenta.html"] 
      [rc]  <- runX (application al src dst)
      if rc >= c_err
	  then exitWith (ExitFailure (0-1))
	  else exitWith ExitSuccess
 
-- | the dummy for the boring stuff of option evaluation,
-- usually done with 'System.Console.GetOpt'
cmdlineOpts 	:: [String] -> IO (SysConfigList, String, String)
cmdlineOpts argv
    = return ([withValidate no, withParseHTML yes,withHTTP []], argv!!0, argv!!1)
 
-- | the main arrow
application	:: SysConfigList -> String -> String -> IOSArrow b Int
application cfg src dst
    = configSysVars (withTrace 1 : cfg)                           -- (0)
      >>>
      traceMsg 1 "start reading document"                         -- (1)
      >>>
      readDocument [] src
      >>>
      traceMsg 1 "document read, start processing"                -- (2)
      >>> 
      processChildren (processDocumentRootElement `when` isElem)
      >>>
      traceMsg 1 "document processed"                             -- (3)
      >>>
      writeDocument [] dst
      >>>
      getErrStatus 

-- | the dummy for the real processing: the identity filter
processDocumentRootElement	:: IOSArrow XmlTree XmlTree
processDocumentRootElement
    = this         -- substitute this by the real application

selectAllText	:: ArrowXml a => a XmlTree XmlTree
selectAllText
    = deep isText

selectAllTextAndAltValues	:: ArrowXml a => a XmlTree XmlTree
selectAllTextAndAltValues
    = deep
      ( isText                       -- (1)
        <+>
        ( isElem >>> hasName "img"   -- (2)
          >>>
          getAttrValue "alt"         -- (3)
          >>>
          mkText                     -- (4)
        )
      )
