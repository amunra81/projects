import Control.Monad
-- }}}

--
-- Birds on a stick
--

type Birds = Int
type Pole = (Birds,Birds)

landLeft:: Birds -> Pole -> Maybe Pole
landLeft n ( left,right )
	| abs (left + n - right) < 4 	= Just (left+n,right)
	| otherwise  			= Nothing	 				

landRight:: Birds -> Pole -> Maybe Pole
landRight n  (left,right)
	| abs( left - (right + n ) ) < 4 	= Just (left,right+n)
	| otherwise  				= Nothing	 				

-- {{{ the same routine writen in diffrent ways

routine :: Maybe Pole
routine = do
	start <- return (0,0)
	first <- landLeft 2 start
	second <- landRight 3 first
	landLeft 2 second

routine2 :: Maybe Pole
routine2 = return (0,0) >>= 
		(\start -> landLeft 2 start >>= 
		(\first -> landRight 3 first >>=
		(\second -> landLeft 2 second)))

routine3 :: Maybe Pole 
routine3 = return (0,0) >>= (landLeft 2)  >>= (landRight 3) >>= (landLeft 2)

a = (.).(.).(.) 
