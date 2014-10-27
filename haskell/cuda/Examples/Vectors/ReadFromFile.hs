{-# LANGUAGE BangPatterns #-}
module Examples.Vectors.ReadFromFile where
 
import qualified Data.ByteString.Lazy.Char8 as L
import qualified Data.Vector                as U
 
main :: String -> IO ()
main str = do
    --[f] <- getArgs
    s   <- L.readFile str
    print . U.sum . parse $ s
 
-- Fill a new vector from a file containing a list of numbers.
parse :: L.ByteString -> U.Vector Int
parse = U.unfoldr step
  where
     step !s = case L.readInt s of
        Nothing       -> Nothing
        Just (!k, !t) -> Just (k, L.tail t)

-- $ ghc -Odph --make ReadFromFile.hs
-- $ time ./ReadFromFile data
