import React from 'react';
import VerifyOtp from '../components/Auth/ForgotPassword/VerifyPassword';

const VerifyOtpPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
       <VerifyOtp/>
      </div>
    </div>
  );
};

export default VerifyOtpPage;