import { useState } from "react";
import "./App.css";

// Composants importés directement sans Router
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Settings from "./pages/Settings";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="app dark cyberpunk-theme">
      <header className="app-header">
        <h1>Vigilant Observer - MODE DEMO</h1>
        <div className="mock-indicator">DONNÉES SIMULÉES</div>
        <button
          className="settings-toggle"
          onClick={toggleSettings}
          title="Configuration"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="settings-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </header>

      <main className="app-main single-page">
        <div className="main-container simplified">
          <section className="main-section dashboard-section">
            <Dashboard />
          </section>

          <section className="main-section logs-section">
            <Logs />
          </section>
        </div>
      </main>

      {showSettings && (
        <div className="settings-overlay" onClick={toggleSettings}>
          <div className="settings-popup" onClick={(e) => e.stopPropagation()}>
            <div className="settings-popup-header">
              <h2>Configuration API</h2>
              <button className="close-btn" onClick={toggleSettings}>
                ×
              </button>
            </div>
            <div className="settings-popup-content">
              <Settings />
            </div>
          </div>
        </div>
      )}

      {/* Conteneur pour les tooltips qui doivent rester au-dessus de tout */}
      <div
        id="tooltips-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10000,
        }}
      ></div>
    </div>
  );
}

export default App;
