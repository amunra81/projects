module Link where

data LinkDetails = LinkByName
                 { srcRegionName :: String
                 , destRegionName :: String
                 , srcOutputName :: String
                 , destInputName :: String
                 }
                 -- TODO: Referinta circulara la Link
                 {-| LinkByStream-}
                 {-{ src :: Input-}
                 {-, dest :: Output -}
                 {-}-}
data LinkPolicy  -- UNIMPLEMENTED:

data Link = Link 
            { linkType :: String
            , linkParams :: String
            , details :: LinkDetails
            -- private ::
            , linkPolicy :: LinkPolicy
            } 
                    
