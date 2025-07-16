import React from 'react';
import Header from '../components/Header/Header';
import Features from '../components/Landing/Features';

const  LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header/>
      <Features/>
    </div>
  );
};

export default LandingPage;