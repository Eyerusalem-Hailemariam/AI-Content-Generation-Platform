import React from 'react';
import Features from "../components/Landing/Features";
import Testimonial from '../components/Landing/Testimonial';
import Footer from '../components/Landing/Footer';
import HeroSection from '../components/Landing/HeroSection';
import Header from '../components/Header/Header';
import TrustedCompanies from '../components/Landing/TrustedCompanies';


const LandingPage = () => {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <TrustedCompanies/>
      <Features />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default LandingPage;