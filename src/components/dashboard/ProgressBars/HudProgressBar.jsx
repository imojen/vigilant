import React from "react";

/**
 * Barre de progression horizontale avec style cyberpunk HUD
 * @param {number} value - Valeur actuelle (0-100)
 * @param {string} color - Couleur de la barre (CSS var)
 * @param {number} height - Hauteur de la barre en pixels
 */
const HudProgressBar = ({ value, color = "var(--neon-blue)", height = 8 }) => {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div
        className="absolute inset-0 z-10"
        style={{
          width: `${value}%`,
          background: color,
          boxShadow: `0 0 10px ${color}`,
          transition: "width 0.5s ease-out",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.2) 3px, rgba(255,255,255,0.2) 6px)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default HudProgressBar;
