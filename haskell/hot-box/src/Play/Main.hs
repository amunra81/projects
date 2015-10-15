import Play.HotBox

main =  sequence_ tests
        {-mapM_ id tests-}
        {-foldli (>>) (return ()) tests-}

