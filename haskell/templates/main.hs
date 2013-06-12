{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell #-}
import FastN

main = print $ $(fstN 3) (1,2,3)
