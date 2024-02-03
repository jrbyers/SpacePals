import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";


import AboutPage from "./pages/home/AboutPage";
import FAQPage from "./pages/home/FAQPage";

import "./App.css";
import Toolbar from "./components/toolbar/Toolbar";
import HomePage from "./pages/home/HomePage";

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
          </Routes>
        </Router>
      </div>
  );
}

export default App;
