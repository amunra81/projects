import Control.Monad(liftM)
import Text.ParserCombinators.Parsec hiding (spaces)
import System.Environment

symbol :: Parser Char
symbol = oneOf "!#$%&|*+-/:<=>?@^_~"

readExpr ::  String -> String
readExpr input = case parse parseExpr "lisp" input of
    Left err -> "No match: " ++ show err
    Right _ -> "Found value"

spaces :: Parser ()
spaces = skipMany space

data LispVal = Atom String
             | List [LispVal]
             | DottedList [LispVal] LispVal
             | Number Integer
             | String String
             | Bool Bool
             deriving Show

parseString :: Parser LispVal
parseString = do
                char '"'
                x <- many (noneOf "\"")
                char '"'
                return $ String x

runP :: Parser a -> String -> Either ParseError a
runP parser = parse parser "name"

-- SOME TESTS
runParseString :: String -> Either ParseError LispVal
runParseString = runP parseString 

runParseStringTest :: Either ParseError LispVal
runParseStringTest = runParseString "\"STRINGUL\""

-- parsing the atom
parseAtom :: Parser LispVal
parseAtom = do 
              first <- letter <|> symbol
              rest <- many (letter <|> digit <|> symbol)
              let atom = first:rest
              return $ case atom of 
                         "#t" -> Bool True
                         "#f" -> Bool False
                         _    -> Atom atom
-- SOME TESTS
parseAtomTestIdentifier :: Either ParseError LispVal
parseAtomTestIdentifier = runP parseAtom "_id"

parseAtomTestBoolean :: Either ParseError LispVal
parseAtomTestBoolean = runP parseAtom "#f"

-- parse a number
parseNumber :: Parser LispVal
parseNumber = liftM (Number . read) $ many1 digit

parseExpr :: Parser LispVal
parseExpr = parseAtom
         <|> parseString
         <|> parseNumber
         <|> parseQuoted
         <|> do 
                char '('
                x <- try parseList <|> parseDottedList
                char ')'
                return x
                    

--parse the list
parseList :: Parser LispVal
parseList = liftM List $ sepBy parseExpr spaces

parseDottedList :: Parser LispVal
parseDottedList = do
    head <- endBy parseExpr spaces
    tail <- char '.' >> spaces >> parseExpr
    return $ DottedList head tail

parseQuoted :: Parser LispVal
parseQuoted = do
    char '\''
    x <- parseExpr
    return $ List [Atom "quote", x]

-- SOME TESTS
runExprTestString = runP parseExpr "\"STRINGUL\""         
runExprTestStringFail = runP parseExpr "\"STRINGUL"
runExprTestNumber = runP parseExpr "23"
runExprTestAtom = runP parseExpr "#f"

main :: IO ()
main = do 
         args <- getArgs
         putStrLn $ show (runP parseExpr (args !! 0))
