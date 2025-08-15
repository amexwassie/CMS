import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

import bankLogo from 'C:/Users/Aragawwassie/risk_assessment/src/assets/images/bank-logo.jpg';
import Footer from './Footer';

// Register Chart.js components
ChartJS.register(...registerables);

const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const navItems = [
    'Welcome',
    'Configuration management',
    'Helpdesk',
    'Change management',
    'Service management',
    'Data administration',
    'Administration',
    'Configuration',
    'System'
  ];

  const handleNavClick = (item) => {
    setActiveSection(item === 'Welcome' ? 'dashboard' : item.toLowerCase().replace(/\s+/g, '-'));
  };

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/assets'); // Adjust your API endpoint
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
          <img src={bankLogo} alt="Bank Logo" className="bank-logo" />
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
              className={`nav-item ${activeSection === (item === 'Welcome' ? 'dashboard' : item.toLowerCase().replace(/\s+/g, '-')) ? 'active' : ''}`}
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
          <div className="dashboard-content">
            <h1>Dashboard</h1>
            
            {/* Configuration Items Section */}
            <div className="section">
              <h2>Configuration Items</h2>
              <div className="config-items">
                {[
                  { id: 1, name: 'Business Process', count: 1 },
                  { id: 2, name: 'Application Solution', count: 5 },
                  { id: 3, name: 'Contact', count: 42 },
                  { id: 4, name: 'Location', count: 4 },
                  { id: 5, name: 'Contract', count: 2 },
                  { id: 6, name: 'Server', count: 6 },
                  { id: 7, name: 'Network Device', count: 3 },
                ].map(config => (
                  <div key={config.id} className="config-card">
                    <h3>{config.name}</h3>
                    <p className="count">{config.count}</p>
                    <button className="create-btn">+ Create</button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Charts Section */}
            <div className="section">
              <h2>Visual Reports</h2>
              <div className="charts">
                <div className="chart-container">
                  <h3>Assets by Service</h3>
                  <Bar data={serviceData} options={{ responsive: true }} />
                </div>
                <div className="chart-container">
                  <h3>Criticality Levels</h3>
                  <Pie data={criticalityData} options={{ responsive: true }} />
                </div>
                <div className="chart-container">
                  <h3>Total Asset Value by Service</h3>
                  <Bar data={valueData} options={{ responsive: true }} />
                </div>
                <div className="chart-container">
                  <h3>Asset Types</h3>
                  <Pie data={typeData} options={{ responsive: true }} />
                </div>
              </div>
            </div>
            
            {/* Helpdesk Section */}
            <div className="section helpdesk-section">
              <div className="helpdesk-header">
                <h2>Helpdesk</h2>
                <h3>All open requests</h3>
              </div>
              
              <div className="helpdesk-toolbar">
                <button className="toolbar-btn">View</button>
                <button className="toolbar-btn">Analyzer</button>
                <button className="toolbar-btn">Establish TTD</button>
                <button className="toolbar-btn">Establish TTM</button>
                <button className="toolbar-btn">Standard</button>
              </div>
              
              <div className="my-requests">
                <h3>My requests</h3>
                <p>Trade 0 objects.</p>
              </div>
              
              <table className="requests-table">
                <thead>
                  <tr>
                    <th>View Request</th>
                    <th>TEB</th>
                    <th>Organisation</th>
                    <th>Caller</th>
                    <th>Start date</th>
                    <th>Status</th>
                    <th>Agent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" className="no-requests">
                      You click available in this table
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Helpdesk Content */}
        {activeSection === 'helpdesk' && (
          <div className="helpdesk-content">
            <h1>Helpdesk Management</h1>
            <p>Manage all helpdesk requests and tickets in this section.</p>
          </div>
        )}
        
       <Footer/>
      </div>
     
    </div>
    
  );
};

export default App;