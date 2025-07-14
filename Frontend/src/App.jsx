import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPostGeneratorPage from "./pages/BlogPostGeneratorPage";
import SignupPage from "./pages/SignupPage";
import './index.css';
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/blog-post" element={<BlogPostGeneratorPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
