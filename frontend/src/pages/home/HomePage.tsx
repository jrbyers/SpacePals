import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineAnimationComponent } from '../../components/home/LineAnimationComponent';
import PlanetComponent from "../../components/home/Planet";

import './HomePage.css';


const clientId = "eb941c29116d4a429cee98b37757ceca";

//main component of the homepage
function HomePage() {
    const navigate = useNavigate();
    const [animate, setAnimate] = useState<boolean>(false);
    const [headClicked, setHeadClicked] = useState<boolean>(false);
    const [hovered, setHovered] = useState(false);
    const transition = {duration: 1, ease: [0.43, 0.13, 0.23, 0.96]}
    
    //method to handle navigating to the next page when head is clicked
    const handlePlanetClick = async () => {
      setHovered(false)
      setAnimate(true);
      setTimeout(() => {
        navigate("/pages/home/LandingPage");
      }, 1000);
      return;
      
    }
  
    //outlining the transition for rendering the next page
    const animateStyle = {
      scale: headClicked ? 50 : 1,
      transformOrigin: '50% 25%',
    };
  
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
          </motion.div>
        </div>
      </>
    );
  }
  
  export default HomePage;