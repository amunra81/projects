{- * Overview
 * ========
 *
 * The Cells4 class is the primary class implementing the C++ version of
 * the temporal pooler. It is designed to be fully accessible from Python.
 * A primary design goal is to maintain exact functional correspondence
 * with the implementation in TP.py.  Given the same inputs, and the same
 * random number seed, the learned segments should be identical in the
 * two implementations. The structure, and method/member
 * variable names also closely matches TP.py.  As such, much of the
 * detailed documentation for the various parameters and methods
 * can be found in the comments in TP.py.
 *
 * Implementation Notes
 * ====================
 *
 * The Cells4 class contains a vector of Cell's. Each Cell instance
 * contains a list of Segments. Each Segment contains Synapses.
 *
 * Cells4 also maintains additional data structures for optimization
 * purposes. The OutSynapses maintain forward propagation data about
 * which Cell's project to which Cell's and Segments.
 *
 * The Cells4 class is used extensively by Python code. Most of the
 * methods are wrapped automatically by SWIG. Some additional methods
 * are explicitly defined in algorithms_impl.i. The memory for
 * certain states, such as _infActiveStateT, can be initialized as
 * pointers to numpy array buffers, avoiding a copy step. -}

{-# LANGUAGE TemplateHaskell #-}
module Algorithms.Cells4(
                       ) where
import Data.Word(Word32)
import Control.Lens.TH(makeLenses)

               
data Cells4 = Cells4 {
              _nColumns :: Word32
            , _nCellsPerCol :: Word32
            , _activationThreshold :: Word32
            , _minThreshold :: Word32
            , _newSynapseCount :: Word32
            , _segUpdateValidDuration :: Word32
            , _permInitial :: Rational
            , _permConnected :: Rational
            , _permMax :: Rational
            , _permDec :: Rational
            , _permInc :: Rational
            , _globalDecay :: Rational
            , _doPooling :: Bool
            , _seed :: Integer
            , _doItAll :: Bool
            , _checkSynapseConsistency :: Bool }

makeLenses ''Cells4

