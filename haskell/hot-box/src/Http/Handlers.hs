{-# LANGUAGE OverloadedStrings, ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances,UndecidableInstances,TypeFamilies #-}
module Http.Handlers where 

import Happstack.Server ( Response, ServerPartT,ServerPart, ok, toResponse, simpleHTTP
                        , nullConf,Conf(..), seeOther, dir, notFound, seeOther , ToMessage(..)
                        , Method(GET, POST, PUT),method,ServerMonad(askRq))
import Happstack.Server.Types (takeRequestBody,unBody)
import Data.Aeson.Encode.Pretty (encodePretty)
import qualified Data.ByteString.Char8 as B
import qualified Data.ByteString.Lazy.Char8 as L
import Control.Monad.Trans  ( MonadTrans, lift )
import Data.Acid            ( AcidState, Query, Update
                            , makeAcidic, openLocalState,EventState )
import Data.Acid.Advanced   ( query', update' )
import qualified Data.List as List
import Control.Monad        (MonadPlus)
import Control.Monad.IO.Class (liftIO)
import Data.Aeson (decode,FromJSON,ToJSON)
import Data.Storage       
import Data.HotBox      

type Acid = AcidState Storage

instance (ToJSON a) => ToMessage a where
  toContentType _ = B.pack "application/json"
  toMessage       = encodePretty

getBody :: ServerPart (Maybe L.ByteString)
getBody = do
    req  <- askRq 
    body <- liftIO $ takeRequestBody req 
    return $ fmap unBody body

getBodyFromJson :: FromJSON a => ServerPart (Maybe a)
getBodyFromJson = do
        b <- getBody
        return (b >>= decode)

getWholeStorageH :: Acid -> ServerPart Response
getWholeStorageH acid = do
        (c :: Storage) <- lift $ query' acid GetWholeStorage
        ok $ toResponse c
        
-- | RESTAURANTS

getRestaurantsH :: AcidState Storage -> (ServerPartT IO) Response
getRestaurantsH acid =  do
        (c :: [Restaurant]) <- lift $ query' acid GetAllRests
        ok $ toResponse c

getRestaurantH :: AcidState Storage -> Int -> (ServerPartT IO) Response
getRestaurantH acid s = undefined

notFound' :: ServerPart Response
notFound' = notFound $ toResponse ("Not found" :: String)

getRestByIdH :: AcidState Storage -> Int -> ServerPart Response
getRestByIdH acid rid = handleQueryFromMaybe acid (GetRestById $ RestId rid)

newRestH :: AcidState Storage -> ServerPart Response
newRestH acid = do
        (maybeR :: Maybe Restaurant) <- getBodyFromJson 
        case maybeR of
         Just rest -> 
                 do rest <- update' acid (AddNewRest rest)
                    ok $ toResponse rest
         Nothing -> notFound'

-- | ORDERS 

getAllOrdersByRestAndTableH :: Acid -> Id Restaurant -> Id Table -> ServerPart Response
getAllOrdersByRestAndTableH acid rid tid = do
        (c :: [Order]) <- lift $ query' acid (GetOrdersByRestAndTable rid tid)
        ok $ toResponse c

getCurrentOrderH :: Acid -> Id Restaurant -> Id Table -> ServerPart Response
getCurrentOrderH acid rid tid = handleQueryFromMaybe acid (GetCurrentOrder rid tid)

attachUserToCurrentOrderH :: Acid -> Id Restaurant -> Id Table -> Id User -> ServerPart Response
attachUserToCurrentOrderH acid rid tid uid = 
        handleUpdateFromMaybe acid (AttachUserToCurrentOrder rid tid uid)

closeCurrentOrderH :: Acid -> Id Restaurant -> Id Table -> ServerPart Response
closeCurrentOrderH acid rid tid = do
        c <- lift $ update' acid (CloseCurrentOrder rid tid)
        ok $ toResponse c

handleQueryFromMaybe acid p = do
        c <- lift $ query' acid p
        case c of
         Just o -> ok $ toResponse o
         Nothing -> notFound'

handleUpdateFromMaybe acid p = do
        c <- lift $ update' acid p
        case c of
         Just o -> ok $ toResponse o
         Nothing -> notFound'
