{-# LANGUAGE FlexibleContexts #-}

module Web (staticWeb,get,post) where

import Tree
import Html
import Monad
import Text.XML.HXT.Core hiding (Tree,root,getChildren)
import Control.Monad.Trans.Cont(ContT(..))
import Control.Monad.Trans.List(ListT(..))
import Control.Monad.Trans.Class(lift)
import Control.Monad.IO.Class(MonadIO,liftIO)

staticWeb ::  IO (Tree [] Html)
staticWeb =  do 
          xs <- runListT domains
          return $ root (xText "za veb") xs

xText ::  String -> Html
xText = Html . XText 

liftList :: (Monad m) => [a] -> ListT m a
liftList = ListT . return
        
-- | create the domain nodes
domains ::  ListT IO (PassParent [] Html)
domains = do
            a <- liftList ["http://www.google.com"] 
            t <- lift $ downloadTree a
            return $ 
                node (xText a) [toPassParent x | x <- getChildren t]

-- get a html page returning a div
get :: (Monad m,MonadIO m,Convertible [] m) 
    => String -> Div m Html
get str _ = ContT $  
            \ next -> do 
               web <- liftIO $ downloadTree str 
               next web

post :: String -> String -> Div m a
post = na
