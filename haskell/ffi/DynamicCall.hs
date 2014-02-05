import System.Posix.DynamicLinker
import Foreign.C
import Foreign.Ptr
import Foreign.LibFFI
 
sin2 :: Double -> IO Double
sin2 d = do
    sin <- dlsym Default "sin"
    ret <- callFFI sin retCDouble [argCDouble (realToFrac d)]
    return $ realToFrac ret
