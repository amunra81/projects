module Receipt where
import Text.ParserCombinators.Parsec
import qualified Text.ParserCombinators.Parsec.Token as P
import Text.ParserCombinators.Parsec.Language
import Data.Char

-- receipt     ::= product* total
-- produkt     ::= "return" price ";" | identifier price ";"
-- total       ::= price "total"
-- price       ::= digit+ "." digit digit

-- run a simple parser 
run parser s = let parsed =  parse parser "" s 
               in case (parsed) of
                  Left error -> print error
                  Right ret -> print ret

-- run a parser eliminating the whitespaces from the begining
-- of the string
runLex :: Show a => Parser a -> String -> IO ()
runLex p input
        = run (do{ whiteSpace
                 ; x <- p
                 ; eof
                 ; return x
                 }) input

-- create a token parser
lexer :: P.TokenParser ()
lexer  = P.makeTokenParser
         (haskellDef
                {reservedNames   = ["return","total"] 
                ,reservedOpNames = ["*","/","+","-"] } )
        
whiteSpace = P.whiteSpace lexer
lexeme     = P.lexeme lexer
symbol     = P.symbol lexer
natural    = P.natural lexer
parens     = P.parens lexer
semi       = P.semi lexer
identifier = P.identifier lexer
reserved   = P.reserved lexer
reservedOp = P.reservedOp lexer


-- main receipt parser
receipt :: Parser Bool
receipt = do { ps <- many produkt
             ; t  <- total
             ; return (sum ps == t) }  

-- parser for total entry
total :: Parser Int
total = do { p <- price ; reserved "total"
           ; return p }
        <?> "total"

-- parser for produkt
produkt :: Parser Int
produkt = do { reserved "return" ; p <- price ; semi 
             ; return (-p) }
      <|> do { identifier      ; p <- price ; semi 
             ; return p }
      <?> "produkt"

-- parser for the price value
price :: Parser Int   -- price in cents
price   = lexeme (do { ds1 <- many1 digit
                     ; char '.'
                     ; ds2 <- count 2 digit
                     ; return (convert 0 (ds1 ++ ds2))
                     })
          <?> "price"
          where
          convert n [] = n
          convert n (d:ds) = convert (10*n + digitToInt d) ds

-- GHCi runLex receipt "book 12.00; returns 2.00; plant 1.00; 15.00 total"
-- True
-- GHCi runLex receipt "book 12.00; total 2.00; plant 1.00; 15.00 total"
-- parse error at (line 1, column 13):
-- unexpected reserved word "total"
-- expecting produkt or price
-- GHCi runLex receipt "book 12.00; totals 2.00; return 1.00; 13.00 total"
-- True
