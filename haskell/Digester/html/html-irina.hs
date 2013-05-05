module Main
where
 
import Text.XML.HXT.Core
import Text.XML.HXT.HTTP -- use libcurl for HTTP access
import Text.XML.HXT.Curl -- use libcurl for HTTP access
                         -- only necessary when reading http://...
 
import System.Environment
 
main :: IO ()
main
    = do
      let (src:dst:_) = ["http://www.google.be", "ilidenta.html"] 
      runX ( readDocument [withValidate no
                          ,withParseHTML yes
                          ,withHTTP []
                          ] src
	     >>> 
	     writeDocument [withIndent yes
                           ,withOutputEncoding isoLatin1
                           ] dst
	   )
      return ()
