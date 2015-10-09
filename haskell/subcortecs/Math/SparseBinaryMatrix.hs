module Math.SparseBinaryMatrix (SparseBinaryMatrix(..)) where

import Common.Core

data SparseBinaryMatrix i = SparseBinaryMatrix {
                            _ncols :: UInt32
                            ,_ind :: [[i]]
                           }
