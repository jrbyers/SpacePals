import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineAnimationComponent } from '../../components/home/LineAnimationComponent';
import PersonComponent from '../../components/home/PersonComponent';
import PlanetComponent from "../../components/home/Planet";

import './HomePage.css';
import '../../components/home/Person.css';
import { redirectToAuthCodeFlow } from '../../components/SpotifyOAuth/authPkce';
import { useAppContext } from '../../components/input/ContextProvider';
import { createFalse } from 'typescript';

const clientId = "eb941c29116d4a429cee98b37757ceca";

//main component of the homepage
function HomePage() {
    const navigate = useNavigate();
    const [animate, setAnimate] = useState<boolean>(false);
    const [headClicked, setHeadClicked] = useState<boolean>(false);
    const [hovered, setHovered] = useState(false);
    const transition = {duration: 1, ease: [0.43, 0.13, 0.23, 0.96]}
    
    //method to handle navigating to the next page when head is clicked
    const handleHeadClick = async () => {
      setHovered(false)
      setAnimate(true);

      if (localStorage.getItem("access_token")) {
        setTimeout(() => {
          navigate("/input/songs");
        }, 1000);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      setTimeout(() => {
        setAnimate(false);
        setHeadClicked(true);
        if (!code) {
          setTimeout(() => {
            redirectToAuthCodeFlow(clientId);
          }, 1000);
        }
      }, 1000);

      
      // if (!code) {
      //   setTimeout(() => {
      //     redirectToAuthCodeFlow(clientId);
      //   }, 1600);
      // } else {
      //   setTimeout(() => {
      //     setAnimate(false);
      //     setHeadClicked(true);
      //   }, 1000);
      // }
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
            <LineAnimationComponent startAnimation={animate} />
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

              <motion.div
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                onClick={() => setHovered(false)}
                initial={{ scale: 1 }}
                transition={{ duration: 0.75 }}
                animate={animateStyle}
                className="expanded-container"
              >
                <PlanetComponent />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }
  
  export default HomePage;