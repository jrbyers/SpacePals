import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { ContextProvider } from "./components/input/ContextProvider";

import SongsPage from "./pages/input/SongsPage";
import GenerationPage from "./pages/input/GenerationPage";
import GeneratedPlaylistPage from "./pages/result/GeneratedPlaylistPage";
import AboutPage from "./pages/home/AboutPage";
import FAQPage from "./pages/home/FAQPage";
import Camera from "./pages/home/Camera";

import "./App.css";
import SettingsPage from "./pages/input/SettingsPage";
import Toolbar from "./components/toolbar/Toolbar";
import LeaderBoardPage from "./pages/home/LeaderBoardPage";
import HomePage from "./pages/home/HomePage";

/**
 * This is the highest level component!
 */
function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Toolbar />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
            <Route path="/input/songs" element={<SongsPage />} />
            <Route path="/input/settings" element={<SettingsPage />} />
            <Route path="/input/lyrics" element={<GenerationPage />} />
            <Route path="/result" element={<GeneratedPlaylistPage />} />
            <Route path="/camera" element={<Camera />} />
          </Routes>
        </Router>
      </div>
    </ContextProvider>
  );
}

export default App;
