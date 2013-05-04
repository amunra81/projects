import Data.List
import Text.XML.HXT.Core
import Text.HandsomeSoup

main = do
  html <- readFile "Data\\test.html"
  let doc = readString [withParseHTML yes, withWarnings no] html
  links <- runX $ doc //> hasName "a" >>> getAttrValue "href"
  mapM_ putStrLn links
-- ⇶
