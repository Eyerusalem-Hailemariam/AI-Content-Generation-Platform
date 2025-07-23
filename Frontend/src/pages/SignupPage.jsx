import React from 'react';
import SignupForm from '../components/Signup/SignupForm';
import Header from '../components/Header/Header';
import Footer from '../components/Landing/Footer';

const SignupPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
