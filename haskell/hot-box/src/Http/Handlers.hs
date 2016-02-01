{-# LANGUAGE OverloadedStrings, ScopedTypeVariables #-}
{-# LANGUAGE FlexibleInstances,UndecidableInstances,TypeFamilies #-}
module Http.Handlers where 

import Happstack.Server ( Response, ServerPartT,ServerPart, ok, toResponse, simpleHTTP
                        , nullConf,Conf(..), seeOther, dir, notFound, seeOther , ToMessage(..)
                        , Method(GET, POST, PUT),method,ServerMonad(askRq),serveDirectory,Browsing(..))
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
import Control.Storage       
import Data.HotBox      
import Data.Time
import Data.Text               (Text)

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

deleteItemFromCurrentOrderH :: Acid -> Id Restaurant -> Id Table -> Id User -> Id OrderItem -> ServerPart Response
deleteItemFromCurrentOrderH acid rid tid uid oid =
        handleUpdateFromMaybe acid (DeleteItemFromCurrentOrder rid tid uid oid)

addProductToCurrentOrderH :: Acid -> Id Restaurant -> Id Table -> Id User -> Id Product -> ServerPart Response
addProductToCurrentOrderH acid rid tid uid pid =
        handleUpdateFromMaybe acid (AddProductToCurrentOrder rid tid uid pid)

approveItemsH :: Acid -> Id Restaurant -> Id Table -> Id User -> ServerPart Response
approveItemsH acid rid tid = handleUpdateFromMaybe acid . ApproveItems rid tid 

addUserRequestH :: Acid -> Id Restaurant -> Id Table -> Id User -> Text -> ServerPart Response
addUserRequestH = requestReponseAction AddUserRequest

addWaiterResponseH :: Acid -> Id Restaurant -> Id Table -> Id User -> Text -> ServerPart Response
addWaiterResponseH = requestReponseAction AddWaiterResponse

requestReponseAction acidHandler acid rid tid uid = root
        where 
        root "WaiterRequest"    = doWork WaiterRequest
        root "CheckRequest"     = doWork CheckRequest
        root _                  = notFound'

        doWork act  = do   
            time <- lift getCurrentTime
            handleUpdateFromMaybe acid $ acidHandler rid tid uid (act,time) 

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

