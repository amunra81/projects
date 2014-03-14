import Control.Monad ((>=>))
import Data.ByteString (ByteString)
import System.IO (Handle)
import System.IO.Streams (InputStream, OutputStream)
import qualified System.IO.Streams as Streams
import qualified System.IO.Streams.File as Streams

unzipHandle :: Handle -> IO (InputStream ByteString)
unzipHandle = Streams.handleToInputStream >=> Streams.decompress


