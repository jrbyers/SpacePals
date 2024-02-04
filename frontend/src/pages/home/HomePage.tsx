import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PlanetComponent from "../../components/home/Planet";

import './HomePage.css';




//main component of the homepage
function HomePage() {

    const transition = {duration: 1, ease: [0.43, 0.13, 0.23, 0.96]}
  
    //returning the page component
    return (
      <>
        <div className="home-page">
          <motion.div
            exit={{ opacity: 0 }}
            transition={transition}
            className="main-container"
          >
            <div className="filler-container"></div>
            <div className="person-container">
              <motion.div
                key="text-container"
                exit={{ opacity: 0 }}
                transition={transition}
                className="text-container"
              >
                <div className="text-bottom">
                  SpacePals:
                  <br></br>
                  Your Space
                  <br></br>
                  Voyage Awaits!
                </div>
              </motion.div>
                <PlanetComponent />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default HomePage;
