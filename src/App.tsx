import AppRouter from "./router/AppRouter";
import GTSProvider from "./context/gtsContext/GTSProvider";
import GameProvider from "./context/gameContext/GameProvider";
import PlayProvider from "./context/playContext/PlayProvider";
import SessionProvider from "./context/sessionContext/SessionProvider";

function App() {

  return (
    <GTSProvider>
      <GameProvider>
        <PlayProvider>
          <SessionProvider>
            <AppRouter />
          </SessionProvider>
        </PlayProvider>
      </GameProvider>
    </GTSProvider>
  )
}

export default App
