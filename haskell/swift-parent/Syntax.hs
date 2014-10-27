module Syntax where

import Text.ParserCombinators.Parsec 
import qualified Text.ParserCombinators.Parsec.Token as P
import Text.ParserCombinators.Parsec.Language
import Control.Monad(liftM)
import Control.Applicative((<$>))

data Rule = Rule Category [Clause] deriving Show

type Clause = [ClauseItem]

data ClauseItem = Constant String
                | Cat Category 
                | Opt ClauseItem 
                | Range ClauseItem ClauseItem 
                deriving Show

data Category = Category String deriving Show

na :: a
na = undefined

-- TOKENIZER
lexer :: P.TokenParser ()
lexer = P.makeTokenParser
         (haskellDef
                {reservedNames   = ["opt"] 
                ,reservedOpNames = ["→","|"]
                ,commentStart    = "{-"
                ,commentEnd      = "-}"
                ,commentLine     = "--"
                ,identStart      = letter 
                ,identLetter     = letter <|> digit <|> char '-' 
                })

whiteSpace :: Parser ()
identifier,comma :: Parser String
lexeme :: Parser a -> Parser a
reservedOp,reserved :: String -> Parser ()
symbol :: String -> Parser String

whiteSpace  = P.whiteSpace lexer
lexeme      = P.lexeme lexer
identifier  = P.identifier lexer
reservedOp  = P.reservedOp lexer
reserved    = P.reserved lexer
comma       = P.comma lexer
symbol      = P.symbol lexer

{-PARSERS-}
rules :: Parser  [Rule]
rules = many1 $ many newline >> rule

-- rule parser
rule :: Parser Rule
rule = do
            cat <- category
            reservedOp "→"
            cls <- multipleClauses
            return $ Rule cat cls
        
-- | parser for clause
clause :: Parser Clause
clause = many1 clauseItem

-- | parser for multiple clauses
multipleClauses :: Parser [Clause]
multipleClauses = 
        sepBy clause (reservedOp "|")

-- | parser for Category
category :: Parser Category
category = do
            x <- identifier
            return $ Category x

-- | Parser for ClauseItems
clauseItem :: Parser ClauseItem
clauseItem =
        --constant
        constant <|>
        -- category
        (do cat <- category 
            -- option tries the parser (snd argument) if it
            -- fails returns the first argument as a praser
            -- value
            option (Cat cat) 
                (reserved "opt" >> (return . Opt . Cat) cat))

constant :: Parser ClauseItem
constant = choice $ try <$>
                     [range unicode
                     ,unicode
                     ,liftC $ symbol "`"
                     ,liftC comma
                     ,liftC (letterS >>= \s -> space >> return s)
                     ,range $ liftC letterS]
           where
                -- litfting a string parser to a constant parser 
                liftC = liftM Constant
                -- aplies lexeme to a letter parser and lifts it to Parser [Char]
                letterS = (:[]) <$> lexeme letter

unicode ::  Parser ClauseItem
unicode = lexeme $ do 
                    x <- symbol "U+" 
                    y <- many alphaNum
                    return $ Constant $ x ++ y

range :: Parser ClauseItem -> Parser ClauseItem
range p = do 
            a <- p
            _ <- string "-"
            b <- p
            return $ Range a b

{-RUN-}
runP :: Parser a -> String -> Either ParseError a
runP p = parse (lexeme (do 
                            whiteSpace 
                            x <- p 
                            eof
                            return x)) "name"
{-TESTS-}
eg1 ::  Either ParseError Rule
eg1 = runP rule "identifier-id → U+0300-U+400 U+030 identifier-head identifier-characters opt"

eg2 ::  Either ParseError Rule
eg2 = runP rule "identifier-list → identifier | ` identifier , identifier-list"

eg3 :: Either ParseError Rule
eg3 = runP rule "identifier-character → U+0300-U+400 U+030 U-"

eg4 :: Either ParseError Rule
eg4 = runP rule "identifier-head → a-z | A-Z"

eg5 :: Either ParseError [Rule]
eg5 = runP rules "identifier-head → a-z | A-Z\n identifier → identifier"
