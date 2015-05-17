module Paths_myCsv (
    version,
    getBinDir, getLibDir, getDataDir, getLibexecDir,
    getDataFileName, getSysconfDir
  ) where

import qualified Control.Exception as Exception
import Data.Version (Version(..))
import System.Environment (getEnv)
import Prelude

catchIO :: IO a -> (Exception.IOException -> IO a) -> IO a
catchIO = Exception.catch


version :: Version
version = Version {versionBranch = [0,1,0,0], versionTags = []}
bindir, libdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "/Users/horus/projects/haskell/csv/.cabal-sandbox/bin"
libdir     = "/Users/horus/projects/haskell/csv/.cabal-sandbox/lib/x86_64-osx-ghc-7.8.3/myCsv-0.1.0.0"
datadir    = "/Users/horus/projects/haskell/csv/.cabal-sandbox/share/x86_64-osx-ghc-7.8.3/myCsv-0.1.0.0"
libexecdir = "/Users/horus/projects/haskell/csv/.cabal-sandbox/libexec"
sysconfdir = "/Users/horus/projects/haskell/csv/.cabal-sandbox/etc"

getBinDir, getLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "myCsv_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "myCsv_libdir") (\_ -> return libdir)
getDataDir = catchIO (getEnv "myCsv_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "myCsv_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "myCsv_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
