import React from "react";
import HudProgressBar from "../ProgressBars/HudProgressBar";
import SegmentedBar from "../ProgressBars/SegmentedBar";

/**
 * Widget d'affichage des informations Apache2
 * @param {Object} apacheData - Données Apache2 du système
 */
const ApacheWidget = ({ apacheData }) => {
  if (!apacheData) return null;

  // Calcul du pourcentage d'utilisation des workers
  const workersPercent = Math.round(
    (apacheData.activeWorkers / apacheData.maxWorkers) * 100
  );

  return (
    <div className="widget p-0 min-h-0">
      <div className="p-2 pb-0">
        <h3 className="text-neon-teal text-xs">• Apache2</h3>
      </div>
      <div className="px-3 py-2">
        {/* Workers actifs */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-white">
              Workers
              <span className="text-gray-500">
                (max: {apacheData.maxWorkers})
              </span>
            </span>
            <span className="text-neon-teal text-sm font-bold">
              {apacheData.activeWorkers}
            </span>
          </div>
          <HudProgressBar
            value={workersPercent}
            color="var(--neon-teal)"
            height={6}
          />
        </div>

        {/* Requêtes par seconde */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-white">Requêtes/sec</span>
            <span className="text-neon-blue text-sm font-bold">
              {apacheData.requestsPerSecond}
            </span>
          </div>
          <SegmentedBar
            value={
              (apacheData.requestsPerSecond / apacheData.maxRequestRate) * 100
            }
            color="var(--neon-blue)"
          />
        </div>

        {/* Codes HTTP */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-white">Codes HTTP</span>
          </div>
          <div className="flex gap-1 mt-1">
            {Object.entries(apacheData.httpCodes).map(([code, count]) => (
              <div
                key={code}
                className="flex-1 text-center text-[9px]"
                style={{
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  className={`px-1 py-0.5 rounded-sm ${getHttpCodeColor(code)}`}
                  style={{
                    height: `${Math.max(
                      15,
                      Math.min(30, (count / apacheData.totalRequests) * 100)
                    )}px`,
                  }}
                >
                  {code}
                </div>
                <div className="mt-0.5 text-gray-400">{count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Temps de réponse et connections */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">TEMPS MOYEN</span>
            <span className="text-neon-teal text-sm">
              {apacheData.avgResponseTime} ms
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">CONNEXIONS</span>
            <span className="text-neon-blue text-sm">
              {apacheData.connections}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">VHOST PRINCIPAL</span>
            <span className="text-white text-xs truncate">
              {apacheData.topVhosts[0]?.name || "N/A"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">MÉMOIRE</span>
            <span className="text-neon-purple text-sm">
              {Math.round(apacheData.memoryUsage / (1024 * 1024))} MB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fonction pour déterminer la couleur en fonction du code HTTP
function getHttpCodeColor(code) {
  const codeNum = parseInt(code);
  if (codeNum >= 500) return "bg-[#ff4040] bg-opacity-60"; // Rouge pour 5xx
  if (codeNum >= 400) return "bg-[#ffbf00] bg-opacity-60"; // Jaune pour 4xx
  if (codeNum >= 300) return "bg-[#00a3ff] bg-opacity-60"; // Bleu pour 3xx
  if (codeNum >= 200) return "bg-[#00ff9d] bg-opacity-60"; // Vert pour 2xx
  return "bg-gray-500 bg-opacity-60"; // Gris pour autres
}

export default ApacheWidget;
