module Algorithms.SpatialPooler
(SpatialPooler(..)) 
where
import Common.Core

data SpatialPooler = SpatialPooler { _inputDimensions :: [UInt]
                                   , _columnDimensions :: [UInt]
                                   , _potentialRadius :: UInt -- =16,
                                   , _potentialPct :: Real32 -- =0.5
                                   , _globalInhibition :: Bool -- =true,
                                   , _localAreaDensity :: Real32  -- =-1.0,
                                   , _numActiveColumnsPerInhArea :: UInt  -- =10,
                                   , _stimulusThreshold :: UInt -- =0,
                                   , _synPermInactiveDec :: Real32 -- =0.01,
                                   , _synPermActiveInc :: Real32 -- =0.1,
                                   , _synPermConnected :: Real32  -- =0.1,
                                   , _minPctOverlapDutyCycles :: Real32  -- =0.001,
                                   , _minPctActiveDutyCycles :: Real32 -- =0.001,
                                   , _dutyCyclePeriod :: Real32 -- =1000,
                                   , _maxBoost :: Real32 -- =10.0,
                                   , _seed :: Int  -- =1,
                                   , _spVerbosity :: UInt -- =0,
                                   , _wrapAround:: Bool -- = true
                                   }
