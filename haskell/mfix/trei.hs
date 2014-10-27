{-# LANGUAGE RecursiveDo #-}
data BTree = Z | B Int BTree BTree deriving Show
repsum t = mdo
    (u,s) <- rep_x_sum t s
    putStrLn ""
    return u
 
rep_x_sum Z _ = return (Z, 0)
rep_x_sum (B i l r) s = do
  putStr "("
  (l',sl) <- rep_x_sum l s
  putStr (show i)
  (r',sr) <- rep_x_sum r s
  putStr ")"
  return (B s l' r', i + sl + sr)

main = repsum (B 4 (B 3 Z Z) (B 5 Z (B 1 Z Z)))
       >>= print
