module MyStreams where

import qualified System.IO.Streams as S
na = error "na"

-- reading from an input stream
test ::  IO ()
test = do
        listHandle <- S.fromList ([1,2]::[Integer])
        i1 <- S.read listHandle
        (putStrLn . show) i1
        i2 <- S.read listHandle
        (putStrLn . show) i2
        i3 <- S.read listHandle
        (putStrLn . show) i3


-- streams transformation
test2 = do
        oldHandle <- S.fromList ([1,2]::[Integer])
        newHandle <- S.mapM (\a-> (return . show) (a*10)) oldHandle
        i1 <- S.read newHandle
        (putStrLn . show) i1
        -- we can still see the stream throw the old handle
        i2 <- S.read oldHandle
        (putStrLn . show) i2
        i3 <- S.read newHandle
        (putStrLn . show) i3

