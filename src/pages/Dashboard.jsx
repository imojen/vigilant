import { useState, useEffect } from "react";
import useConfig from "../hooks/useConfig";
import {
  CPUWidget,
  MemoryWidget,
  StorageWidget,
  InfoWidget,
  PostgreSQLWidget,
  ApacheWidget,
  ProcessesWidget,
} from "@/components/dashboard";

const Dashboard = () => {
  const [systemData, setSystemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isWidgetEnabled } = useConfig();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await window.apiService.getSystemInfo();
        setSystemData(data);
        setError(null);
      } catch (err) {
        setError("Impossible de récupérer les données système");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !systemData) {
    return <div className="loading">Chargement des données système...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h2>Système</h2>

      <div className="dashboard-widgets">
        {isWidgetEnabled("cpu") && systemData?.cpu && (
          <CPUWidget cpuData={systemData.cpu} />
        )}

        {isWidgetEnabled("memory") && systemData?.memory && (
          <MemoryWidget memoryData={systemData.memory} />
        )}

        {isWidgetEnabled("postgresql") && systemData?.postgresql && (
          <PostgreSQLWidget postgresqlData={systemData.postgresql} />
        )}

        {isWidgetEnabled("apache") && systemData?.apache && (
          <ApacheWidget apacheData={systemData.apache} />
        )}

        {isWidgetEnabled("processes") && systemData?.processes && (
          <ProcessesWidget processesData={systemData.processes} />
        )}

        {isWidgetEnabled("storage") && systemData?.storage && (
          <StorageWidget storageData={systemData.storage} />
        )}

        {isWidgetEnabled("logs") && <InfoWidget systemData={systemData} />}
      </div>
    </div>
  );
};

export default Dashboard;
