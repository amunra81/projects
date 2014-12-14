module Engine.LinkPolicy where 

import Engine.Types

class LinkPolicy p where
    setSrcDimensions :: Dimensions -> p -> p
    setDestDimensions :: Dimensions -> p -> p
    getSrcDimensions :: p -> Dimensions 
    getDestDimensions :: p -> Dimensions
