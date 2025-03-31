import { useState } from "react";
import useConfig from "../hooks/useConfig";

const Settings = () => {
  const { config, updateConfigSection } = useConfig();
  const [formData, setFormData] = useState({
    apiBaseUrl: config.api.baseUrl,
    refreshInterval: config.api.refreshInterval,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mise à jour uniquement de la section API
    updateConfigSection("api", {
      baseUrl: formData.apiBaseUrl,
      refreshInterval: Number(formData.refreshInterval),
    });

    alert("Configuration API sauvegardée");
  };

  return (
    <div className="settings-page popup-version">
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-group">
          <h3 className="text-neon-teal">API</h3>

          <div className="form-group">
            <label htmlFor="apiBaseUrl">URL de base de l'API</label>
            <input
              type="text"
              id="apiBaseUrl"
              name="apiBaseUrl"
              value={formData.apiBaseUrl}
              onChange={handleChange}
              className="cyber-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="refreshInterval">
              Intervalle de rafraîchissement (ms)
            </label>
            <input
              type="number"
              id="refreshInterval"
              name="refreshInterval"
              value={formData.refreshInterval}
              onChange={handleChange}
              className="cyber-input"
              min="1000"
              step="1000"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="cyber-button">
            SAUVEGARDER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
