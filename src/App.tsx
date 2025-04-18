// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './styles/global.css';

import HeroSection from './components/HeroSection/HeroSection';
import Features from './components/Features/Features';
import StatsSection from './components/StatsSection/StatsSection';
import TeamSection from './components/TeamSection/TeamSection';
import CallToAction from './components/CallToAction/CallToAction';
import ServicesSection from './components/ServicesSection/ServicesSection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import PageWrapper from './components/PageWrapper';
import Layout from './components/Layout';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Features />
              <StatsSection />
              <TeamSection />
              <CallToAction />
              <ServicesSection />
              <ContactSection />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
};

export default App;
