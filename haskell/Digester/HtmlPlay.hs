{-# LANGUAGE FlexibleContexts #-}

module HtmlPlay where
import Tree
import Html
import Control.Monad.Trans.List(ListT(..))
import Monad
import Control.Monad.Trans.Cont(ContT(..))
import Prelude hiding (any)
import Text.XML.HXT.Core hiding (Tree,root,first)
import Control.Monad.IO.Class(MonadIO)
import Control.Monad.IO.Class(liftIO)
import Control.Monad(MonadPlus(..))

haskellPage ::  IO (Tree (ListT IO) Html)
haskellPage = downloadTree "http://www.haskell.com"

get :: (Monad m,MonadIO m,Convertible [] m) 
    => String -> Div m Html
get str _ = ContT $  
            \ next -> do 
               web <- liftIO $ downloadTree str 
               next web

htmTxt :: String -> Html
htmTxt = Html . XText

t ::  Tree (ListT IO) Html
t = transform $ root (htmTxt "http://www.haskell.com") []

equalTag :: MonadPlus m => String -> Div m Html
equalTag str tree = 
        ContT $ \ next ->
            if show (value tree) == str then next tree 
                                       else mzero

d :: (MonadPlus m,Convertible [] m,Monad m,MonadIO m,MonadNonZero m) => Div m Html
d s = do
        t1 <- first s
        let (Html (XText url)) = value t1 
        t2 <- get url t1
        any ==. equalTag "\"body\"" $ t2 

x ::  ListT IO (Tree (ListT IO) Html)
x = runDiv d t 
