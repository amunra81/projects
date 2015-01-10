{-
* A Cell is a container for Segments. It maintains a list of active segments and
* a list of segments that have been "inactivated" because all their synapses were
* removed. The slots of inactivated segments are re-used, in contrast to the
* Python TP, which keeps its segments in a dynamic list and always allocates new
* segments at the end of this dynamic list. This difference is a source of
* mismatches in unit testing when comparing the Python TP to the C++ down to the
* segment level.
-}

module Algorithms.Cell where

import Algorithms.Segment
import Data.Word(Word32)

data Cell = Cell 
            { segments :: [Segment] -- both 'active' and 'inactive' segments
            , freeSegments :: [Word32] } -- slots of the 'inactive' segments 
