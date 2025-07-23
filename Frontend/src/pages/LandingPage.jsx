import React from 'react';
import Features from "../components/Landing/Features";
import Testimonial from '../components/Landing/Testimonial';
import Footer from '../components/Landing/Footer';
import HeroSection from '../components/Landing/HeroSection';
import Header from '../components/Header/Header';
import TrustedCompanies from '../components/Landing/TrustedCompanies';
import ScrollToTopButton from '../components/ui/ScrollToTopButton';
import Pricing from '../components/Landing/Pricing';
import { Box } from '@mui/material';

const LandingPage = () => {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      <Header />
      <Box mt={15}> 
        <HeroSection />
      </Box>
      <div id="companies"><TrustedCompanies /></div>
      <div id="features"><Features /></div>
      <div id="price"><Pricing /></div>
      <div id="testimonial"><Testimonial /></div>
      <ScrollToTopButton />
      <Footer/>
    </Box>
  );
};

export default LandingPage;
