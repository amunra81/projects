{-# LANGUAGE OverloadedStrings #-}
module TestImport
    ( module Yesod.Test
    , module Model
    , module Foundation
    , module Database.Persist
    , runDB
    , module Data.Functor
    , module Prelude
    , Spec
    , Example
    ) where

import Yesod.Test
import Database.Persist hiding (get)
import Database.Persist.Sql (SqlPersistM, runSqlPersistMPool)
import Control.Monad.IO.Class (liftIO)

import Foundation
import Model
import Data.Functor(fmap)
import Prelude(($))

type Spec = YesodSpec App
type Example = YesodExample App

runDB :: SqlPersistM a -> Example a
runDB query = do
    pool <- fmap connPool getTestYesod
    liftIO $ runSqlPersistMPool query pool
