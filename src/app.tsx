import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HeroSection from "./components/HeroSection/HeroSection.js";
import Features from "./components/Features/Features.js";
import StatsSection from "./components/StatsSection/StatsSection.js";
import TeamSection from "./components/TeamSection/TeamSection.js";
import CallToAction from "./components/CallToAction/CallToAction.js";
import ServicesSection from "./components/ServicesSection/ServicesSection.js";
import ContactSection from "./components/ContactSection/ContactSection.js";
import Footer from "./components/Footer/Footer.js";
import Signup from "./components/Signup/Signup.js";
import PageWrapper from './components/PageWrapper.js';
import Login from "./components/Login/Login.js";


const AppRoutes: React.FC = () => {
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

export default AppRoutes;
