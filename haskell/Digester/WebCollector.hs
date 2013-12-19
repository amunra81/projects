module WebCollector (
--ExternAction(..),
NodePos,ParentPos
) where
import Tree()
import Data.Text

type NodePos = Integer
type ParentPos = Integer
type Url = String
type QueryParams = (String,String)

<<<<<<< HEAD
data ExternAction  a =  AddRoot a |
                        AddNode ParentPos NodePos |
                        Nothing
=======
data WebAction = Get Url |
                 Post Url [QueryParams] 
                 
>>>>>>> 9dabd5097897172265ff755bf9b3a2bd5805406c

data TreeAction a =  AddRoot Text |
                     AddChildren WebAction |
                     AddBrother WebAction   

-- mai uitat-te la projectToRoot

-- read here : http://johnlato.blogspot.ro/2012/10/runtime-meta-programming-in-haskell.html
