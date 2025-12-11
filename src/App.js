import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PlayerPage from './pages/PlayerPage';
import VocaloidsPage from './pages/VocaloidsPage';
import VocaloidProfilePage from './pages/VocaloidProfilePage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/player/player.html" element={<PlayerPage />} /> {/* Maintaining old URL structure for safety if user wants it, or just /player */}
        <Route path="/player" element={<PlayerPage />} />
        <Route path="/vocaloids" element={<VocaloidsPage />} />
        <Route path="/vocaloids/:vocaloidId" element={<VocaloidProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
