zrdule Web (staticWeb) where

import Tree
import Html

import Text.XML.HXT.Core hiding (Tree,root,getChildren)
import Control.Monad.Trans.List
import Control.Monad.Trans.Class(lift)

staticWeb ::  IO (Tree Html)
staticWeb =  do 
          xs <- runListT domains
          return $ root (xText "za veb") xs

xText ::  String -> Html
xText = Html . XText 

liftList :: (Monad m) =>  [a] -> ListT m a
liftList = ListT . return
        
-- | create the domain nodes
domains :: ListT IO (PassParent Html)
domains = do
            a <- liftList ["http://www.haskell.com","http://www.google.com"] 
            t <- lift $ downloadTree a
            return $ 
                node (xText a) [toPassParent x | x <- getChildren t]
