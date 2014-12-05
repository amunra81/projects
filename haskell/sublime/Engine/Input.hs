module Engine.Input where
import Engine.Link
import Engine.Array

type SplitterMap = [[Integer]]

data Input = Input { name :: String 
                   , isRegionLevel :: Bool
                   , links :: [Link]
                   , payLoad :: Array
                   , splitterMap :: SplitterMap
                   , linkOffsets :: [Integer] }
