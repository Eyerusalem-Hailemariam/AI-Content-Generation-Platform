import React from 'react';
import SignupForm from '../components/Signup/SignupForm';
import Header from '../components/Header/Header';
import Footer from '../components/Landing/Footer';

const SignupPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex-grow">
        <SignupForm />
      </div>
      <Footer/>
    </div>
  );
};

export default SignupPage;
