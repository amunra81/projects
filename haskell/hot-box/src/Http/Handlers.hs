{-# LANGUAGE OverloadedStrings, ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances,UndecidableInstances #-}
module Http.Handlers where 

import Happstack.Server ( Response, ServerPartT,ServerPart, ok, toResponse, simpleHTTP
                        , nullConf,Conf(..), seeOther, dir, notFound, seeOther , ToMessage(..)
                        , Method(GET, POST, PUT),method,ServerMonad(askRq))
import Happstack.Server.Types (takeRequestBody,unBody)
import Data.HotBox      ( allRestaurants,Restaurant )
import Data.Aeson.Encode.Pretty (encodePretty)
import qualified Data.ByteString.Char8 as B
import qualified Data.ByteString.Lazy.Char8 as L
import Control.Monad.Trans  ( MonadTrans, lift )
import Data.Acid            ( AcidState, Query, Update
                            , makeAcidic, openLocalState )
import Data.Acid.Advanced   ( query', update' )
import qualified Data.List as List
import Control.Monad        (MonadPlus)
import Control.Monad.IO.Class (liftIO)
import Data.Aeson (decode,FromJSON,ToJSON)
import Data.Storage         (Storage(..),initialStorageState,GetAllRests(..)
                            ,GetAllUsers(..),AddNewUser(..),AddNewRest(..))

instance (ToJSON a) => ToMessage a where
  toContentType _ = B.pack "application/json"
  toMessage       = encodePretty

getRestaurants :: AcidState Storage -> (ServerPartT IO) Response
getRestaurants acid =  do
        (c :: [Restaurant]) <- lift $ query' acid GetAllRests
        ok $ toResponse c

getBody :: ServerPart (Maybe L.ByteString)
getBody = do
    req  <- askRq 
    body <- liftIO $ takeRequestBody req 
    return $ fmap unBody body

getBodyFromJson :: FromJSON a => ServerPart (Maybe a)
getBodyFromJson = do
        b <- getBody
        return (b >>= decode)

newRest :: AcidState Storage -> ServerPart Response
newRest acid = do
        (maybeR :: Maybe Restaurant) <- getBodyFromJson 
        case maybeR of
            Just rest -> 
                    do rest <- update' acid (AddNewRest rest)
                       ok $ toResponse rest
            Nothing -> notFound (toResponse (" notFound "::String))
