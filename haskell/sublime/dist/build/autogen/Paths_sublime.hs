module Paths_sublime (
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

bindir     = "/Users/horus/Library/Haskell/ghc-7.8.3/lib/sublime-0.1.0.0/bin"
libdir     = "/Users/horus/Library/Haskell/ghc-7.8.3/lib/sublime-0.1.0.0/lib"
datadir    = "/Users/horus/Library/Haskell/ghc-7.8.3/lib/sublime-0.1.0.0/share"
libexecdir = "/Users/horus/Library/Haskell/ghc-7.8.3/lib/sublime-0.1.0.0/libexec"
sysconfdir = "/Users/horus/Library/Haskell/ghc-7.8.3/lib/sublime-0.1.0.0/etc"

getBinDir, getLibDir, getDataDir, getLibexecDir, getSysconfDir :: IO FilePath
getBinDir = catchIO (getEnv "sublime_bindir") (\_ -> return bindir)
getLibDir = catchIO (getEnv "sublime_libdir") (\_ -> return libdir)
getDataDir = catchIO (getEnv "sublime_datadir") (\_ -> return datadir)
getLibexecDir = catchIO (getEnv "sublime_libexecdir") (\_ -> return libexecdir)
getSysconfDir = catchIO (getEnv "sublime_sysconfdir") (\_ -> return sysconfdir)

getDataFileName :: FilePath -> IO FilePath
getDataFileName name = do
  dir <- getDataDir
  return (dir ++ "/" ++ name)
