import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";import SettingsPage from "./pages/SettingsPage";

import { GameSettingsProvider } from "./context/GameSettingsContext";

function App() {
  return (
    <BrowserRouter>
      <GameSettingsProvider>
        <Layout>
          <Routes>
  <Route path="/" element={<StartPage />} />
  <Route path="/settings" element={<SettingsPage />} />
  <Route path="/game" element={<GamePage />} />
  <Route path="/result" element={<ResultPage />} />
</Routes>

        </Layout>
      </GameSettingsProvider>
    </BrowserRouter>
  );
}

export default App;
