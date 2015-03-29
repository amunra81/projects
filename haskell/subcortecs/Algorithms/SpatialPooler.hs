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

defSP =    SpatialPooler { _inputDimensions               = []
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

d :: Monad m => StateT SpatialPooler m [Int]
d = do 
     mview inputDimensions
