// src/components/Planet.js
import React, { useState } from "react";
import "./Planet.css";

const Planet = () => {
  const [isHovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(!isHovered);
  };

  const size = isHovered ? "150px" : "100px";

  return (
    <div
      className={`planet ${isHovered ? "hovered" : ""}`}
      style={{ width: size, height: size }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className="spaceship">🚀</div>
      🪐
    </div>
  );
};

export default Planet;
