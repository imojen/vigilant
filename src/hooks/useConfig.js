import { useState } from "react";
import config from "../config/config.json";

const useConfig = () => {
  const [appConfig, setAppConfig] = useState(config);

  // Cette fonction permet de mettre à jour la configuration dynamiquement
  const updateConfig = (newConfig) => {
    setAppConfig((prevConfig) => ({
      ...prevConfig,
      ...newConfig,
    }));
  };

  // Fonction pour mettre à jour une section spécifique de la configuration
  const updateConfigSection = (section, newSectionConfig) => {
    if (!appConfig[section]) {
      console.warn(`La section de configuration '${section}' n'existe pas.`);
      return;
    }

    setAppConfig((prevConfig) => ({
      ...prevConfig,
      [section]: {
        ...prevConfig[section],
        ...newSectionConfig,
      },
    }));
  };

  // Fonction pour obtenir un widget spécifique
  const getWidgetConfig = (widgetName) => {
    if (!appConfig.dashboard?.widgets?.[widgetName]) {
      console.warn(`La configuration du widget '${widgetName}' n'existe pas.`);
      return null;
    }

    return appConfig.dashboard.widgets[widgetName];
  };

  // Fonction pour obtenir le seuil d'alerte d'un widget
  const getAlertThreshold = (widgetName) => {
    const widget = getWidgetConfig(widgetName);
    if (!widget) return null;

    return widget.alertThreshold;
  };

  // Fonction pour vérifier si un widget est activé
  const isWidgetEnabled = (widgetName) => {
    const widget = getWidgetConfig(widgetName);
    if (!widget) return false;

    return widget.enabled;
  };

  return {
    config: appConfig,
    updateConfig,
    updateConfigSection,
    getWidgetConfig,
    getAlertThreshold,
    isWidgetEnabled,
  };
};

export default useConfig;
