import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BlogPostGeneratorPage from "./pages/BlogPostGeneratorPage";
import BlogAndImageGeneratorPage from "./pages/BlogAndImageGeneratorPage";
import SignupPage from "./pages/SignupPage";
import './index.css';
import LoginPage from "./pages/LoginPage";
import ImageGeneratorPage from "./pages/ImageGeneratorPage";
import PaymentPage from './pages/PaymentPage';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LandingPage from "./pages/LandingPage";


const stripePromise = loadStripe('pk_test_51RlS4dQeiUbH3HnfwXPGZvjSbaT9GTB9XF1oxk0EbXsO5QjS9dhhs4XDmdr68kIe7YnFowj47NDt7aD5X9Qf0tmv00xkftHo12');

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blog-post" element={<BlogAndImageGeneratorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/image-gen" element={<ImageGeneratorPage />} />
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/payment" element={
          <Elements stripe={stripePromise}>
            <PaymentPage />
          </Elements>
        } />
        {/* Optional: 404 fallback */}
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
