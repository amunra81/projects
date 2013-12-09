import Network.CGI
import Text.XHtml
 
import Control.Monad (liftM)
import Data.Maybe (fromMaybe)
 
hello :: Int -> Html
hello 0 = h1 << "Welcome!"
          +++ p << "This is the first time I see you."
hello c = h1 << "Welcome back!"
          +++ p << ("I have seen you " ++ show c ++ " times before.")
 
page :: String -> Html -> Html
page t b = header << thetitle << t +++ body << b
 
cgiMain :: CGI CGIResult
cgiMain = do c <- liftM (fromMaybe 0) $ readCookie "mycookie"
             setCookie (newCookie "mycookie" (show (c+1)))
             output . renderHtml . page "Cookie example" $ hello c
 
main :: IO ()
main = runCGI $ handleErrors cgiMain
