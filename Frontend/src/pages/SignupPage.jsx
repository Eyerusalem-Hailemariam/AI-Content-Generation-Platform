import React from 'react';
import SignupForm from '../components/Signup/SignupForm';
import Header from '../components/Header/Header';
import Footer from '../components/Landing/Footer';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header/>
      <SignupForm />
      <Footer/>
    </div>
  );
};

export default SignupPage; 