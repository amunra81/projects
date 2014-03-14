{-# LANGUAGE Rank2Types #-}

import Control.Monad.ST
import Data.STRef
import Control.Monad

some ::  Num b => [b] -> ST s b
some xs = do                            -- runST takes out stateful code and makes it pure again.
            n <- newSTRef 0             -- Create an STRef (place in memory to store values)
            forM_ xs $ \x -> do         -- For each element of xs ..
                modifySTRef n (+x)      -- add it to what we have in n.
         
            readSTRef n     


sumST :: Num a => [a] -> a
sumST xs = runST $ some xs
-- GHCi sumST [1,2,3]
main = error ""
