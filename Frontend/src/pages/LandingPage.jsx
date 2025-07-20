import React from 'react';
import Features from "../components/Landing/Features";
import Testimonial from '../components/Landing/Testimonial';
import Footer from '../components/Landing/Footer';
import HeroSection from '../components/Landing/HeroSection';
import Header from '../components/Header/Header';
import TrustedCompanies from '../components/Landing/TrustedCompanies';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';


const LandingPage = () => {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header/>
      <HeroSection/>
      <div id="companies"><TrustedCompanies /></div>
      <div id="features"><Features /></div>
      <div id="testimonial"><Testimonial /></div>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default LandingPage;