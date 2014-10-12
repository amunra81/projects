module Syntax where
import Text.ParserCombinators.Parsec 
import qualified Text.ParserCombinators.Parsec.Token as P
import Text.ParserCombinators.Parsec.Language
import Control.Monad(liftM)

data Rule = Rule Category [Clause] deriving Show

type Clause = [ClauseItem]

data ClauseItem = Constant String | Cat Category | Opt ClauseItem deriving Show

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

whiteSpace  = P.whiteSpace lexer
lexeme      = P.lexeme lexer
identifier  = P.identifier lexer
reservedOp  = P.reservedOp lexer
reserved    = P.reserved lexer
comma       = P.comma lexer
symbol      = P.symbol lexer
graveAcc    = symbol "`"

-- PARSERS
rule :: Parser Rule
rule = do
            cat <- category
            reservedOp "→"
            cls <- multipleClauses
            return $ Rule cat cls
        
clause :: Parser Clause
clause = many1 clauseItem

multipleClauses :: Parser [Clause]
multipleClauses = sepBy clause (reservedOp "|")

category :: Parser Category
category = do
                 x <- identifier
                 return $ Category x


clauseItem :: Parser ClauseItem
clauseItem = choice [ -- category
                      do 
                        cat <- category 
                        option (Cat cat) 
                            (reserved "opt" >> (return . Opt . Cat) cat)
                      -- comma
                      ,constant]

constant :: Parser ClauseItem
constant =  do
               whiteSpace
               str <- many (letter <|> digit <|>  '-' <|> char '+')
               whiteSpace
               return $ Constant str

runP :: Parser a -> String -> Either ParseError a
runP p = parse (lexeme (do 
                            whiteSpace 
                            x <- p 
                            eof
                            return x)) "name"

{-TESTS-}
eg1 ::  Either ParseError Rule
eg1 = runP rule "{-COMMENT !@#$#@$-} identifier-id → identifier-head identifier-characters opt"

eg2 ::  Either ParseError Rule
eg2 = runP rule "identifier-list → identifier | ` identifier , identifier-list"

eg3 ::  Either ParseError Rule
eg3 = runP rule "identifier-character → U+0300"




