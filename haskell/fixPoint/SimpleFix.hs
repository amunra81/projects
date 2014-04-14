module SimpleFix where

fix' f = f ( fix' f )

x = fix' (1:)

--this is equaivalent to x
x' = 1:x'

tk = take 3000

y  = tk x
y' = tk x'
