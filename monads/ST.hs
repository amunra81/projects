import Control.Monad.State


postincrement :: State Integer Integer
postincrement = do { x <- get
                   ; put (x+1)
                   ; return x }
some = runState postincrement 4
-- GHCi some

