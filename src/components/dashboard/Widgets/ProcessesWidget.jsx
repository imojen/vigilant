import React from "react";
import HudProgressBar from "../ProgressBars/HudProgressBar";

/**
 * Widget d'affichage des top processus (hauteur compacte)
 * @param {Object} processesData - Données des processus du système
 */
const ProcessesWidget = ({ processesData }) => {
  if (!processesData || !processesData.length) return null;

  // Trier les processus par CPU (décroissant)
  const sortedProcesses = [...processesData]
    .sort((a, b) => b.cpu - a.cpu)
    .slice(0, 5); // Top 5

  return (
    <div className="widget p-0 min-h-0" style={{ height: "fit-content" }}>
      <div className="p-1 pb-0">
        <h3 className="text-neon-teal text-xs">• Top Processus</h3>
      </div>
      <div className="px-2 py-1">
        {/* Liste des processus plus compacte */}
        <div>
          {sortedProcesses.map((process) => (
            <div key={process.pid} className="mb-1">
              {/* Nom et PID + CPU/MEM sur la même ligne */}
              <div className="flex justify-between items-center mb-0.5">
                <span className="text-white text-[10px] font-medium truncate max-w-[160px]">
                  {process.name}
                  <span className="text-gray-500 text-[8px] ml-1">
                    ({process.pid})
                  </span>
                </span>
                <div className="flex space-x-2">
                  <span className="text-neon-teal text-[8px]">
                    {process.cpu}%
                  </span>
                  <span className="text-neon-purple text-[8px]">
                    {process.memory}%
                  </span>
                </div>
              </div>

              {/* Barres de progression CPU et MEM */}
              <div className="grid grid-cols-2 gap-1 mb-1">
                <HudProgressBar
                  value={process.cpu}
                  color="var(--neon-teal)"
                  height={2}
                />
                <HudProgressBar
                  value={process.memory}
                  color="var(--neon-purple)"
                  height={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessesWidget;
