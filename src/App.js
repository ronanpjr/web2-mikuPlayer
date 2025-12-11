import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PlayerPage from './pages/PlayerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/player/player.html" element={<PlayerPage />} /> {/* Maintaining old URL structure for safety if user wants it, or just /player */}
        <Route path="/player" element={<PlayerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
