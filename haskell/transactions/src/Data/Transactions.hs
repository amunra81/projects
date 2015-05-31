{-# LANGUAGE ForeignFunctionInterface #-}
module Data.Transactions where 
import Control.Concurrent
import Control.Monad

foreign export ccall startCounter :: Int -> IO ()
foreign export ccall divByZero :: Double -> IO Double

divByZero :: Double -> IO Double
divByZero n = do
                print ( n / 0 )
                return $ n / 0

startCounter :: Int -> IO ()
startCounter = void . forkIO . void . loop
    where loop i = do
            putStrLn (replicate i 'o')
            threadDelay 100000
            loop (i + 1)

-- |the porpuse of this is just for the design
-- a service has several windows
data Service = Srv { id :: String }
data Window = Window

services :: [Service]
services = [Srv "PSC",
            Srv "Enel"]

