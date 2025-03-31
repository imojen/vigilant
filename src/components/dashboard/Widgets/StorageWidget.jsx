import React from "react";
import HudProgressBar from "../ProgressBars/HudProgressBar";

/**
 * Widget d'affichage des informations de stockage
 * @param {Object} storageData - Données de stockage du système
 */
const StorageWidget = ({ storageData }) => {
  if (!storageData || !storageData.disks || !storageData.disks.length)
    return null;

  return (
    <div className="widget p-0 min-h-0">
      <div className="p-2 pb-0">
        <h3 className="text-neon-teal text-xs">• Stockage</h3>
      </div>
      <div className="px-3 py-2">
        {storageData.disks.map((disk, index) => {
          const usagePercent = Math.round((disk.used / disk.total) * 100);
          const usedGB = Math.round(disk.used / (1024 * 1024 * 1024));
          const totalGB = Math.round(disk.total / (1024 * 1024 * 1024));

          return (
            <div key={index} className={index > 0 ? "mt-2" : ""}>
              <div className="flex justify-between items-center">
                <span
                  className="text-white text-xs truncate"
                  style={{ maxWidth: "70%" }}
                >
                  {disk.mountPoint}
                </span>
                <span className="text-neon-teal text-xs font-bold">
                  {usagePercent}%
                </span>
              </div>

              <div className="h-2 my-1 w-full">
                <HudProgressBar
                  value={usagePercent}
                  color="var(--neon-teal)"
                  height={6}
                />
              </div>

              <div className="flex justify-between text-[9px] text-gray-400">
                <span>{usedGB} GB</span>
                <span className="text-neon-teal">{totalGB} GB</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StorageWidget;
