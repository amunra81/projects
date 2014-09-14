import Text.ParserCombinators.Parsec
import qualified Text.ParserCombinators.Parsec.Token as P
import Text.ParserCombinators.Parsec.Language

oneLetter :: Parser Char
oneLetter = letter

run parser s = let parsed =  parse parser "" s 
               in case (parsed) of
                  Left error -> print error
                  Right ret -> print ret

openClose :: Parser Char
openClose = do{ char '('
              ; char ')' 
              }

-- GHCi run openClose "()"
parens2  :: Parser ()
parens2  = do  
              char '('
              parens2
              char ')'
              parens2
          <|> return ()

-- GHCi run parens2 "(())()"
