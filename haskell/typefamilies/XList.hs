{-# LANGUAGE TypeFamilies #-}

-- Declare a list-like data family
data family XList a
 
-- Declare a list-like instance for Char
data instance XList Char = XCons !Char !(XList Char) | XNil
 
-- Declare a number-like instance for ()
data instance XList () = XListUnit !Int

--suss ::  a -> a
suss = id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id id 
