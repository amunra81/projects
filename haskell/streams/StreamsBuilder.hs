module StreamsBuilder where
import Data.ByteString (ByteString)
import qualified Data.ByteString as S
import System.IO.Streams (InputStream,OutputStream)
import qualified System.IO.Streams as Streams
import System.IO (Handle, hFlush)
import Data.ByteString.Char8(putStrLn)
import Prelude hiding (putStrLn)
import System.IO (IOMode(WriteMode))

-- BUILDING STREAMS 
bUFSIZ = 32752

upgradeReadOnlyHandle :: Handle -> IO (InputStream ByteString)
upgradeReadOnlyHandle h = Streams.makeInputStream f
  where
    f = do
        x <- S.hGetSome h bUFSIZ
        return $! if S.null x then Nothing else Just x

writeConsole :: IO (OutputStream ByteString)
writeConsole = Streams.makeOutputStream $ \m -> case m of
    Just bs -> putStrLn bs
    Nothing -> return ()

main ::  IO ()
main = Streams.withFileAsOutput "out.txt" $ \out ->
        Streams.withFileAsInput  "StreamsBuilder.hs" $ \input ->
        Streams.connect input out

        
