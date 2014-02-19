{-# LANGUAGE FlexibleContexts #-}

module HtmlPlay where
import Tree
import Html
import Control.Monad.List
import Monad
import Control.Monad.Trans.Cont(ContT(..))
import Prelude hiding (any)
import Text.XML.HXT.Core hiding (Tree,root,first)
import Text.XML.HXT.HTTP
import Data.Tree.NTree.TypeDefs
import ShowInstances 

haskellPage ::  IO (Tree (ListT IO) Html)
haskellPage = downloadTree "http://www.haskell.com"

get :: (Monad m,MonadIO m,Convertible [] m) 
    => String -> Div m Html
get str t = ContT $  
            \ next -> do
                        web <- liftIO $ downloadTree str 
                        next web

htmTxt :: String -> Html
htmTxt = Html . XText

t ::  Tree (ListT IO) Html
t = transform $ root (htmTxt "http://www.google.com") [node (htmTxt "http://www.haskell.com") []]

d :: (MonadPlus m,Convertible [] m,Monad m,MonadIO m) => Div m Html
d t = do
        t1 <- any t
        let (Html (XText url)) = value t1 
        return t1
        --get url t1

x = runDiv d t
