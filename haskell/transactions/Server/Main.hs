module Main where

import Happstack.Server (nullConf, simpleHTTP, toResponse, ok,askRq,notFound)

main :: IO ()
main = simpleHTTP nullConf $ do
        x <- askRq
        notFound $ unlines 
            [ "exports.foo = function() {"
            , "//Do stuff here"
            , " return 'Here';"
            , " }"
            ]
