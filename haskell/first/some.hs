module Main where

import System.Environment
import Prelude
import Data.Monoid
import Control.Applicative
import Control.Monad
import System.Random

-- {{{ simple tests
testP pf = do print $ pf [3,7..] [1..10]
              print $ pf [3,7,11,15] [1..]
              print $ head $ last $ pf [3,3..] [1..10^6]

test takeList n = takeList (take n [1..]) [1..]
arr = [x | x <- [1..100] ]


main = do 
	(n:_) <- getArgs
	print n
