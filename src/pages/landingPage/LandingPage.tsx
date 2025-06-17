import CallToAction from "../../components/landingPage/CallToAction/CallToAction.js";
import ContactSection from "../../components/landingPage/ContactSection/ContactSection.js";
import Features from "../../components/landingPage/Features/Features.js";
import Footer from "../../components/landingPage/Footer/Footer.js";
import HeroSection from "../../components/landingPage/HeroSection/HeroSection.js";
import ServicesSection from "../../components/landingPage/ServicesSection/ServicesSection.js";
import StatsSection from "../../components/landingPage/StatsSection/StatsSection.js";
import TeamSection from "../../components/landingPage/TeamSection/TeamSection.js";
import Header from "../../components/landingPage/Header/Header.js";
// src/pages/LandingPage.tsx
const LandingPage = () => (
  <>
    <Header />
    <HeroSection />
    <Features />
    <StatsSection />
    <TeamSection />
    <CallToAction />
    <ServicesSection />
    <ContactSection />
    <Footer />
  </>
);
export default LandingPage;
