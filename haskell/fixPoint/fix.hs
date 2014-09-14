module Fix where 
import Control.Monad.Fix
 
 -- fix (\rec n -> if n == 0 then 1 else n * rec (n-1)) 5
 
some = (\rec n -> if n == 0 then 1 else n * rec (n-1))

-- fix f = f ( fix f )
fact = fix ( \rec n -> if n == 0 then 1 else n * rec (n-1) ) 

--
-- GHCi fact 5 
-- fix some 
-- = (\n -> if n == 0 then 1 else n * (fix some) (n-1)) 
-- = (\n -> if n == 0 then 1 else n * ((\n -> if n == 0 then 1 else n * (fix some) (n-1))) (n-1))
-- eg. fix some 2 
-- = if 2 == 0 then 1 else 2 * (fix some) 1
-- = if 2 == 0 then 1 else 2 * ( if 1 == 0 then 1 else 1 * (fix some) 0) 
-- = if 2 == 0 then 1 else 2 * ( if 1 == 0 then 1 else 1 * ( 1 )) 
--
--  GHCi if 2 == 0 then 1 else 2 * ( if 1 == 0 then 1 else 1 * ( 1 ) ) 

