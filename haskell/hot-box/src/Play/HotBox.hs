module Play.HotBox 
(tests)
where

import Data.HotBox
import Data.Aeson
import Test.QuickCheck.Test

test1 = encode [ Restaurant 1 Nothing [Table "Masa 1"]
               , Restaurant 2 (Just "Lupu") [Table "Masa 2"]
               ]

------------------------------------------------------------------------------
-- | The root definition of the tests. Must be of type 'IO [Test]'.


tests =  [ 
            do
                putStrLn "Test chior"
                quickCheck ((\i-> i == i)::Int->Bool) 
         ]
------------------------------------------------------------------------------
