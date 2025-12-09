import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import SettingsPage from "./pages/SettingsPage";

import { GameSettingsProvider } from "./context/GameSettingsContext";

function App() {
  return (
    <BrowserRouter>
      <GameSettingsProvider>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={`/game/${crypto.randomUUID()}/start`} replace />}
            />

            <Route path="/game/:uid/start" element={<StartPage />} />
            <Route path="/game/:uid/settings" element={<SettingsPage />} />
            <Route path="/game/:uid/game" element={<GamePage />} />
            <Route path="/game/:uid/result" element={<ResultPage />} />

          </Routes>
        </Layout>
      </GameSettingsProvider>
    </BrowserRouter>
  );
}

export default App;
