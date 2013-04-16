import Network.CGI
import Text.XHtml
import Data.Time.Clock
import System.Time


getTime = getClockTime -- >>= (\(TOD sec _) -> return (TOD (sec + 86400) 0))


page :: String -> Html 
page time = body << h1 <<  text
            where text = "Hello World, time is "++ time ++" CGI!" 
 
cgiMain2 :: String -> CGI CGIResult
cgiMain2 time = output $ renderHtml $ page time
 
main :: IO ()
main = do 
        time <- getTime
        runCGI $ handleErrors $ cgiMain2 $ show time
