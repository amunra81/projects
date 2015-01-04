{-    Overview
    ========

    The Segment class implements a single segment on a cell. It contains a list
    of incoming synapses, a sequence segment flag, and meta information about
    segment activity and duty cycle.

    There are a number of metrics representing segment activity. These include
    the total activations, the number of positive activations, the last
    iteration on which the segment became active, and the overall duty cycle.
    These metrics are used to calculate confidence levels of temporal pooler
    predictions. They are also used in fixed resource CLA and online learning to
    determine which segments and synapses to discard when the cell or segment
    reaches capacity.

    There is a reasonable correspondence to the Python Segment class and most
    of the methods here are accessible from Python.

    Implementation Notes
    ====================

    It is valid to have an empty segment. Empty segments are used in the Cell
    class to avoid always shuffling the list of segments whenever a segment is
    deleted.

    A Segment stores synapses in an STL vector of InSynapses. Synapses are
    unique on the segment, and they are kept in order of increasing source cell
    index for speed of certain operations.

    There are a list of duty cycle "tiers". These are iteration counts at which
    different alpha values are used to update the duty cycle. This is necessary
    for implementing a fast moving average, while allowing high precision. It
    is important that the duty cycle tiers are identical between Python and
    CPP implementations.

    The member variable _nConnected holds the number of synapses that
    are actually connected (permanence value >= connected threshold). -}

module Algorithms.Segment (
Segment(..),
InSynapse(..),
addSynapses,
connected) where 

import Data.Word(Word32)
import Data.List(sort)

data InSynapse = InSynapse {  _srcCellIdx :: Word32,
                                _permanence :: Rational } deriving Show 

instance Eq InSynapse where
        (==) a b = _srcCellIdx a == _srcCellIdx b 

instance Ord InSynapse where
       compare (InSynapse { _srcCellIdx = a }) (InSynapse { _srcCellIdx = b})
        = compare a b

data Segment = Segment 
             { inSynapses :: [InSynapse]
             , frequency :: Rational -- unused in the last implementation
             , seqSegFlag :: Bool
             , iteration :: Word32 
             }

-- ge all connected after a permanence 
connected :: Rational -> Segment -> Int
connected p = length . filter ((>= p) . _permanence) . inSynapses

addSynapses :: [InSynapse] -> Segment -> Segment
addSynapses xs s = s { inSynapses = ys }
                 where ys = sort $ inSynapses s ++ xs

decaySynapses :: Rational -> Bool -> Segment -> Segment
decaySynapses decay doDecay s 
        = s { inSynapses = ys }
        where ys = foldl f [] (inSynapses s)
              f acc x = if _permanence x >= decay 
                            then acc ++ [if doDecay 
                                            then x { _permanence = (_permanence x) - decay}
                                            else x]
                            else acc

--TODO: se pare ca nConnected este calculat diferit in functie de iferite
--apeluri catre functii, vreau sa gasesc ceva transparent, nu imi place sa
--fie ascuns in spatele functiilor
