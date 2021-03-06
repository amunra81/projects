module Engine.Region where
import Data.Map.Lazy(Map) -- TODO sau strict? de verificat e si in functie de performante
import Engine.Types
import Engine.Spec
import Engine.Input
import Engine.Output

data Region = Region 
            {
                -- |name of the region
                name :: String,
                -- |dimensions of the region
                dimensions :: Dimensions,
                -- |region type
                _type :: String,
                -- |region spec
                spec :: Spec,
                --TODO: mai trebuie luati parametri dupa ce vezi care
                --e faza cu implementarea,
                inputs :: Map String Input,
                outputs :: Map String Output
            }
