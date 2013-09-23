{-# LANGUAGE TypeFamilies #-}
import Data.IntMap
import Prelude hiding (lookup) 

-- | Class definition for a Map
class GMapKey k where
  data GMap k :: * -> * 
  empty       :: GMap k v
  lookup      :: k -> GMap k v -> Maybe v
  insert      :: k -> v -> GMap k v -> GMap k v

-- | GMapKey Int 
instance GMapKey Int where
  data GMap Int v           = GMapInt (Data.IntMap.IntMap v) deriving Show
  empty                     = GMapInt Data.IntMap.empty
  lookup k (GMapInt m)      = Data.IntMap.lookup k m
  insert k v (GMapInt gm)   = GMapInt (Data.IntMap.insert k v gm)
  
-- | GMapKey Char
instance GMapKey Char where
    data GMap Char v             = GMapChar (Char,v) (GMap Char v) | NIL deriving Show
    empty                        = NIL
    insert k v gm                = GMapChar (k,v) gm

    lookup _ NIL                 = Nothing
    lookup k (GMapChar (c,v) gm) = if k == c then Just v else (Main.lookup) k gm

-- | GMapKey ()
instance GMapKey () where
    data GMap () v          = GMapUnit (Maybe v) deriving Show
    empty                   = GMapUnit Nothing
    lookup () (GMapUnit v)  = v
    insert () v _           = GMapUnit $ Just v

-- | GMapKey (a,b)                                       
instance (GMapKey a,GMapKey b) => GMapKey (a,b) where
    data GMap (a,b) v            = GMapPair (GMap a (GMap b v)) 
    empty                        = GMapPair Main.empty
    lookup (a,b) (GMapPair gm)   = Main.lookup a gm >>= Main.lookup b
    insert (a,b) v (GMapPair gm) = GMapPair $ case Main.lookup a gm of
                                              Nothing -> Main.insert a ( Main.insert b v Main.empty ) gm
                                              Just gm2 -> Main.insert a ( Main.insert b v gm2 )  gm

-- | GMapKey (Either a b)
instance (GMapKey a,GMapKey b) => GMapKey (Either a b) where 
    data GMap (Either a b) v                = GMapEither (GMap a v) (GMap b v) 
    empty                                   = GMapEither Main.empty Main.empty
    lookup (Left a) (GMapEither gm1 _)      = Main.lookup a gm1
    lookup (Right b) (GMapEither _ gm2)     = Main.lookup b gm2
    insert (Left a) v (GMapEither gm1 gm2)  = GMapEither (Main.insert a v gm1) gm2
    insert (Right b) v (GMapEither gm1 gm2) = GMapEither gm1 (Main.insert b v gm2) 

-- | let's try some data now 
myGMap :: GMap (Int, Either Char ()) String
myGMap = Main.insert (5, Left 'c') "(5, Left 'c')"    $
         Main.insert (4, Right ()) "(4, Right ())"    $
         Main.insert (5, Right ()) "This is the one!" $
         Main.insert (5, Right ()) "This is the two!" $
         Main.insert (6, Right ()) "(6, Right ())"    $
         Main.insert (5, Left 'a') "(5, Left 'a')"    $
         Main.empty

main ::  IO ()
main = putStrLn $ maybe "Couldn't find key!" id $ Main.lookup (5, Left 't') myGMap
