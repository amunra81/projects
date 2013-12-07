import Control.Monad
import Control.Monad.Trans

newtype MaybeT m a = MaybeT { runMaybeT :: m (Maybe a) }

instance Monad m => Monad ( MaybeT m ) where
    return = MaybeT . return . Just

    m >>= f = MaybeT $ do 
                x <- runMaybeT m
                maybe ( return Nothing ) ( runMaybeT . f ) x        

instance MonadTrans MaybeT where
  lift m = MaybeT $ do 
                   x <- m
                   return $ Just x
 
   -- lift = MaybeT . ( liftM Just )

getPassword :: MaybeT IO String
getPassword = do x <- lift getLine
                 return x

askPassword :: MaybeT IO ()
askPassword = do lift $ putStrLn "Insert your new password:"
                 value <- getPassword
                 lift $ putStrLn value

main = runMaybeT askPassword
