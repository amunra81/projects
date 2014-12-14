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

module Algorithms.Segment where

import Data.Word(Word32)
import Data.List(sort)

data InSynapses = InSynapses {  _srcCellIdx :: Word32,
                                _permanence :: Rational } deriving Show


data Segment = Segment 
             { inSynapses :: InSynapse
             , frequency :: Rational -- unused in the last implementation
             , seqSegFlag :: Bool
             , permConnected :: Rational
             , iteration :: Word32 }

 inline bool checkConnected(Real permConnected) const {
          //
          UInt nc = 0;
          for (UInt i = 0; i != _synapses.size(); ++i)
            nc += (_synapses[i].permanence() >= permConnected);

          if (nc != _nConnected) {
            std::cout << "\nConnected stats inconsistent. _nConnected="
                      << _nConnected << ", computed nc=" << nc << std::endl;
          }

          return nc == _nConnected;
        }

checkConnected :: Rational -> Segment -> Boolean
checkConnected = undefined 
