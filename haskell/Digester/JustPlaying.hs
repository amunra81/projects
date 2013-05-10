import Tree
import Html
import Control.Monad.Trans.Maybe(MaybeT)
import Monad

type Some = Div (MaybeT IO) Html
-- data Proj a = forall m. MonadZero m => Proj ( Div m a )
