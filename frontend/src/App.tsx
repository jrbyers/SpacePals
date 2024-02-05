import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import AboutPage from "./pages/home/AboutPage";
import FAQPage from "./pages/home/FAQPage";
import LandingPage from "./pages/home/LandingPage";
import Camera from "./pages/home/Camera";

import "./App.css";
import Toolbar from "./components/toolbar/Toolbar";
import HomePage from "./pages/home/HomePage";
import CollectionPage from "./pages/collection/CollectionPage";

/**
 * This is the highest level component!
 */
function App() {
  return (
    <div className="App">
      <Toolbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/Camera" element={<Camera />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/camera" element={<Camera />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
