module SwiftSyntax where

-- getterclause -> ss | bb
data Rule m = Rule Category (m Clause) 

data Clause = EndClause |
              Constant Literal Clause |
              Cat Category Clause

data Literal = Str String | Opt

data Category = Clause String -- eg. getter-clause

--“The following characters are considered whitespace: space (U+0020), line feed (U+000A), carriage return (U+000D), horizontal tab (U+0009), vertical tab (U+000B), form feed (U+000C) and null (U+0000)”
--
--Excerpt From: Apple Inc. “The Swift Programming Language.” iBooks. https://itun.es/ro/jEUH0.l
