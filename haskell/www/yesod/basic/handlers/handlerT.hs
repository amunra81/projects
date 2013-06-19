{-# LANGUAGE TypeFamilies, QuasiQuotes, MultiParamTypeClasses,
             TemplateHaskell, OverloadedStrings #-}

import Yesod
import Yesod.Core.Types
data App = App
    
{-
data HandlerData site parentRoute = HandlerData
    { handlerRequest  :: !YesodRequest
    , handlerEnv      :: !(RunHandlerEnv site)
    , handlerState    :: !(IORef GHState)
    , handlerToParent :: !(Route site -> parentRoute)
    , handlerResource :: !InternalState
    }
-}
getSomeR :: HandlerT App IO Html
getSomeR = HandlerT $  \ a -> error ""
