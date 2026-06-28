import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage slug="" />} />
      <Route path="/proji_knowledge" element={<Navigate to="/knowledge" replace />} />
      <Route path="/:slug" element={<LandingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
