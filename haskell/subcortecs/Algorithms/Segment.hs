{-    Overview
    ========

    The Segment class implements a single segment on a cell. It contains a list
    of incoming synapses, a sequence segment flag, and meta information about
    segment activity and duty cycle.

    There are a number of metrics representing segment activity. These include
    the total activations, the number of positive activations, the last
    _iteration on which the segment became active, and the overall duty cycle.
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

    There are a list of duty cycle "tiers". These are _iteration counts at which
    different alpha values are used to update the duty cycle. This is necessary
    for implementing a fast moving average, while allowing high precision. It
    is important that the duty cycle tiers are identical between Python and
    CPP implementations.

    The member variable _nConnected holds the number of synapses that
    are actually connected (_permanence value >= connected threshold). -}

{-# LANGUAGE TemplateHaskell #-}
module Algorithms.Segment (
Segment(..) 
,InSynapse(..) 
,addSynapses ,connected 
,dutyCycle ,decaySynapses 
,isActive ,computeActivity 
,inSynapses ,frequency
,seqSegFlag ,iteration
,lastDutyCycle ,lastDutyCycleIteration
,positiveActivations ,totalActivations
,lastActiveIteration,permanence
,srcCellIdx) where 

import Data.List(sort)
import Data.Set(Set,toList)
import Algorithms.CState(CState(..),isSet)
import Control.Lens.TH(makeLenses)
import Control.Lens.Setter(over)

data InSynapse = InSynapse {  
                        _srcCellIdx :: Int,
                        _permanence :: Double } deriving Show 

instance Eq InSynapse where
        (==) a b = _srcCellIdx a == _srcCellIdx b 

instance Ord InSynapse where
       compare (InSynapse { _srcCellIdx = a }) (InSynapse { _srcCellIdx = b})
        = compare a b

data Segment = Segment 
             { _inSynapses :: [InSynapse]
             , _frequency :: Double -- unused in the last implementation
             , _seqSegFlag :: Bool
             , _iteration :: Int
             , _lastDutyCycle :: Double
             , _lastDutyCycleIteration :: Int
             , _positiveActivations :: Int       
             , _totalActivations :: Int
             , _lastActiveIteration :: Int
             }

makeLenses ''Segment
makeLenses ''InSynapse

dutyCycleAlphas :: [Double]
dutyCycleAlphas  = [0.0, 0.0032, 0.0010, 0.00032, 0.00010, 0.000032, 0.000010, 0.0000032, 0.0000010]

dutyCycleTiers :: [Int]
dutyCycleTiers = [0, 100, 320, 1000, 3200, 10000, 32000, 100000, 320000]

--TODO: se pare ca nConnected este calculat diferit in functie de diferite
--apeluri catre functii, vreau sa gasesc ceva transparent, nu imi place sa
--fie ascuns in spatele functiilor
-- ge all connected after a _permanence 
connected :: Double -> Segment -> Int
connected p = length . filter ((>= p) . _permanence) . _inSynapses

addSynapses :: Set InSynapse -> Segment -> Segment
addSynapses xs = over inSynapses f
                   where f  = sort . (++ toList xs)

decaySynapses :: Double -> Bool -> Segment -> Segment
decaySynapses decay doDecay  = over inSynapses g  
        where g =  map f . filter l 
              l = (>= decay) . _permanence
              f = over permanence h 
              h p = if doDecay 
                        then p - decay
                        else p

itod :: Int -> Double
itod = fromIntegral 

dutyCycle :: Int -> Bool -> Segment -> Segment
dutyCycle p active seg 

    | p > dutyCycleTiers !! 1 = segi { _lastDutyCycle = itod (_positiveActivations seg) / itod p }
    | age == 0 ,not active       = seg
    | active                  = segi { _lastDutyCycle = dtyCycl + alpha }
    | not active                = segi { _lastDutyCycle = dtyCycl }
    | otherwise               = seg 

    where segi = seg { _lastDutyCycleIteration = p }
          dtyCycl = ((1.0 - alpha) ^ age) * itod (_lastDutyCycleIteration seg)
          alpha = f $ reverse $ tail dutyCycleAlphas
          age = p - _lastDutyCycleIteration seg
          f []   = 0
          f (x:xs) = if itod p > x 
                            then x
                            else f xs 
          
isActive :: CState -> Double -> Int -> Segment -> Bool
isActive cs pc ths Segment { _inSynapses = xs } = 
        length bs >= ths --TODO: trebuie gasita a functie care nu trebuie sa parcurga tot arrayul 
        where 
              bs = filter f xs
              f a = _permanence a >= pc && isSet (_srcCellIdx a) cs

computeActivity :: CState -> Double -> Bool -> Segment -> Int
computeActivity  cs permCnt cntOnly Segment { _inSynapses = xs } = 
        length $ if cntOnly 
                    then filter f xs
                    else filter g xs
        where f a = g a && isSet (_srcCellIdx a) cs
              g a = _permanence a >= permCnt 

