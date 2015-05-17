{-# LANGUAGE OverloadedStrings #-}
module Tools.Zebra where

import Control.Applicative
import qualified Data.ByteString.Lazy as BL
import Data.Csv
import qualified Data.Vector as V
import Data.List

data Sales = Sales 
            { startDate :: !String
            , serviceName :: !String
            , totalVandut :: !String
            , activeLocations :: !String
            , year :: !String
            , month :: !String
            , week :: !String
            , dayInMonth :: !String
            , hourInDay :: !String
            , isWeekend :: !String
            , isSalaryPeriod :: !String
            , isSalaryDay :: !String
            , dayInWeek :: !String
            , quarter :: !String
            , isHoliday :: !String
            , season :: !String
            }

instance FromNamedRecord Sales where
    parseNamedRecord r = Sales 
                            <$> r .: "StartDate"
                            <*> r .: "ServiceName"
                            <*> r .: "TotalVandut"
                            <*> r .: "ActiveLocations"
                            <*> r .: "Year"
                            <*> r .: "Month"
                            <*> r .: "Week"
                            <*> r .: "DayInMonth"
                            <*> r .: "HourInDay"
                            <*> r .: "IsWeekend"
                            <*> r .: "IsSalaryPeriod"
                            <*> r .: "IsSalaryDay"
                            <*> r .: "DayInWeek"
                            <*> r .: "Quarter"
                            <*> r .: "IsHoliday"
                            <*> r .: "Season"

printHeader :: Header -> IO ()
printHeader h = do
                let f acc str = acc ++ show str ++ " "
                let  ss = V.foldl f "" h
                putStrLn ss

printRows :: V.Vector Sales -> IO ()
printRows v = V.forM_ v $ \ p ->
                   putStrLn $ startDate p ++ " " ++ serviceName p ++ " " ++ totalVandut p

groupBy :: (Eq b) => ( a -> b ) -> [a] -> [(b,[a])]
groupBy f xs = foldl g [] xs 
             where g ys x = foldl ff [] ys
                          where ff acc (b,zs) = let a = f x
                                                in undefined
                        
parser :: FilePath -> IO ()
parser file = do
    csvData <- BL.readFile file
    case decodeByName csvData of
        Left err -> putStrLn err
        Right (h, v) -> printHeader h >> printRows v


