import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faMobileAlt,
  faMobile,
  faExchangeAlt,
  faCreditCard,
  faGlobe,
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faCog,
  faSearch,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import '../style/ServiceDashboard.css';

const ServiceStatus = ({ onClose }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [services] = useState([
    {
      id: 1,
      name: 'Branch Banking',
      icon: faBuilding,
      status: 'operational',
      uptime: '99.95%',
      responseTime: '120ms',
      lastIncident: '2023-06-15',
      description: 'In-branch banking services and transactions'
    },
    {
      id: 2,
      name: 'MB USSD',
      icon: faMobileAlt,
      status: 'degraded',
      uptime: '99.2%',
      responseTime: '280ms',
      lastIncident: '2023-06-18',
      description: 'Mobile banking via USSD *811#'
    },
    {
      id: 3,
      name: 'MB Smart App',
      icon: faMobile,
      status: 'operational',
      uptime: '99.8%',
      responseTime: '150ms',
      lastIncident: '2023-06-10',
      description: 'Mobile banking application for smartphones'
    },
    {
      id: 4,
      name: 'CBE Birr USSD',
      icon: faExchangeAlt,
      status: 'operational',
      uptime: '99.9%',
      responseTime: '110ms',
      lastIncident: '2023-06-05',
      description: 'CBE Birr mobile money via USSD'
    },
    {
      id: 5,
      name: 'CBE Birr Smart App',
      icon: faMobile,
      status: 'maintenance',
      uptime: '99.7%',
      responseTime: '190ms',
      lastIncident: '2023-06-20',
      description: 'CBE Birr mobile money application'
    },
    {
      id: 6,
      name: 'Card Banking',
      icon: faCreditCard,
      status: 'operational',
      uptime: '99.98%',
      responseTime: '90ms',
      lastIncident: '2023-05-28',
      description: 'Debit and credit card transactions'
    },
    {
      id: 7,
      name: 'Internet Banking',
      icon: faGlobe,
      status: 'operational',
      uptime: '99.85%',
      responseTime: '140ms',
      lastIncident: '2023-06-12',
      description: 'Online banking through web portal'
    },
    {
      id: 8,
      name: 'ATM Services',
      icon: faCreditCard,
      status: 'degraded',
      uptime: '99.3%',
      responseTime: '220ms',
      lastIncident: '2023-06-19',
      description: 'Automated Teller Machine network'
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return faCheckCircle;
      case 'degraded': return faExclamationTriangle;
      case 'outage': return faTimesCircle;
      case 'maintenance': return faCog;
      default: return faCheckCircle;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'operational': return 'status-operational';
      case 'degraded': return 'status-degraded';
      case 'outage': return 'status-outage';
      case 'maintenance': return 'status-maintenance';
      default: return 'status-operational';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational': return 'Operational';
      case 'degraded': return 'Degraded Performance';
      case 'outage': return 'Service Outage';
      case 'maintenance': return 'Under Maintenance';
      default: return 'Operational';
    }
  };

  const filteredServices = services.filter(service => {
    const matchesFilter = filter === 'all' || service.status === filter;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="service-status">
      <div className="service-header">
        <h3>Service Status Overview</h3>
        <div className="controls">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <FontAwesomeIcon icon={faFilter} />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Services</option>
              <option value="operational">Operational</option>
              <option value="degraded">Degraded</option>
              <option value="outage">Outage</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      <div className="services-list">
        {filteredServices.map(service => (
          <div key={service.id} className="service-detail-card">
            <div className="service-main-info">
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <div className="service-details">
                <h4>{service.name}</h4>
                <p>{service.description}</p>
              </div>
              <div className={`service-status-indicator ${getStatusClass(service.status)}`}>
                <FontAwesomeIcon icon={getStatusIcon(service.status)} />
                <span>{getStatusText(service.status)}</span>
              </div>
            </div>
            
            <div className="service-metrics-detail">
              <div className="metric">
                <span className="metric-label">Uptime</span>
                <span className="metric-value">{service.uptime}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Response Time</span>
                <span className="metric-value">{service.responseTime}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Last Incident</span>
                <span className="metric-value">{service.lastIncident}</span>
              </div>
            </div>
            
            <div className="service-actions">
              <button className="view-history-btn">View History</button>
              <button className="test-service-btn">Test Service</button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="no-results">
          <p>No services found matching your criteria.</p>
        </div>
      )}

      <div className="service-summary">
        <h4>Service Status Summary</h4>
        <div className="summary-stats-detailed">
          <div className="summary-stat">
            <span className="stat-count">
              {services.filter(s => s.status === 'operational').length}
            </span>
            <span className="stat-label">Operational</span>
          </div>
          <div className="summary-stat">
            <span className="stat-count">
              {services.filter(s => s.status === 'degraded').length}
            </span>
            <span className="stat-label">Degraded</span>
          </div>
          <div className="summary-stat">
            <span className="stat-count">
              {services.filter(s => s.status === 'outage').length}
            </span>
            <span className="stat-label">Outage</span>
          </div>
          <div className="summary-stat">
            <span className="stat-count">
              {services.filter(s => s.status === 'maintenance').length}
            </span>
            <span className="stat-label">Maintenance</span>
          </div>
        </div>
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

export default ServiceStatus;