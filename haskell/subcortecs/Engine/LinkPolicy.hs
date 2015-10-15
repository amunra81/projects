module Engine.LinkPolicy where

import Engine.Types
import Common.Core

class LinkPolicy p where
    setSrcDimensions :: Dimensions -> p -> p
    setDestDimensions :: Dimensions -> p -> p
    getSrcDimensions :: p -> Dimensions
    getDestDimensions :: p -> Dimensions
