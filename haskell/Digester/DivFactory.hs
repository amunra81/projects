module DivFactory() where

import Tree
import Monad

let escalateToParent escalationLevel  initialDiv =
    seq {  1 .. escalationLevel } 
    |> Seq.fold ( fun nodeDiv _ -> nodeDiv ^> neutralDiv ) initialDiv


escalate :: Integer -> Div m a
escalate level div = 
    foldl f div [1..level]
    where f acc _ = acc ... parentOf
