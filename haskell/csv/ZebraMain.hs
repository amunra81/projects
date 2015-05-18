import qualified Tools.Zebra as Z
import System.Environment(getArgs)

main :: IO ()

main = do 
        args <- getArgs 
        case args of
         [] -> putStrLn "No csv path provided"
         x:_ -> Z.parser x
