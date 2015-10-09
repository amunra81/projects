module Engine.Input where
import Engine.Link
import Engine.Array
import Common.Core

type SplitterMap = [[Integer]]

data Input = Input { name :: String 
                   , isRegionLevel :: Bool
                   , links :: [Link]
                   , payLoad :: Array
                   , splitterMap :: SplitterMap
                   , linkOffsets :: [Integer] }


