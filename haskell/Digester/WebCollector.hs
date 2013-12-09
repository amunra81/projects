module WebCollector () where
type NodePos = Integer
type ParentPos = Integer

data ExternAction = AddNode ParentPos NodePos |
                    Nothing
