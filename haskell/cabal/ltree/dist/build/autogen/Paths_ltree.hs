module Paths_ltree (
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
version = Version {versionBranch = [0,1], versionTags = []}
bindir, libdir, datadir, libexecdir, sysconfdir :: FilePath

bindir     = "/Users/horus/Library/Haskell/ghc-7.8.2/lib/ltree-0.1/bin"
libdir     = "/Users/horus/Library/Haskell/ghc-7.8.2/lib/ltree-0.1/lib"
datadir    = "/Users/horus/Library/Haskell/ghc-7.8.2/lib/ltree-0.1/share"
libexecdir = "/Users/horus/Library/Haskell/ghc-7.8.2/lib/ltree-0.1/libexec"
sysconfdir = "/Users/horus/Library/Haskell/ghc-7.8.2/lib/ltree-0.1/etc"

getBinDir, getLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "ltree_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "ltree_libdir") (\_ -> return libdir)
getDataDir = catchIO (getEnv "ltree_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "ltree_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "ltree_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
