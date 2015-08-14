{-# LANGUAGE TemplateHaskell #-}
{- Main.hs -}
module Main where
import Printf 


-- Import our template "pr"

-- The splice operator $ takes the Haskell source code
-- generated at compile time by "pr" and splices it into
-- the argument of "putStrLn".
main ::  IO ()
main = putStrLn ( $(pr "Hello") "This would be printed" )
