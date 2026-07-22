import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // faChartLine,
  // faCalendarAlt,
  faDownload,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import '../style/ServiceDashboard.css';

const PerformanceMetrics = ({ onClose }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedService, setSelectedService] = useState('all');

  const services = [
    'Branch Banking', 'MB USSD', 'MB Smart App', 'CBE Birr USSD', 
    'CBE Birr Smart App', 'Card Banking', 'Internet Banking', 'ATM Services'
  ];

  // Mock performance data
  const performanceData = {
    'Branch Banking': { uptime: 99.95, responseTime: 120, errorRate: 0.02 },
    'MB USSD': { uptime: 99.2, responseTime: 280, errorRate: 0.35 },
    'MB Smart App': { uptime: 99.8, responseTime: 150, errorRate: 0.08 },
    'CBE Birr USSD': { uptime: 99.9, responseTime: 110, errorRate: 0.05 },
    'CBE Birr Smart App': { uptime: 99.7, responseTime: 190, errorRate: 0.12 },
    'Card Banking': { uptime: 99.98, responseTime: 90, errorRate: 0.01 },
    'Internet Banking': { uptime: 99.85, responseTime: 140, errorRate: 0.07 },
    'ATM Services': { uptime: 99.3, responseTime: 220, errorRate: 0.28 }
  };

  // Mock historical data for charts
  const historicalData = {
    '7d': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      uptime: [99.8, 99.7, 99.9, 99.6, 99.8, 99.9, 99.7],
      responseTime: [130, 125, 140, 160, 120, 110, 135],
      errorRate: [0.1, 0.2, 0.05, 0.3, 0.1, 0.05, 0.15]
    },
    '30d': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      uptime: [99.7, 99.8, 99.6, 99.9],
      responseTime: [140, 130, 150, 125],
      errorRate: [0.15, 0.1, 0.2, 0.05]
    }
  };

  const data = historicalData[timeRange];
  const maxResponseTime = Math.max(...data.responseTime);
  const maxErrorRate = Math.max(...data.errorRate) * 100;

  const filteredServices = selectedService === 'all' 
    ? services 
    : [selectedService];

  return (
    <div className="performance-metrics">
      <div className="metrics-header">
        <h3>Performance Metrics</h3>
        <div className="controls">
          <div className="filter-dropdown">
            <FontAwesomeIcon icon={faFilter} />
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          <div className="filter-dropdown">
            <FontAwesomeIcon icon={faFilter} />
            <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
              <option value="all">All Services</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <button className="export-btn">
            <FontAwesomeIcon icon={faDownload} /> Export
          </button>
        </div>
      </div>

      <div className="metrics-overview">
        <h4>Performance Overview</h4>
        <div className="overview-cards">
          {filteredServices.map(service => (
            <div key={service} className="overview-card">
              <h5>{service}</h5>
              <div className="overview-metrics">
                <div className="metric">
                  <span className="metric-value">{performanceData[service].uptime}%</span>
                  <span className="metric-label">Uptime</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{performanceData[service].responseTime}ms</span>
                  <span className="metric-label">Response Time</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{performanceData[service].errorRate}%</span>
                  <span className="metric-label">Error Rate</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="metrics-charts">
        <div className="chart-container">
          <h5>Uptime (%)</h5>
          <div className="chart">
            {data.uptime.map((value, index) => (
              <div key={index} className="chart-bar-container">
                <div 
                  className="chart-bar uptime" 
                  style={{ height: `${value - 95}%` }}
                  title={`${data.labels[index]}: ${value}%`}
                ></div>
                <div className="chart-label">{data.labels[index]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h5>Response Time (ms)</h5>
          <div className="chart">
            {data.responseTime.map((value, index) => (
              <div key={index} className="chart-bar-container">
                <div 
                  className="chart-bar response-time" 
                  style={{ height: `${(value / maxResponseTime) * 100}%` }}
                  title={`${data.labels[index]}: ${value}ms`}
                ></div>
                <div className="chart-label">{data.labels[index]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h5>Error Rate (%)</h5>
          <div className="chart">
            {data.errorRate.map((value, index) => (
              <div key={index} className="chart-bar-container">
                <div 
                  className="chart-bar error-rate" 
                  style={{ height: `${(value * 100 / maxErrorRate) * 100}%` }}
                  title={`${data.labels[index]}: ${(value * 100).toFixed(2)}%`}
                ></div>
                <div className="chart-label">{data.labels[index]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="metrics-comparison">
        <h4>Service Comparison</h4>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Uptime (%)</th>
              <th>Response Time (ms)</th>
              <th>Error Rate (%)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service}>
                <td>{service}</td>
                <td>{performanceData[service].uptime}%</td>
                <td>{performanceData[service].responseTime}ms</td>
                <td>{(performanceData[service].errorRate * 100).toFixed(2)}%</td>
                <td>
                  <span className={`status-indicator ${
                    performanceData[service].uptime > 99.5 ? 'status-good' : 
                    performanceData[service].uptime > 99 ? 'status-warning' : 'status-critical'
                  }`}>
                    {performanceData[service].uptime > 99.5 ? 'Good' : 
                     performanceData[service].uptime > 99 ? 'Acceptable' : 'Needs Attention'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Close
        </button>
        <button type="button" className="export-btn">
          Export Report
        </button>
      </div>
    </div>
  );
};

export default PerformanceMetrics;