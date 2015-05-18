{-# LANGUAGE OverloadedStrings #-}
module Tools.Zebra where

import Control.Applicative
import qualified Data.ByteString.Lazy as BL
import Data.Csv
import qualified Data.Vector as V
import Data.Monoid(mappend)
--import Data.List

na :: a
na = undefined

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
instance ToNamedRecord Sales where
    toNamedRecord sl = namedRecord [ "StartDate" .= startDate sl
                            , "ServiceName" .= serviceName sl
                            , "TotalVandut" .= totalVandut sl
                            , "ActiveLocations" .= activeLocations sl
                            , "Year" .= year sl
                            , "Month" .= month sl
                            , "Week" .= week sl
                            , "DayInMonth" .= dayInMonth sl
                            , "HourInDay" .= hourInDay sl
                            , "IsWeekend" .= isWeekend sl
                            , "IsSalaryPeriod" .= isSalaryPeriod sl
                            , "IsSalaryDay" .= isSalaryDay sl
                            , "DayInWeek" .= dayInWeek sl
                            , "Quarter" .= quarter sl
                            , "IsHoliday" .= isHoliday sl
                            , "Season" .= season sl ]

printHeader :: Header -> IO ()
printHeader h = do
                let f acc str = acc ++ show str ++ " "
                let  ss = V.foldl f "" h
                putStrLn ss

printRows :: V.Vector Sales -> IO ()
printRows v = V.forM_ v $ \ p ->
                   putStrLn $ startDate p ++ " " ++ serviceName p ++ " " ++ totalVandut p

class GroupBy t where
    grpBy :: Eq b => (a -> b) -> t a -> t (b,t a) 

single :: a -> V.Vector a
single a = return a

instance GroupBy V.Vector where 
    grpBy f xs = V.foldl g V.empty xs
            where g acc x = 
                    let (ys,ws) = V.break ff acc
                        b = f x
                        ff (a,_) = b == a
                        ret v1 v2 
                          | V.null v1 && V.null v2 = single (b,single x)
                          | V.null v2 = mappend v1 $ ret V.empty V.empty
                          | otherwise = 
                                        let (z,zz) = V.head v2
                                            (zs) = V.tail v2
                                            v3 = mappend (single (z,mappend zz $ single x)) zs
                                        in mappend v1 v3
                     in ret ys ws

instance GroupBy [] where 
    grpBy f xs = foldl g [] xs 
            where g acc x = 
                    let ys = break ff acc
                        b = f x
                        ff (a,_) = b == a
                    in case ys of
                    ([],[]) -> [(b,[x])]
                    (ws,[]) -> ws ++ [(b,[x])] 
                    (ws,(z,zz):zs) -> ws ++ ((z,zz++[x]):zs) 

test1 :: [(String,[(String,Int)])]
test1 = 
        let xs = [("1",1),("2",2),("1",11),("3",21312321)]
            f (a,_) = a
        in grpBy f xs

test2 :: V.Vector (String,V.Vector (String,Int))
test2 = 
        let xs = [("1",1),("2",2),("1",11),("3",21312321)]
            f (a,_) = a
        in grpBy f (V.fromList xs)

parser :: FilePath -> IO ()
parser file = do
    csvData <- BL.readFile file
    case decodeByName csvData of
        Left err -> putStrLn err
        Right (h, v) -> do 
            let grouped = grpBy serviceName v
            V.forM_ grouped (\ (s,v1) -> toFile (s++".csv") h v1) 

instance ToRecord Sales where
    toRecord sales = 
        let xs =  [ startDate , serviceName  , totalVandut , activeLocations , year , month , week , 
                    dayInMonth , hourInDay , isWeekend , isSalaryPeriod , isSalaryDay , dayInWeek , 
                    quarter , isHoliday , season ]  
            fx = [ toField $ x sales | x <- xs]
        in record fx

toFile ::  FilePath -> Header -> V.Vector Sales -> IO ()
toFile file h vec = 
        let bs = encodeByName h (V.toList vec)
        in BL.writeFile file bs >> putStrLn (file++" was writend to disk")
