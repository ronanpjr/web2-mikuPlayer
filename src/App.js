import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import PlayerPage from './pages/PlayerPage';
import VocaloidsPage from './pages/VocaloidsPage';
import VocaloidProfilePage from './pages/VocaloidProfilePage';
import PageTransition from './components/PageTransition';
import './index.css';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/player/player.html" element={<PageTransition><PlayerPage /></PageTransition>} />
        <Route path="/player" element={<PageTransition><PlayerPage /></PageTransition>} />
        <Route path="/vocaloids" element={<PageTransition><VocaloidsPage /></PageTransition>} />
        <Route path="/vocaloids/:vocaloidId" element={<PageTransition><VocaloidProfilePage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
