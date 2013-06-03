data Time m e = Time e (m (Time m e)) 

get :: Time [] Integer
get = Time 1 []

doi :: Time Maybe Bool
doi = Time True $ Just $
      Time False $ Just $ 
      Time True $ Nothing 

trei :: Time [] Bool
trei = Time True [ Time False [], Time True []]
