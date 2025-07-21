import React from 'react';
import ImageGenerator from '../components/ImageGenerator/ImageGenerator';
import Header from '../components/Header/Header';
import Dashboard from '../components/Dashboard/Dashboard';


const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
     <Dashboard/>
    </div>
  );
};

export default DashboardPage;