module HtmlPlay where
import Tree
import Html
import Control.Monad.List
import Monad
import Control.Monad.Trans.Cont(ContT(..))

haskellPage ::  IO (Tree (ListT IO) Html)
haskellPage = downloadTree "http://www.haskell.com"

--get :: String -> Div m a
get str t = ContT $  
            \ next -> next $ downloadTree str
                        

t = root "http://www.haskell.com" []

--d t = do
--        t1 <- all t
--        return 
