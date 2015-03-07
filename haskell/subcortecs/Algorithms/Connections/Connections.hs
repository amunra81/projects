module Algorithms.Connections.Connections where
import Algorithms.Common 
import Data.Map.Strict(Map)

type CellIdx = UInt32 

type SegmentIdx = UChar

type SynapseIdx = UChar

type Permanence = Real32 

type Iteration = UInt64 

data Cell = Cell { _cellIdx :: Cell }

data Segment = Segment { _segmentIdx :: SegmentIdx
                       , _cell :: Cell
                       }

data Synapse = Synapse { _synapseIdx :: SynapseIdx
                       , _segment :: Segment
                       }

data SynapseData = SynapseData { _presynapticCell :: Cell 
                               , _permanence :: Permanence
                               , _synDestroyed :: Bool 
                               }

data SegmentData = SegmentData { _synapses :: [SynapseData]
                               , _segDestroyed :: Bool
                               , _lastUsedIteration :: Iteration
                               }

data CellData = CellData { _segments :: [SegmentData] }

data Activity = Activity { _activeSegmentsForCell :: Map Cell [Segment] 
                         }

