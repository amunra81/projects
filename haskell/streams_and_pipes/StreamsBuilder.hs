module StreamsBuilder where
import Data.ByteString (ByteString)
import qualified Data.ByteString as S
import System.IO.Streams (InputStream)
import qualified System.IO.Streams as Streams
import System.IO (Handle, hFlush)

-- BUILDING STREAMS 
bUFSIZ = 32752
