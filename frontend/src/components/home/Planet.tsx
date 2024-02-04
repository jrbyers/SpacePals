// src/components/Planet.js
import React, { useState } from "react";
import "./Planet.css";
import { useNavigate } from "react-router-dom";

const Planet = () => {
  const [isHovered, setHovered] = useState(false);
   const navigate = useNavigate();

  const handleHover = () => {
    setHovered(!isHovered);
  };
  const handleClick = () => {
    navigate("/LandingPage");
  };

  const size = isHovered ? "150px" : "100px";

  return (
    <div
      className={`planet ${isHovered ? "hovered" : ""}`}
      style={{ width: size, height: size }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onClick={handleClick}
    >
      <div className="spaceship">🚀</div>
      🪐
    </div>
  );
};

export default Planet;
