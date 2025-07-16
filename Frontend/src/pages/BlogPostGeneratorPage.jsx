import React from 'react';
import BlogPostGenerator from '../components/BlogPostGenerator/BlogPostGenerator';
import Header from '../components/Header/Header';

const BlogPostGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header/>
      <BlogPostGenerator/>
    </div>
  );
};

export default BlogPostGeneratorPage;