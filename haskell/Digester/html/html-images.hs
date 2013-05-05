import Text.XML.HXT.Core
import Text.XML.HXT.HTTP
import Text.XML.HXT.Curl 
 
import System.Environment

imageTable	:: ArrowXml a => a XmlTree XmlTree
imageTable
    = selem "html"
      [ selem "head"
        [ selem "title"
          [ txt "Images in Page" ]
        ]
          , selem "body"
        [ selem "h1"
          [ txt "Images in Page" ]
        , selem "table"
          [ collectImages           -- (1)
            >>>
            genTableRows            -- (2)
          ]
        ]
      ]
    where
    collectImages                   -- (1)
        = deep ( isElem >>> hasName "img")
    genTableRows                    -- (2)
        = selem "tr"
          [ selem "td"
            [ getAttrValue "src" >>> mkText ]]
