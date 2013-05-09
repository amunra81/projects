import Html
import Tree 
import Printers

haskellPage ::  IO (Tree Html)
haskellPage =   do 
                x <- downloadTree "www.haskell.com"
                return x 

