{-# LANGUAGE TemplateHaskell #-}
module Math.SparseMatrix where
import Common.Core
--    typedef UI        size_type;       // unsigned integral for sizes
--    typedef I         difference_type; // signed integral for differences
--    typedef Real_stor value_type;      // floating-point storage type
--    typedef Real_prec prec_value_type; // floating-point precision type
--    dtz distanceToZero

data SparseMatrix rs = SparseMatrix 
                                { _nRows :: UInt32         -- number of rows
                                , _nRowsMax :: UInt32      -- max size of nnzr_, ind_ and nz_
                                , _nCols :: UInt32         -- number of columns
                                , _nNzr :: [UInt32]        -- number of non-zeros on each row
                                , _indMem :: [UInt32]      -- memory of indices when compact
                                , _nzMem :: [rs]       -- memory of values when compact
                                , _ind :: [[UInt32]]       -- indices of non-zeros on each row
                                , _nz :: [[rs]]        -- values of non-zeros on each row
                                , _indBuff :: [UInt32]     -- buffer for indices of non-zeros
                                , _nzBuff :: [Real32]      -- buffer for values of non-
                                }

defSparseMatix ::  SparseMatrix rs
defSparseMatix = SparseMatrix
                                { _nRows = minBound        -- number of rows
                                , _nRowsMax = minBound     -- max size of nnzr_, ind_ and nz_
                                , _nCols = minBound        -- number of columns
                                , _nNzr = []               -- number of non-zeros on each row
                                , _indMem = []             -- memory of indices when compact
                                , _nzMem = []              -- memory of values when compact
                                , _ind = [[]]              -- indices of non-zeros on each row
                                , _nz = [[]]               -- values of non-zeros on each row
                                , _indBuff = []            -- buffer for indices of non-zeros
                                , _nzBuff = []             -- buffer for values of non-
                                }
 
