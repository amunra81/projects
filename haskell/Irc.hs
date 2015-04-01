import           Pipes
import           Pipes.Network.TCP
import qualified Pipes.ByteString     as PBS
import           Control.Concurrent

main ::  IO ()
main = connect "diamond.hub.dal.net" "6667" $ \(s, _) ->
    forkIO (runEffect $ PBS.stdin >-> toSocket s) >> runEffect (fromSocket s 4096 >-> PBS.stdout)
