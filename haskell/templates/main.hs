{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell #-}
import FastN

main ::  IO ()
main = print $ $(fstN 3) ((1,2,3) :: (Int,Int,Int))
