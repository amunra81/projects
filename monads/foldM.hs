--
-- Monadic fold function
--

import Control.Monad
import Control.Monad.Writer

foldM':: (Monad m) => (a -> b -> m a) -> a -> [b] -> m a
foldM' f acc [] = return acc
foldM' f acc (x:xs) = f acc x >>= \acc -> foldM' f acc xs

binSmalls:: Int -> Int -> Maybe Int
binSmalls acc x 
        | x > 9 = Nothing
        | otherwise = Just(x + acc)

valid   = foldM' binSmalls 0 [1,2,8,4,5]
invalid = foldM' binSmalls 0 [1,2,18,4,5]

sumNumbers:: String -> Int -> Writer [String] String
sumNumbers acc x  = do
    tell [ message ]    
    return $ show newAcc
    where message = ( if odd x then "Odd -> " else  "Even -> " ) ++ show x
          newAcc = read acc + x

sumTopTen = foldM' sumNumbers "0" [1..10]

--GHCi runWriter $ sumTopTen
--GHCi mapM_ putStrLn $ snd $ runWriter $ sumTopTen
--GHCi reads "1asda"::[(Int,String)]

