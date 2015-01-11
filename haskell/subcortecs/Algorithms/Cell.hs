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

type Cell = [Segment] 

nSynapses ::  [Segment] -> Int
nSynapses = foldl (+) 0 . map (length . inSynapses)

updateDutyCycle :: Int -> Cell -> Cell
updateDutyCycle i = map (dutyCycle i False)
