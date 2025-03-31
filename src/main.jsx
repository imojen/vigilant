import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// On remplace apiService par mockApiService en développement
// En production, il faudrait utiliser le vrai service API
import mockApiService from "./utils/mockApiService.js";
import apiService from "./utils/apiService.js";

// Remplacer l'implémentation d'apiService par mockApiService
// pour utiliser des données fictives pendant le développement
if (import.meta.env.DEV) {
  window.apiService = mockApiService;
} else {
  window.apiService = apiService;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
