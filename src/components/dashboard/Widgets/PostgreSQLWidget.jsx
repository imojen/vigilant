import React from "react";
import SegmentedBar from "../ProgressBars/SegmentedBar";
import HudProgressBar from "../ProgressBars/HudProgressBar";

/**
 * Widget d'affichage des informations PostgreSQL
 * @param {Object} postgresqlData - Données PostgreSQL du système
 */
const PostgreSQLWidget = ({ postgresqlData }) => {
  if (!postgresqlData) return null;

  const cacheHitPercent = Math.round(postgresqlData.cacheHitRate * 100);

  return (
    <div className="widget p-0 min-h-0">
      <div className="p-2 pb-0">
        <h3 className="text-neon-blue text-xs">• PostgreSQL</h3>
      </div>
      <div className="px-3 py-2">
        {/* Connexions */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-white">
              Connexions
              <span className="text-gray-500">
                (max: {postgresqlData.maxConnections})
              </span>
            </span>
            <span className="text-neon-blue text-sm font-bold">
              {postgresqlData.activeConnections}
            </span>
          </div>
          <HudProgressBar
            value={
              (postgresqlData.activeConnections /
                postgresqlData.maxConnections) *
              100
            }
            color="var(--neon-blue)"
            height={6}
          />
        </div>

        {/* Taux de hit du cache */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-white">Taux de hit du cache</span>
            <span className="text-neon-purple text-sm font-bold">
              {cacheHitPercent}%
            </span>
          </div>
          <SegmentedBar value={cacheHitPercent} color="var(--neon-purple)" />
        </div>

        {/* Requêtes par seconde */}
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white">Requêtes/sec</span>
            <span className="text-neon-teal text-sm font-bold">
              {postgresqlData.queriesPerSecond}
            </span>
          </div>
        </div>

        {/* Temps de réponse */}
        <div className="mb-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white">Temps de réponse moyen</span>
            <span className="text-neon-teal text-sm font-bold">
              {postgresqlData.avgResponseTime} ms
            </span>
          </div>
        </div>

        {/* Transactions et verrous */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">TRANSACTIONS</span>
            <span className="text-neon-blue text-sm">
              {postgresqlData.activeTransactions}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500">VERROUS</span>
            <span
              className={`text-sm ${
                postgresqlData.locks > 0 ? "text-neon-pink" : "text-white"
              }`}
            >
              {postgresqlData.locks}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostgreSQLWidget;
