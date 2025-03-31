import React from "react";

/**
 * Widget d'affichage des informations système
 * @param {Object} systemData - Données générales du système
 */
const InfoWidget = ({ systemData }) => {
  if (!systemData) return null;

  // Calcul de l'uptime formaté
  const uptimeFormatted = systemData.uptime
    ? `${Math.floor(systemData.uptime / 86400)}j ${Math.floor(
        (systemData.uptime % 86400) / 3600
      )}h`
    : "N/A";

  return (
    <div className="widget p-0 min-h-0">
      <div className="p-2 pb-0">
        <h3 className="text-neon-blue text-xs">• Informations</h3>
      </div>
      <div className="px-3 py-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div>
            <div className="text-[10px] text-gray-500">HOST</div>
            <div className="text-white truncate">
              {systemData.hostname || "N/A"}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">OS</div>
            <div className="text-white truncate">
              {systemData.os ? systemData.os.split(" ")[0] : "N/A"}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">UPTIME</div>
            <div className="text-white">{uptimeFormatted}</div>
          </div>
          <div>
            <div className="text-[10px] text-gray-500">KERNEL</div>
            <div className="text-white truncate">
              {systemData.kernel ? systemData.kernel.split("-")[0] : "N/A"}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-3">
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-teal shadow-glow"></div>
            <span className="text-[9px] text-neon-teal font-semibold">
              ONLINE
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 rounded-full bg-neon-pink shadow-glow"></div>
            <span className="text-[9px] text-neon-pink font-semibold">
              ACTIF
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoWidget;
