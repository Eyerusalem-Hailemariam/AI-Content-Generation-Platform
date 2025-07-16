import React from 'react';
import ImageGenerator from '../components/ImageGenerator/ImageGenerator';
import Header from '../components/Header/Header';


const ImageGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header/>
      <ImageGenerator/>
    </div>
  );
};

export default ImageGeneratorPage;