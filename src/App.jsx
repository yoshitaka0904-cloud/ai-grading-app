import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import ExamPage from './pages/ExamPage';
import ResultPage from './pages/ResultPage';
import DashboardPage from './pages/DashboardPage';
import UniversityPage from './pages/UniversityPage';
import FacultyPage from './pages/FacultyPage';
import WeaknessPage from './pages/WeaknessPage';
import AuthModal from './components/AuthModal';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const handleOpenAuthModal = () => setShowAuthModal(true);
    document.addEventListener('openAuthModal', handleOpenAuthModal);
    return () => document.removeEventListener('openAuthModal', handleOpenAuthModal);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/university/:universityId" element={<UniversityPage />} />
          <Route path="/university/:universityId/faculty/:facultyId" element={<FacultyPage />} />
          <Route path="/exam/:id" element={<ExamPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/weakness" element={<WeaknessPage />} />
        </Routes>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </Router>
    </AuthProvider>
  );
}

export default App;
