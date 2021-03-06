module HtmlEcamples
where
 
import Text.XML.HXT.Core
 
write ::  IO ()
write = do
        runX $ root [] [helloWorld] >>> writeDocument [withIndent yes] "hello.xml"
        return ()
        
helloWorld	:: ArrowXml a => a XmlTree XmlTree
helloWorld
    = mkelem "html" []              -- (1)
      [ mkelem "head" []
        [ mkelem "title" []
          [ txt "Hello World" ]     -- (2)
        ]
      , mkelem "body"
        [ sattr "class" "haskell" ] -- (3)
        [ mkelem "h1" []
          [ txt "Hello World" ]     -- (4)
        ]
      ]
