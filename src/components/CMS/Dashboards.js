import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const Dashboard = ({ serviceData, criticalityData, valueData, typeData }) => {
  return (
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
              <th>TTl</th>
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
  );
};

export default Dashboard;