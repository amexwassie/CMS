import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';

import './com.css';
// import bankLogo from 'C:/Users/Aragawwassie/risk_assessment/src/assets/images/bank-logo.jpg';
import Footer from './Footer';
import Dashboard from './Dashboards'; // Import the Dashboard component
import ConfigurationManagement from './ConfigurationManagement'; // Import ConfigurationManagement

// Register Chart components
ChartJS.register(...registerables);

const Welcome = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const navItems = [
    'Welcome',
    'Asset management',
    // 'Helpdesk',
    'Change management',
    'Service management',
    'Data administration',
    // 'Administration',
    'Configuration',
    'System'
  ];

  const handleNavClick = (item) => {
    setActiveSection(item === 'Welcome' ? 'dashboard' : item.toLowerCase().replace(/\s+/g, '-'));
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/assets');
        const data = await response.json();
        setAssets(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching assets:', error);
        setIsLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // Data processing
  const serviceCounts = {};
  const criticalityCounts = {};
  const serviceValues = {};
  const typeCounts = {};

  assets.forEach(asset => {
    serviceCounts[asset.service] = (serviceCounts[asset.service] || 0) + 1;
    criticalityCounts[asset.criticality] = (criticalityCounts[asset.criticality] || 0) + 1;
    serviceValues[asset.service] = (serviceValues[asset.service] || 0) + asset.value;
    typeCounts[asset.type] = (typeCounts[asset.type] || 0) + 1;
  });

  const serviceData = {
    labels: Object.keys(serviceCounts),
    datasets: [{
      label: 'Assets by Service',
      data: Object.values(serviceCounts),
      backgroundColor: ['rgba(99, 255, 159, 0.6)', 'rgba(7, 91, 247, 0.6)', 'rgba(76, 171, 235, 0.6)'],
    }],
  };

  const criticalityData = {
    labels: Object.keys(criticalityCounts),
    datasets: [{
      label: 'Criticality Levels',
      data: Object.values(criticalityCounts),
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
    }],
  };

  const valueData = {
    labels: Object.keys(serviceValues),
    datasets: [{
      label: 'Total Asset Value by Service',
      data: Object.values(serviceValues),
      backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
    }],
  };

  const typeData = {
    labels: Object.keys(typeCounts),
    datasets: [{
      label: 'Asset Types',
      data: Object.values(typeCounts),
      backgroundColor: ['rgba(99, 255, 159, 0.6)', 'rgba(7, 91, 247, 0.6)', 'rgba(76, 171, 235, 0.6)'],
    }],
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          {/* <img src={bankLogo} alt="Bank Logo" className="bank-logo" /> */}
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
        
        <div className="nav-items">
          {navItems.map((item, index) => (
            <div 
              key={index}
              className={`navitem ${activeSection === (item === 'Welcome' ? 'dashboard' : item.toLowerCase().replace(/\s+/g, '-')) ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              <div className="item-content">
                {item}
              </div>
            </div>
          ))}
        </div>
        
        <div className="user-info">
          <div className="avatar">U</div>
          <div className="user-details">
            <div className="username">Admin User</div>
            <div className="role">System Administrator</div>
          </div>
        </div>
        
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Dashboard Content */}
        {activeSection === 'dashboard' && (
          <Dashboard 
            serviceData={serviceData}
            criticalityData={criticalityData}
            valueData={valueData}
            typeData={typeData}
          />
        )}
        
        {/* Configuration Management Content */}
        {activeSection === 'asset-management' && (
          <ConfigurationManagement />
        )}
        
        {/* Helpdesk Content */}
        {activeSection === 'helpdesk' && (
          <div className="helpdesk-content">
            <h1>Helpdesk Management</h1>
            <p>Manage all helpdesk requests and tickets in this section.</p>
          </div>
        )}
        
        <Footer />
      </div>
      
    </div>
  );
};

export default Welcome;