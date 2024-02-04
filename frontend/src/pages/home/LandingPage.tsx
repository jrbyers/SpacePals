import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "./LandingPage.css";

//main component of the homepage
function LandingPage() {
  const navigate = useNavigate();
  const handleButtonClickCamera = () => {
    navigate("/Camera");
  };


  return (
    <>
      <div className="landing-page">
        <div className="main-container">
          <button
            className="left-center-button"
            onClick={handleButtonClickCamera}
          >
            button
          </button>
          <div className="planet-with-ring"> </div>
          <div className="beige-moon"></div>
          <div className="spaceship">🚀</div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
