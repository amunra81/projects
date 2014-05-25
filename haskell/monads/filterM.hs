--
-- Monadic filter function
--
import Control.Monad
import Control.Monad.Writer

-- keepSmall Monadic predicat function
keepSmall :: Int -> Writer [String] Bool
keepSmall x 
        | x < 4 = do
            tell ["Keeping " ++ show x]
            return True

        | otherwise = do
            tell [show x ++ " is to large, throwing it away"]
            return False


--some custom implementation of filterM'
filterM' :: (Monad m) => (a -> m Bool) -> [a] -> m [a]
filterM' _ [] = return []
filterM' f (x:xs) = do
            valid <- f x
            if valid then do
                ls <- filterM' f xs
                return (x:ls)

            else filterM' f xs 
                
--another implementation of the same filter function
filterM'a ::  Monad m => (a -> m Bool) -> [a] -> m [a]
filterM'a f (x:xs) = f x >>= ( \b -> if b then filterM'a f xs >>= \ls -> return (x:ls)
                                    else filterM'a f xs) 
filterM'a _ _ = error ""

filterM'b :: (Monad m) => (a -> m Bool) -> [a] -> m [a]
filterM'b f xs =
        foldM func [] xs
        where func acc x = do 
                valid <- f x
                if valid then return $ acc ++ (x:[])
                else return acc

--GHCi mapM_ putStrLn $ snd $ runWriter $ filterM'b  keepSmall [1,2,3,4,5,6,7,8,9,0]
--GHCi fst $ runWriter $ filterM'b  keepSmall [1,2,3,4,5,6,7,8,9,0]

--official implementation
stdFilter ::  IO ()
stdFilter = mapM_ putStrLn $ snd $ runWriter $ filterM  keepSmall [1,2,3,4,5,6,7,8,9,0]

--the equivalent custom-implementation
cusFilter ::  IO ()
cusFilter = mapM_ putStrLn $ snd $ runWriter $ filterM' keepSmall [1,2,3,4,5,6,7,8,9,0]
