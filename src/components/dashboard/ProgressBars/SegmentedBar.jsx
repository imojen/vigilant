import React from "react";

/**
 * Barre de progression segmentée avec style cyberpunk
 * @param {number} value - Valeur actuelle (0-100)
 * @param {number} segments - Nombre de segments dans la barre
 * @param {string} color - Couleur des segments actifs
 */
const SegmentedBar = ({ value, segments = 20, color = "var(--neon-blue)" }) => {
  const activeSegments = Math.ceil((value / 100) * segments);

  return (
    <div className="flex w-full h-2 gap-[1px]">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-full"
          style={{
            backgroundColor: i < activeSegments ? color : "rgba(0,0,0,0.5)",
            boxShadow: i < activeSegments ? `0 0 5px ${color}` : "none",
          }}
        />
      ))}
    </div>
  );
};

export default SegmentedBar;
