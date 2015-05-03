{-# LANGUAGE TemplateHaskell #-}
module Algorithms.SpatialPooler
(SpatialPooler(..) ,inputDimensions 
,columnDimensions          
,potentialRadius           
,potentialPct              
,globalInhibition          
,localAreaDensity          
,numActiveColumnsPerInhArea
,synPermInactiveDec        
,synPermActiveInc          
,stimulusThreshold         
,synPermConnected          
,minPctOverlapDutyCycles   
,minPctActiveDutyCycles    
,dutyCyclePeriod           
,maxBoost                  
,seed                      
,spVerbosity               
,wrapAround)
where

import Common.Core
import Control.Lens
import Control.Monad.Trans.State.Strict
import Math.SparseMatrix
import Math.SparseBinaryMatrix

data SpatialPooler = SpatialPooler { _inputDimensions               :: [UInt]
                                   , _columnDimensions              :: [UInt]
                                   , _potentialRadius               :: UInt -- =16,
                                   , _potentialPct                  :: Real32 -- =0.5
                                   , _globalInhibition              :: Bool -- =true,
                                   , _localAreaDensity              :: Real32  -- =-1.0,
                                   , _numActiveColumnsPerInhArea    :: UInt  -- =10,
                                   , _stimulusThreshold             :: UInt -- =0,
                                   , _synPermInactiveDec            :: Real32 -- =0.01,
                                   , _synPermActiveInc              :: Real32 -- =0.1,
                                   , _synPermConnected              :: Real32  -- =0.1,
                                   , _minPctOverlapDutyCycles       :: Real32  -- =0.001,
                                   , _minPctActiveDutyCycles        :: Real32 -- =0.001,
                                   , _dutyCyclePeriod               :: Real32 -- =1000,
                                   , _maxBoost                      :: Real32 -- =10.0,
                                   , _seed                          :: Int  -- =1,
                                   , _spVerbosity                   :: UInt -- =0,
                                   , _wrapAround                    :: Bool -- = true
                                   } deriving Show

makeLenses ''SpatialPooler

defSP ::  SpatialPooler
defSP =  SpatialPooler { _inputDimensions                 = []
                         , _columnDimensions              = []
                         , _potentialRadius               = 16
                         , _potentialPct                  = 0.5
                         , _globalInhibition              = True
                         , _localAreaDensity              = 1.0
                         , _numActiveColumnsPerInhArea    = 10
                         , _stimulusThreshold             = 0
                         , _synPermInactiveDec            = 0.01
                         , _synPermActiveInc              = 0.1
                         , _synPermConnected              = 0.1
                         , _minPctOverlapDutyCycles       = 0.001
                         , _minPctActiveDutyCycles        = 0.001
                         , _dutyCyclePeriod               = 1000
                         , _maxBoost                      = 10.0
                         , _seed                          = 1
                         , _spVerbosity                   = 0
                         , _wrapAround                    = True
                         }

mview ::  Monad m => Getting a l a -> StateT l m a
mview l = get >>= (\s -> return $ view l s)

defPotentialRadius :: StateT SpatialPooler IO Int
defPotentialRadius = do
                        s <- get
                        return 1

d :: Monad m => StateT SpatialPooler m [UInt]
d = do 
     mview inputDimensions

data SPData = SPData {    _numInputs :: UInt 
                        , _numColumns :: UInt  
                        , _initConnectedPct :: Real32  
                        , _inhibitionRadius :: UInt  
                        , _iterationNum :: UInt  
                        , _iterationLearnNum :: UInt  
                        , _updatePeriod :: UInt  
                        , _synPermMin :: Real32  
                        , _synPermMax :: Real32  
                        , _synPermTrimThreshold :: Real32  
                        , _synPermBelowStimulusInc :: Real32  
                        , _boostFactors :: [Real32]  
                        , _overlapDutyCycles :: [Real32]  
                        , _activeDutyCycles :: [Real32]  
                        , _minOverlapDutyCycles :: [Real32]  
                        , _minActiveDutyCycles :: [Real32]  
                        , _permanences :: SparseMatrix Real32  
                        , _potentialPools :: SparseBinaryMatrix UInt  
                        , _connectedSynapses :: SparseBinaryMatrix UInt  
                        , _connectedCounts :: [UInt]  
                        , _overlaps :: [UInt]  
                        , _overlapsPct :: [Real32]  
                        , _boostedOverlaps :: [Real32]  
                        , _activeColumns :: [UInt]  
                        , _tieBreaker :: [Real32]  
                        , _version :: UInt 
                        , _rng :: Random
                        , _sp :: SpatialPooler
                      }

