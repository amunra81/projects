import Text.XML.HXT.Core
import Text.XML.HXT.HTTP
import Text.XML.HXT.Curl 
 
import System.Environment

main :: IO ()
main
    = do
      let (src:dst:_) = ["http://www.hotnews.ro", "images.html"] 
      runX $ imageTable (readDocument [withValidate no
                          ,withParseHTML yes
                          ,withHTTP []
                          ] src)
	     >>> 
	     writeDocument [withIndent yes
                           ,withOutputEncoding isoLatin1
                           ] dst
	   
      return ()

-- write = do
--         runX $ root [] [imageTable] >>> writeDocument [withIndent yes] "images.xml"
--         return ()
-- 
imageTable	:: ArrowXml a => a XmlTree XmlTree -> a XmlTree XmlTree
imageTable pg
    = selem "html"
      [ selem "head"
        [ selem "title"
          [ txt "Images in Page" ]
        ]
          , selem "body"
        [ selem "h1"
          [ txt "Images in Page" ]
        , selem "table"
          [ pg {->>> collectImages           -- (1)
            >>>
            genTableRows            -- (2) -}
          ]
        ]
      ]
  --  where
  --  collectImages                   -- (1)
  --      = deep ( isElem >>> hasName "img")
  --  genTableRows                    -- (2)
  --      = selem "tr"
  --        [ selem "td"
  --          [ getAttrValue "src" >>> mkText ]]
