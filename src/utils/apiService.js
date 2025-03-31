import axios from "axios";
import config from "../config/config.json";

const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const apiService = {
  getSystemInfo: async () => {
    try {
      const response = await apiClient.get(config.api.endpoints.system);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations système:",
        error
      );
      throw error;
    }
  },

  getCpuInfo: async () => {
    try {
      const response = await apiClient.get(config.api.endpoints.cpu);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations CPU:",
        error
      );
      throw error;
    }
  },

  getMemoryInfo: async () => {
    try {
      const response = await apiClient.get(config.api.endpoints.memory);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations mémoire:",
        error
      );
      throw error;
    }
  },

  getStorageInfo: async () => {
    try {
      const response = await apiClient.get(config.api.endpoints.storage);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de stockage:",
        error
      );
      throw error;
    }
  },

  getPostgreSQLInfo: async () => {
    try {
      const response = await apiClient.get(config.api.endpoints.postgresql);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations PostgreSQL:",
        error
      );
      throw error;
    }
  },

  getApacheInfo: async () => {
    try {
      const response = await apiClient.get(config.api.endpoints.apache);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations Apache:",
        error
      );
      throw error;
    }
  },

  getProcessesInfo: async () => {
    try {
      const response = await apiClient.get(config.api.endpoints.processes);
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations des processus:",
        error
      );
      throw error;
    }
  },

  getLogs: async (limit = 100, offset = 0) => {
    try {
      const response = await apiClient.get(
        `${config.api.endpoints.logs}?limit=${limit}&offset=${offset}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des logs:", error);
      throw error;
    }
  },
};

export default apiService;
