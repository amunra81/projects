{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DefaultSignatures #-}
module Data.Transactions 
(Service(..),Service2(..),services)
where 
                               
import Control.Monad
import GHC.Generics (Generic)
import Foreign.CStorable
import Foreign.Storable
import GHC.Prim()
import Prelude
import Foreign.C.String(CString,newCAString)
import Control.Monad.Trans.Class(lift)
import Control.Monad.Trans.List(ListT(..))
import Foreign.C.Types(CInt)


-- |the porpuse of this is just for the design
-- a service has several windows
data Service = Srv { srvid :: CString } deriving (Generic)
data Service2 = Srv2 { id2 :: CInt } deriving (Generic)

instance CStorable Service
instance CStorable Service2

instance Storable Service2 where
    sizeOf = cSizeOf
    alignment = cAlignment
    poke = cPoke
    peek = cPeek

instance Storable Service where
    sizeOf = cSizeOf
    alignment = cAlignment
    poke = cPoke
    peek = cPeek

services :: ListT IO Service
services = do 
            let mm s = lift (do
                                x <- newCAString s
                                return $ Srv x )
            x <- mapM mm ["Enel","Vodafone","And others"]
            ListT $ return x
