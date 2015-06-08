{-# LANGUAGE MagicHash #-}
{-# LANGUAGE DeriveGeneric #-}
 
module Data.Gen where

import GHC.Generics (Generic)
import Foreign.CStorable
import Foreign.Storable
import GHC.Prim()
import Prelude
data MyStruct = MyStruct { a :: Double } deriving (Generic)

instance CStorable MyStruct

instance Storable MyStruct where
    sizeOf = cSizeOf
    alignment = cAlignment
    poke = cPoke
    peek = cPeek
