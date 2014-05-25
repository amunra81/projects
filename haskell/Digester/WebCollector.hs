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

data WebAction = Get Url |
                 Post Url [QueryParams] 
                 
data TreeAction a =  AddRoot Text |
                     AddChildren WebAction |
                     AddBrother WebAction   

-- mai uitat-te la projectToRoot

-- read here : http://johnlato.blogspot.ro/2012/10/runtime-meta-programming-in-haskell.html
