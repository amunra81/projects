module Engine.Spec where

import Data.Word(Word32)
import Engine.Types

data InputSpec = InputSpec 
               { inputDescription :: String
               , inputDataType :: () -- TODO:: NTA_BasicType, maybe Typable class helps 
               , inputCount :: Word32
               , required :: Bool
               , requiredLevel :: Bool
               , isDefaultInput :: Bool
               , requireSplitterMap :: Bool
               }

data OutputSpec = OutputSpec 
                { outputDataType :: () -- TODO:: NTA_BasicType, maybe Typable class helps 
                , outputDescription :: String
                , outputCount :: Integer
                , regionLevel :: Bool
                , isDefaultOutput :: Bool
                }

type CommandSpec = Maybe String

data AccessMode = Create | ReadOnly | ReadWrite

data ParameterSpec = ParameterSpec  
                   { accessMode :: AccessMode
                   , parameterDataType :: () -- TODO:: NTA_BasicType, maybe Typable class helps
                   , parameterCount :: Integer
                   , constraints :: String
                   , defaultValue :: String -- JSON representation; empty std::string means parameter is required
                   }

data Spec = Spec { inputs :: Collection InputSpec
                 , outputs :: Collection OutputSpec
                 , commands :: Collection CommandSpec
                 , parameters :: Collection ParameterSpec
                 }
