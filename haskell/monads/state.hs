import Control.Monad

--
-- State
--
type Stack = [Int]
newtype State s a = State { runState :: s -> (a,s) }  

instance Monad (State s) where  
    return x = State $ \s -> (x,s)  
    (State h) >>= f = State $ \s -> let (a, newState) = h s  
                                        (State g) = f a  
                                    in  g newState  
pop :: State Stack Int  
pop = State $ \(x:xs) -> (x,xs)  
  
push :: Int -> State Stack ()  
push a = State $ \xs -> ((),a:xs) 


stackManip1a = do
              push 3 
              pop
              pop

stackManip1b =  push 3 
                >>= \_ -> pop 
                >>= \_ -> pop

stackManip2a = do
              push 3 
              a <- pop
              b <- pop
              return a

stackManip2b =  ( push 3 ) 
                >>= \_ -> pop 
                >>= ( \a -> pop >>= (\b -> return a))
