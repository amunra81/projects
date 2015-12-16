module Play.HotBox 
(tests)
where

import Data.HotBox
import Data.Aeson
import Test.QuickCheck.Test

test1 = encode [ Restaurant (RestId 1) "" [Table (TableId 1) "Masa 1" Nothing] []
               , Restaurant (RestId 2) "Lupu" [Table  (TableId 2) "Masa 2" Nothing] []
               ]

------------------------------------------------------------------------------
-- | The root definition of the tests. Must be of type 'IO [Test]'.

tests =  [ 
            do
                putStrLn "Test chior"
                quickCheck ((\i-> i == i)::Int->Bool)
            ,
            do
                putStrLn "Test chior2"
                quickCheck ((\i-> i == i)::Int->Bool)
         ]
------------------------------------------------------------------------------
