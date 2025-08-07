import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import './Dashboard.css';

// Register all components
ChartJS.register(...registerables);

const Dashboard = () => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  // Data processing
  const serviceCounts = {};
  const criticalityCounts = {};
  const serviceValues = {};
  const typeCounts = {};

  assets.forEach(asset => {
    // Count of assets by service
    serviceCounts[asset.service] = (serviceCounts[asset.service] || 0) + 1;

    // Count of criticality levels
    criticalityCounts[asset.criticality] = (criticalityCounts[asset.criticality] || 0) + 1;

    // Total asset value by service
    serviceValues[asset.service] = (serviceValues[asset.service] || 0) + asset.value;

    // Count of asset types
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
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="charts">
        <div className="chart">
          <h3>Assets by Service</h3>
          <Bar data={serviceData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <h3>Criticality Levels</h3>
          <Pie data={criticalityData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <h3>Total Asset Value by Service</h3>
          <Bar data={valueData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <h3>Asset Types</h3>
          <Pie data={typeData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;