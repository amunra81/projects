module Input where
import Link
import Array

type SplitterMap = [[Integer]]

data Input = Input { name :: String 
                   , isRegionLevel :: Bool
                   , links :: [Link]
                   , payLoad :: Array
                   , splitterMap :: SplitterMap
                   , linkOffsets :: [Integer]
                   }
