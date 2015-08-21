import Distribution.Simple
import System.Info(arch)
import System.Info(os)

main = 
        do
            print "Custom build"
            defaultMain
