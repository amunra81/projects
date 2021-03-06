module Engine.Output (Output) where

import Data.Set(Set)
import Engine.Link
import Engine.Array

data Output = Output { name :: String
                     , links :: Set Link
                     , isRegionLevel :: Bool -- TODO:habar nu am la ce foloseste
                     , payLoad :: Array -- in the Output.hpp is named data, but data in haskell is a reserved keyword
                     }
