import { useState, useEffect, useRef } from "react";
import useConfig from "../hooks/useConfig";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Créer un conteneur pour les tooltips s'il n'existe pas déjà
const ensureTooltipContainer = () => {
  if (!document.getElementById("tooltips-container")) {
    const tooltipContainer = document.createElement("div");
    tooltipContainer.id = "tooltips-container";
    tooltipContainer.style.position = "fixed";
    tooltipContainer.style.zIndex = "10000";
    tooltipContainer.style.pointerEvents = "none";
    document.body.appendChild(tooltipContainer);
  }
};

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltipInfo, setTooltipInfo] = useState({
    visible: false,
    message: "",
    x: 0,
    y: 0,
  });
  const tooltipTimerRef = useRef(null);
  const { config } = useConfig();

  useEffect(() => {
    // S'assurer que le conteneur de tooltips existe
    ensureTooltipContainer();

    const fetchLogs = async () => {
      try {
        setLoading(true);
        // Utiliser l'API service global (réel ou mock selon l'environnement)
        const logsData = await window.apiService.getLogs(
          config.dashboard.widgets.logs.maxEntries
        );
        setLogs(logsData);
        setError(null);
      } catch (err) {
        setError("Impossible de récupérer les logs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();

    // Mise en place du polling pour actualiser les logs
    const interval = setInterval(
      fetchLogs,
      config.dashboard.widgets.logs.refreshInterval
    );

    return () => {
      clearInterval(interval);
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
      }
    };
  }, [
    config.dashboard.widgets.logs.maxEntries,
    config.dashboard.widgets.logs.refreshInterval,
  ]);

  // Gestionnaires pour l'affichage du tooltip
  const handleMouseEnter = (log, e) => {
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
    }

    // Capturer la position Y de la ligne survolée
    const targetRow = e.currentTarget;
    const rowRect = targetRow.getBoundingClientRect();

    tooltipTimerRef.current = setTimeout(() => {
      setTooltipInfo({
        visible: true,
        message: log.message,
        timestamp: log.timestamp,
        level: log.level,
        service: log.service,
        y: rowRect.bottom,
        row: targetRow,
      });
    }, 300); // Délai de 300ms pour un affichage plus réactif
  };

  const handleMouseLeave = () => {
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
    setTooltipInfo({ ...tooltipInfo, visible: false });
  };

  if (loading && logs.length === 0) {
    return <div className="loading">Chargement des logs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const getLevelClass = (level) => {
    switch (level) {
      case "error":
        return "text-red-500 border-l-2 border-red-500 pl-3 glow-text-red";
      case "warning":
        return "text-amber-500 border-l-2 border-amber-500 pl-3 glow-text-amber";
      case "info":
        return "text-blue-500 border-l-2 border-blue-500 pl-3 glow-text-blue";
      case "debug":
        return "text-slate-400 border-l-2 border-slate-400 pl-3";
      default:
        return "text-slate-400 border-l-2 border-slate-400 pl-3";
    }
  };

  // Rendu du tooltip avec positionnement dynamique et vérification des limites de l'écran
  const renderTooltip = () => {
    if (!tooltipInfo.visible || !tooltipInfo.row) return null;

    // Récupérer les dimensions du conteneur de logs
    const logsContainer = document.querySelector(".logs-container");
    if (!logsContainer) return null;

    const logsRect = logsContainer.getBoundingClientRect();

    // Calculer la hauteur estimée du tooltip en fonction de la longueur du message
    // (approximation: ~20px par ligne pour 80 caractères par ligne)
    const messageLength = tooltipInfo.message?.length || 0;
    const estimatedLines = Math.ceil(messageLength / 80) + 2; // +2 pour l'en-tête et la ligne de séparation
    const estimatedHeight = Math.min(200, estimatedLines * 20 + 30); // max 200px, +30 pour padding

    // Vérifier si le tooltip dépasse le bas de l'écran
    const viewportHeight = window.innerHeight;
    const tooltipBottom = tooltipInfo.y + 5 + estimatedHeight;

    // Positionner au-dessus ou en-dessous selon l'espace disponible
    let tooltipY;
    if (tooltipBottom > viewportHeight - 20) {
      // Pas assez d'espace en bas, positionner au-dessus de la ligne
      tooltipY = tooltipInfo.y - estimatedHeight - 15;
    } else {
      // Assez d'espace en bas, positionner en-dessous de la ligne
      tooltipY = tooltipInfo.y + 5;
    }

    // Formater la date pour l'affichage dans le tooltip
    const formattedDate = tooltipInfo.timestamp
      ? formatDate(tooltipInfo.timestamp)
      : "---";

    return (
      <div
        className="cyber-tooltip"
        style={{
          position: "fixed",
          top: `${tooltipY}px`,
          left: `${logsRect.left}px`,
          width: `${logsRect.width}px`,
          maxWidth: "100%",
          zIndex: 100000,
          opacity: 1,
        }}
      >
        {/* En-tête avec date, niveau et service */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(0, 238, 255, 0.3)",
            paddingBottom: "5px",
            marginBottom: "8px",
            color: "#00eeff",
          }}
        >
          <div>
            <span style={{ fontWeight: "bold" }}>{formattedDate}</span>
          </div>
          <div>
            <span
              style={{
                color:
                  tooltipInfo.level === "error"
                    ? "#ff4040"
                    : tooltipInfo.level === "warning"
                    ? "#ffbf00"
                    : tooltipInfo.level === "info"
                    ? "#00a3ff"
                    : "#cccccc",
              }}
            >
              {tooltipInfo.level || "info"}
            </span>
          </div>
          <div>
            <span style={{ color: "#c890f7" }}>
              {tooltipInfo.service || "---"}
            </span>
          </div>
        </div>

        {/* Message complet */}
        <div>{tooltipInfo.message || "Contenu du tooltip"}</div>
      </div>
    );
  };

  return (
    <div className="logs-page">
      <div className="flex justify-between items-center">
        <h2>Logs Système</h2>
        <div className="cyber-terminal-status">
          <span className="status-dot pulse"></span>
          <span className="status-text">LIVE</span>
        </div>
      </div>

      <div className="logs-container overflow-hidden">
        <div className="p-0">
          <div className="logs-list cyber-terminal">
            <Table className="cyber-table">
              <TableHeader>
                <TableRow className="cyber-table-header">
                  <TableHead className="whitespace-nowrap w-auto text-xs terminal-cell">
                    Horodatage
                  </TableHead>
                  <TableHead className="whitespace-nowrap w-auto text-xs terminal-cell">
                    Niveau
                  </TableHead>
                  <TableHead className="whitespace-nowrap w-auto text-xs terminal-cell">
                    Service
                  </TableHead>
                  <TableHead className="w-full text-xs terminal-cell">
                    Message
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground py-6 terminal-cell"
                    >
                      Aucun log disponible
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log, index) => (
                    <TableRow
                      key={index}
                      className="text-xs h-8 cyber-log-row"
                      onMouseEnter={(e) => handleMouseEnter(log, e)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <TableCell className="py-1 whitespace-nowrap terminal-cell terminal-timestamp">
                        {formatDate(log.timestamp) || "---"}
                      </TableCell>
                      <TableCell
                        className={`py-1 whitespace-nowrap terminal-cell ${getLevelClass(
                          log.level
                        )}`}
                      >
                        {log.level || "info"}
                      </TableCell>
                      <TableCell className="py-1 whitespace-nowrap terminal-cell terminal-service">
                        {log.service || "---"}
                      </TableCell>
                      <TableCell
                        className="py-1 w-full truncate terminal-cell terminal-message"
                        data-message={log.message}
                        data-testid="log-message-cell"
                      >
                        {log.message || "---"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="terminal-footer">
          <div className="terminal-prompt">
            <span className="prompt-symbol">$</span>
            <div className="prompt-cursor"></div>
          </div>
        </div>
      </div>

      {/* Render tooltip using portal */}
      {renderTooltip()}
    </div>
  );
};

// Fonction utilitaire pour formater les dates
const formatDate = (timestamp) => {
  if (!timestamp) return "---";

  try {
    const date = new Date(timestamp);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      // year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return timestamp;
  }
};

export default Logs;
