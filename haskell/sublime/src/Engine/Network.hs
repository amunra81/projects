module Network where
import Data.Set(Set)
import Data.Set(empty)
import Data.Word(Word)
import Types

data Network r = Network
             {
                filePath :: String,
                regions :: [r],
                minEnabledPhase :: Integer,
                maxEnabledPhase :: Integer,
                --This is main data structure used to choreograph
                --network computation
                phaseInfo :: [Set r],
                itaration :: Integer --TODO: change to long
             }
na = undefined
class RegionClass a where

commonInit :: String -> Network r
commonInit p = Network {
                         filePath = p,
                         regions = [],
                         minEnabledPhase = 0,
                         maxEnabledPhase = 0,
                         itaration = 0,
                         phaseInfo = [empty]
                       }

data Spec
data Link = Link { 
                    srcName :: String,
                    destName :: String,
                    linkType :: String,
                    linkParams :: String,
                    srcOutput :: String,
                    srcInput :: String 
                 }

data RegionBundle = RegionBundle { 
                             name :: String,
                             nodeType :: String,
                             dimensions :: [Dimensions],
                             bundlePath :: String,
                             label :: String }

-- THESE WILL BE TAKEN DIRECTLY FROM A REGION!
--setPhases :: r -> Network r -> Network r
--setPhases = na
--getPhases :: r -> Network r -> Network r
--getPhases = na

-- |add a region to a network
addRegion :: r -> Network r -> Network r
addRegion r n = n { regions = r : (regions n) }

-- |Removes an existing region from the network.
removeRegion :: String -> Network r
removeRegion = na

-- |Create a new region from saved state.
addRegionFromBundle :: RegionClass r => RegionBundle -> r
addRegionFromBundle = na 

-- |Save the network to a network bundle (extension `.nta`).
-- @param name Name of the bundle
save :: String -> Network r -> Bool
save = na

-- |Create a link and add it to the network.
link :: Link -> Network r -> Network r
link = na

-- |remove a link
removeLink :: Link -> Network r -> Network r
removeLink = na

getMinPhase :: Word
getMinPhase = na

getMaxPhase :: Word
getMaxPhase = na

run :: Integer -> Network r
run = na
