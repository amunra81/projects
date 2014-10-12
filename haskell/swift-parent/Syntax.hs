module Syntax where
import Text.ParserCombinators.Parsec hiding (spaces)

data Rule = Rule Category [Clause] deriving Show

data Clause = Constant Char | Cat Category | Opt Clause deriving Show

data Category = Category String deriving Show

spaces :: Parser ()
spaces = skipMany space

parseCategory :: Parser Category
parseCategory = do
                 spaces
                 x <- letter
                 xs <- many $ letter <|> char '-'
                 skipMany1 space
                 return $ Category (x:xs)
                
runP :: Parser a -> String -> Either ParseError a
runP parser = parse parser "name"



parseRule :: Parser Rule
parseRule = do
            left <- parseCategory
            char '→'
            return $ Rule left []

eg1 ::  Either ParseError Rule
eg1 = runP parseRule "identifier-id → identifier-head identifier-characters opt   "

