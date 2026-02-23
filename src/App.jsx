import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import SettingsPage from "./pages/SettingsPage";

import { GameSettingsProvider } from "./context/GameSettingsContext";
import CookieConsent from "react-cookie-consent";

/**
 * @file App.jsx
 * @module App
 * Root component of the application.
 * Provides routing, layout, game settings context, and GDPR cookie consent popup.
 */

/**
 * App component
 *
 * @component
 * @returns {JSX.Element} The rendered application with routes and providers
 */
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

          {/* GDPR Cookie Popup */}
          <CookieConsent
            location="bottom"
            buttonText="Accept"
            declineButtonText="Decline"
            enableDeclineButton
            style={{ background: "#2B373B" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            declineButtonStyle={{ color: "#fff", background: "#ff0000" }}
          >
            This website uses cookies to enhance the user experience. 
            You can accept or decline according to GDPR.
          </CookieConsent>
        </Layout>
      </GameSettingsProvider>
    </BrowserRouter>
  );
}

export default App;
