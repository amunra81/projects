module Syntax2 where
import Text.ParserCombinators.Parsec 
import qualified Text.ParserCombinators.Parsec.Token as P
import Text.ParserCombinators.Parsec.Language
import Control.Applicative((<$>))
import Text.Parsec.Error(messageString,errorMessages)

data Rule = Rule Category [Clause] deriving Show

type Clause = [ClauseItem]

data ClauseItem = Constant String
                | Cat String
                | Unicode String
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
                ,reservedOpNames = ["→","|",";"] 
                ,commentStart    = "{-"
                ,commentEnd      = "-}"
                ,commentLine     = "--"
                ,identStart      = letter <|> digit
                ,identLetter     = letter <|> digit <|> char '-' <|> char '+'
                })

constantChars ::  [String]
constantChars = [",","`"]

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
rules = sepBy rule (reservedOp ";")

-- rule parser
rule :: Parser Rule
rule = do
            cat <- category
            reservedOp "→"
            cls <- multipleClauses
            return $ Rule cat cls
        
-- | parser for Category
category :: Parser Category
category = do
        x <- identifier
        return $ Category x

-- | parser for multiple clauses
multipleClauses :: Parser [Clause]
multipleClauses = 
        sepBy clause (reservedOp "|")

-- | parser for clause
clause :: Parser Clause
clause = many clauseItem 

-- | Parser for ClauseItems
clauseItem :: Parser ClauseItem
clauseItem =
            -- identifier
            do 
                x <- identifier
                case x of
                    [a,'-',b]  -> return $ Range (Constant $ show a) (Constant $ show b)
                    [_]        -> return $ Constant x
                    'U':'+':_  -> case parseUnicode x of
                                        Left err -> (unexpected 
                                                    . messageString 
                                                    . head 
                                                    . errorMessages) err
                                        Right cl -> return cl
                    _           -> return $ Cat x
            <|> 
                Constant <$> (choice $ map symbol constantChars)

parseUnicode :: String -> Either ParseError ClauseItem
parseUnicode =  parse p "unicode"
                where 
                      unicode = Unicode <$> (string "U+" >> many alphaNum)
                      p = 
                          (try $ do
                            a <- unicode
                            _ <- string "-"
                            b <- unicode
                            return $ Range a b)
                           <|> unicode

--create a parser which spleets the line
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
eg5 = runP rules "identifier-head → a-z A-Z; asdas → asdad"

eg6 :: Either ParseError Clause
eg6 = runP clause "idsd-sds a U+2-U+34"

eg7 :: Either ParseError Clause
eg7 = runP clause "idsd-sds a-z U+234 U+234-U+232"
