import React from "react";
import SegmentedBar from "../ProgressBars/SegmentedBar";

/**
 * Widget d'affichage des informations CPU
 * @param {Object} cpuData - Données CPU du système
 */
const CPUWidget = ({ cpuData }) => {
  if (!cpuData) return null;

  return (
    <div className="widget p-0 min-h-0">
      <div className="p-2 pb-0">
        <h3 className="text-neon-blue text-xs">• CPU</h3>
      </div>
      <div className="px-3 py-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-white">
            Utilisation
            <span className="text-gray-500">({cpuData.cores} cœurs)</span>
          </span>
          <span className="text-neon-blue text-sm font-bold">
            {cpuData.usage}%
          </span>
        </div>

        <SegmentedBar value={cpuData.usage} color="var(--neon-blue)" />

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">TEMP</span>
            <span className="text-neon-blue text-sm">
              {cpuData.temperature}°C
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">MODÈLE</span>
            <span className="text-white text-xs truncate">
              {cpuData.model.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPUWidget;
