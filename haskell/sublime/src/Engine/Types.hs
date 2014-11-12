module Types where

import Data.Map.Lazy(Map)

-- A collection is a templated class that contains items of type t.
 --It supports lookup by name and by index. The items are stored in a map
 --and copies are also stored in a vector (it's Ok to use pointers).
 --You can add items using the add() method.
 
type Collection a = Map String a -- nta/Collection.hpp
-- TODO: test what happends when add the same key

--Definitions for the ArrayBase class
 
-- An ArrayBase object contains a memory buffer that is used for 
-- implementing zero-copy and one-copy operations in NuPIC. 
-- An ArrayBase contains:
-- - a pointer to a buffer
-- - a length
-- - a type
-- - a flag indicating whether or not the object owns the buffer. 
--  An ArrayBase is used for passing arrays of data back and forth between 
-- a client application and NuPIC, minimizing copying. It facilitates
-- both zero-copy and one-copy operations.
data ArrayBase 

data Dimenssions
