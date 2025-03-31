import React from "react";
import SegmentedBar from "../ProgressBars/SegmentedBar";

/**
 * Widget d'affichage des informations mémoire
 * @param {Object} memoryData - Données mémoire du système
 */
const MemoryWidget = ({ memoryData }) => {
  if (!memoryData) return null;

  // Calculs des valeurs de mémoire en GB
  const totalRAM = Math.round(memoryData.total / (1024 * 1024 * 1024));
  const usedRAM = Math.round(memoryData.used / (1024 * 1024 * 1024));
  const freeRAM = Math.round(memoryData.free / (1024 * 1024 * 1024));
  const cacheRAM = Math.max(0, totalRAM - usedRAM - freeRAM);

  // Calcul du pourcentage d'utilisation
  const memoryUsagePercent = Math.round(
    (memoryData.used / memoryData.total) * 100
  );

  return (
    <div className="widget p-0 min-h-0">
      <div className="p-2 pb-0">
        <h3 className="text-neon-purple text-xs">• RAM</h3>
      </div>
      <div className="px-3 py-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-white">Utilisation</span>
          <span className="text-neon-purple text-sm font-bold">
            {memoryUsagePercent}%
          </span>
        </div>

        <SegmentedBar value={memoryUsagePercent} color="var(--neon-purple)" />

        <div className="flex justify-between items-center mt-3">
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-gray-500">UTILISÉ</span>
            <span className="text-neon-purple text-[10px]">{usedRAM} GB</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-gray-500">TOTAL</span>
            <span className="text-white text-[10px]">{totalRAM} GB</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-gray-500">LIBRE</span>
            <span className="text-neon-teal text-[10px]">{freeRAM} GB</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-gray-500">CACHE</span>
            <span className="text-white text-[10px]">{cacheRAM} GB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryWidget;
