{-# LANGUAGE ForeignFunctionInterface #-}
module Counter where
import Control.Concurrent
import Control.Monad

foreign export ccall startCounter :: Int -> IO ()
foreign export ccall divByZero :: Double -> IO Double

divByZero :: Double -> IO Double
divByZero n = do
                putStrLn $ show $ n / 0
                return $ n / 0
                
startCounter :: Int -> IO ()
startCounter = void . forkIO . void . loop
    where loop i = do
            putStrLn (replicate i 'o')
            threadDelay (10^6)
            loop (i + 1)
