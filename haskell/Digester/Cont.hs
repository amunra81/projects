module Cont where
import Control.Monad.Cont
ex1 :: Maybe Integer
ex1 = do
   a <- return 1
   b <- return 10
   return $ a+b

ex2 :: [Integer]
ex2 = do
   a <- return 1
   b <- return 10
   return $ a+b

ex3 ::  ContT r m Integer
ex3 = do
   a <- ContT (\fred -> fred 1)
   b <- ContT (\fred -> fred 10)
   return $ a+b

test3 ::  String
test3 = runCont ex3 $ show

ex4 ::  ContT r m Integer
ex4 = ContT (\fred -> fred 1) >>= \ a -> 
      ContT (\fred -> fred 10) >>= \b -> 
      return $ a + b 

test4 ::  String
test4 = runCont ex4 $ show
