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

ex3 ::  ContT a m Integer
ex3 = do
   a <- ContT (\fred -> fred 1)
   b <- ContT (\fred -> fred a)
   return $ a+b

test3 ::  String
test3 = runCont ex3 $ show

ex4 ::  ContT r m Integer
ex4 = ContT (\fred -> fred 1) >>= \ a -> 
      ContT (\fred -> fred 10) >>= \b -> 
      return $ a + b 

test4 ::  String
test4 = runCont ex4 $ show

ex5 ::  (Monad m) => ContT String m Integer
ex5 = do
   a <- return 1
   b <- ContT (\_ -> return "s-a anulat continuarea")
   return $ a+b
    
test5 ::  String
test5 = runCont ex5 $ show

-- implementare de capul meu ca sa inteleg mai bine
newtype MyCont r a = MyCont { myCont :: (a -> r) -> r}

runMyCont :: MyCont r a -> ( a -> r ) -> r
runMyCont m f = myCont m $ f

instance Monad (MyCont a) where
 return r   = MyCont $ \f -> f r
 m >>= f     = MyCont $ \next -> runMyCont m (\a -> runMyCont (f a) next)

perm :: Integer -> [[Integer]]
perm n = do
    x <- [1..n]
    xs <- perm $ n-1
    return $ x:xs
    
