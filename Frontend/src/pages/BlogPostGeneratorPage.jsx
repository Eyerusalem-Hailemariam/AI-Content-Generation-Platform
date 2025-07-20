import React from 'react';
import BlogPostGenerator from '../components/BlogPostGenerator/BlogPostGenerator';
import Header from '../components/Header/Header';
import ImageGenerator from '../components/ImageGenerator/ImageGenerator';

const BlogPostGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 p-6">
        <div className="w-full md:w-1/2">
          <BlogPostGenerator />
        </div>
        <div className="w-full md:w-1/2">
          <ImageGenerator />
        </div>
      </div>
    </div>
  );
};

export default BlogPostGeneratorPage;
