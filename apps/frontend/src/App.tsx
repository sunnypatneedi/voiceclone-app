import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VoiceClonePage from './pages/VoiceClonePage';
import NotFoundPage from './pages/NotFoundPage';
import { AppProvider } from './context/AppContext';

/**
 * Main application component that defines the routing structure
 * and provides the global application context
 * 
 * @returns {JSX.Element} The main application component
 */
const App: React.FC = (): JSX.Element => {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/voice-clone/:sampleId?" element={<VoiceClonePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
