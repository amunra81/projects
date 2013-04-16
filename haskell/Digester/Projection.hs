import Tree
import Monad
import Control.Monad.Cont


data Divs
data Projection a = One  (Div a) |
                    Many [Div a]

-- all div2 >>= allChildren div6
allChildren :: Div a -> Divs a
allChildren div node = ContT $ 
            \next -> runContT $ div
                []
