{-# LANGUAGE OverloadedStrings #-}
module Examples where

import Control.Monad ((>=>), join)
import qualified Data.ByteString.Char8 as S
import Data.Int (Int64)
import Data.Monoid ((<>))
import System.IO.Streams (InputStream)
import qualified System.IO.Streams as Streams
import System.IO
import Prelude hiding (head)

cat :: FilePath -> IO ()
cat file = withFile file ReadMode $ \h -> do
    x <- Streams.handleToInputStream  h
    Streams.connect x Streams.stdout

grep :: S.ByteString -> FilePath -> IO ()
grep pattern file = withFile file ReadMode $ \h -> do
    is <- Streams.handleToInputStream h >>=
          Streams.lines                >>=
          Streams.filter (S.isInfixOf pattern)
    os <- Streams.unlines Streams.stdout
    Streams.connect is os

data Option = Bytes | Words | Lines

len :: InputStream a -> IO Int64
len = Streams.fold (\n _ -> n + 1) 0

wc :: Option -> FilePath -> IO ()
wc opt file = withFile file ReadMode $
    Streams.handleToInputStream >=> count >=> print
  where
    count = case opt of
        Bytes -> \is -> do
            (is', cnt) <- Streams.countInput is
            Streams.skipToEof is'
            cnt
        Words -> Streams.words >=> len
        Lines -> Streams.lines >=> len

nl :: FilePath -> IO ()
nl file = withFile file ReadMode $ \h -> do
    nats <- Streams.fromList [1..]
    ls   <- Streams.handleToInputStream h >>= Streams.lines
    is   <- Streams.zipWith
                (\n bs -> S.pack (show n) <> " " <> bs)
                nats
                ls
    os   <- Streams.unlines Streams.stdout
    Streams.connect is os

head :: Int64 -> FilePath -> IO ()
head n file = withFile file ReadMode $ \h -> do
    is <- Streams.handleToInputStream h >>= Streams.lines >>= Streams.take n
    os <- Streams.unlines Streams.stdout
    Streams.connect is os

paste :: FilePath -> FilePath -> IO ()
paste file1 file2 =
    withFile file1 ReadMode $ \h1 ->
    withFile file2 ReadMode $ \h2 -> do
    is1 <- Streams.handleToInputStream h1 >>= Streams.lines
    is2 <- Streams.handleToInputStream h2 >>= Streams.lines
    isT <- Streams.zipWith (\l1 l2 -> l1 <> "\t" <> l2) is1 is2
    os  <- Streams.unlines Streams.stdout
    Streams.connect isT os

yes :: IO ()
yes = do
    is <- Streams.fromList (repeat "y")
    os <- Streams.unlines Streams.stdout
    Streams.connect is os

na = error "na"
main = na
