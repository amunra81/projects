module WebCollector (
ExternAction(..),
NodePos,ParentPos
) where

type NodePos = Integer
type ParentPos = Integer

data ExternAction  a =  AddRoot a |
                        AddNode ParentPos NodePos |
                        Nothing


-- read here : http://johnlato.blogspot.ro/2012/10/runtime-meta-programming-in-haskell.html
