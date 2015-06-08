module Data.Transactions 
(startCounter2,Service(..),Window(..),services)
where 
                               
import Control.Concurrent
import Control.Monad

startCounter2 :: Int -> IO ()
startCounter2 = void . forkIO . void . loop
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
