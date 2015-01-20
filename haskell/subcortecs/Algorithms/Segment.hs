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
Segment(..) 
,InSynapse(..) 
,addSynapses 
,connected 
,dutyCycle 
,decaySynapses 
,isActive
,computeActivity
) where 

import Data.List(sort)
import Data.Set(Set)
import Data.Set(toList)
import Algorithms.CState(CState(..),isSet)

data InSynapse = InSynapse {  srcCellIdx :: Int,
                                permanence :: Double } deriving Show 

instance Eq InSynapse where
        (==) a b = srcCellIdx a == srcCellIdx b 

instance Ord InSynapse where
       compare (InSynapse { srcCellIdx = a }) (InSynapse { srcCellIdx = b})
        = compare a b

data Segment = Segment 
             { inSynapses :: [InSynapse]
             , frequency :: Double -- unused in the last implementation
             , seqSegFlag :: Bool
             , iteration :: Int
             , lastDutyCycle :: Double
             , lastDutyCycleIteration :: Int
             , positiveActivations :: Int       
             , totalActivations :: Int
             , lastActiveIteration :: Int
             }

dutyCycleAlphas :: [Double]
dutyCycleAlphas  = [0.0, 0.0032, 0.0010, 0.00032, 0.00010, 0.000032, 0.000010, 0.0000032, 0.0000010]

dutyCycleTiers :: [Int]
dutyCycleTiers = [0, 100, 320, 1000, 3200, 10000, 32000, 100000, 320000]

--TODO: se pare ca nConnected este calculat diferit in functie de diferite
--apeluri catre functii, vreau sa gasesc ceva transparent, nu imi place sa
--fie ascuns in spatele functiilor
-- ge all connected after a permanence 
connected :: Double -> Segment -> Int
connected p = length . filter ((>= p) . permanence) . inSynapses

addSynapses :: Set InSynapse -> Segment -> Segment
addSynapses xs s = s { inSynapses = ys }
                 where ys = sort $ inSynapses s ++ (toList xs)

decaySynapses :: Double -> Bool -> Segment -> Segment
decaySynapses decay doDecay s 
        = s { inSynapses = ys }
        where ys = foldl f [] (inSynapses s)
              f acc x = if permanence x >= decay 
                            then acc ++ [if doDecay 
                                            then x { permanence = (permanence x) - decay}
                                            else x]
                            else acc

itod :: Int -> Double
itod = fromIntegral 

dutyCycle :: Int -> Bool -> Segment -> Segment
dutyCycle p active seg 

    | p > dutyCycleTiers !! 1 = segi { lastDutyCycle = (itod $ positiveActivations seg) / (itod p) }
    | age == 0 ,not active      = seg
    | active                  = segi { lastDutyCycle = dtyCycl + alpha }
    | not active                = segi { lastDutyCycle = dtyCycl }
    | otherwise               = seg 

    where segi = seg { lastDutyCycleIteration = p }
          dtyCycl = ((1.0 - alpha) ^ age) * (itod $ lastDutyCycleIteration seg)
          alpha = f $ reverse $ tail dutyCycleAlphas
          age = p - (lastDutyCycleIteration seg)
          f []   = 0
          f (x:xs) = if itod p > x 
                            then x
                            else f xs 
          
isActive :: CState -> Double -> Int -> Segment -> Bool
isActive cs pc ths Segment { inSynapses = xs } = 
        length bs >= ths --TODO: trebuie gasita a functie care nu trebuie sa parcurga tot arrayul 
        where 
              bs = filter f xs
              f a = permanence a >= pc && isSet (srcCellIdx a) cs

computeActivity :: CState -> Double -> Bool -> Segment -> Int
computeActivity  cs permCnt cntOnly Segment { inSynapses = xs } = 
        length $ if (cntOnly) 
                    then filter f xs
                    else filter g xs
        where f a = g a && isSet (srcCellIdx a) cs
              g a = permanence a >= permCnt 

