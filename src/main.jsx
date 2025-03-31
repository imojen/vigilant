import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// On remplace apiService par mockApiService en développement
// En production, il faudrait utiliser le vrai service API
import mockApiService from "./utils/mockApiService.js";
// import apiService from "./utils/apiService.js";

// Toujours utiliser mockApiService pour la démo sur GitHub Pages
// Pour une production réelle, on utiliserait la condition ci-dessous
// if (import.meta.env.DEV) {
//   window.apiService = mockApiService;
// } else {
//   window.apiService = apiService;
// }

// Utiliser toujours les mocks pour la démo
window.apiService = mockApiService;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
