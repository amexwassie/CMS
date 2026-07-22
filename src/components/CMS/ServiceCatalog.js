import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faFilter,
  faEdit,
  // faTrash,
  faInfoCircle,
  // faLink,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import '../style/ServiceDashboard.css';

const ServiceCatalog = ({ onClose }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('services');

  const [services] = useState([
    {
      id: 1,
      name: 'Branch Banking',
      category: 'Core Banking',
      description: 'In-branch banking services and transactions',
      owner: 'Retail Banking Division',
      sla: '99.9% uptime',
      dependencies: ['Core Banking System', 'Database Services'],
      status: 'active',
      version: '2.3.1'
    },
    {
      id: 2,
      name: 'MB USSD',
      category: 'Digital Banking',
      description: 'Mobile banking via USSD *811#',
      owner: 'Digital Solutions Team',
      sla: '99.5% uptime',
      dependencies: ['USSD Gateway', 'Core Banking System'],
      status: 'active',
      version: '1.5.2'
    },
    {
      id: 3,
      name: 'MB Smart App',
      category: 'Digital Banking',
      description: 'Mobile banking application for smartphones',
      owner: 'Digital Solutions Team',
      sla: '99.7% uptime',
      dependencies: ['API Gateway', 'Core Banking System', 'Push Notification Service'],
      status: 'active',
      version: '3.2.0'
    },
    {
      id: 4,
      name: 'CBE Birr USSD',
      category: 'Mobile Money',
      description: 'CBE Birr mobile money via USSD',
      owner: 'Mobile Money Division',
      sla: '99.6% uptime',
      dependencies: ['USSD Gateway', 'Mobile Money Platform'],
      status: 'active',
      version: '2.1.3'
    },
    {
      id: 5,
      name: 'CBE Birr Smart App',
      category: 'Mobile Money',
      description: 'CBE Birr mobile money application',
      owner: 'Mobile Money Division',
      sla: '99.5% uptime',
      dependencies: ['API Gateway', 'Mobile Money Platform'],
      status: 'active',
      version: '2.0.4'
    },
    {
      id: 6,
      name: 'Card Banking',
      category: 'Payment Services',
      description: 'Debit and credit card transactions',
      owner: 'Card Services Division',
      sla: '99.95% uptime',
      dependencies: ['Payment Switch', 'Core Banking System'],
      status: 'active',
      version: '4.1.0'
    },
    {
      id: 7,
      name: 'Internet Banking',
      category: 'Digital Banking',
      description: 'Online banking through web portal',
      owner: 'Digital Solutions Team',
      sla: '99.8% uptime',
      dependencies: ['Web Server', 'API Gateway', 'Core Banking System'],
      status: 'active',
      version: '5.2.1'
    },
    {
      id: 8,
      name: 'ATM Services',
      category: 'Payment Services',
      description: 'Automated Teller Machine network',
      owner: 'Card Services Division',
      sla: '99.3% uptime',
      dependencies: ['ATM Switch', 'Core Banking System'],
      status: 'active',
      version: '3.5.2'
    }
  ]);

  const [dependencies] = useState([
    {
      id: 1,
      name: 'Core Banking System',
      description: 'Central banking transaction processing system',
      owner: 'IT Infrastructure Team',
      status: 'active'
    },
    {
      id: 2,
      name: 'Database Services',
      description: 'Central database management system',
      owner: 'Database Administration Team',
      status: 'active'
    },
    {
      id: 3,
      name: 'USSD Gateway',
      description: 'USSD communication platform',
      owner: 'Telecom Services Team',
      status: 'active'
    },
    {
      id: 4,
      name: 'API Gateway',
      description: 'API management and security layer',
      owner: 'Integration Team',
      status: 'active'
    },
    {
      id: 5,
      name: 'Mobile Money Platform',
      description: 'Mobile money transaction processing',
      owner: 'Mobile Money Division',
      status: 'active'
    },
    {
      id: 6,
      name: 'Payment Switch',
      description: 'Payment transaction routing system',
      owner: 'Card Services Division',
      status: 'active'
    },
    {
      id: 7,
      name: 'Web Server',
      description: 'Web application hosting platform',
      owner: 'Web Services Team',
      status: 'active'
    },
    {
      id: 8,
      name: 'ATM Switch',
      description: 'ATM transaction processing system',
      owner: 'Card Services Division',
      status: 'active'
    }
  ]);

  const filteredServices = services.filter(service => {
    const matchesFilter = filter === 'all' || service.category === filter;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredDependencies = dependencies.filter(dependency => {
    const matchesSearch = dependency.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dependency.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const categories = [...new Set(services.map(service => service.category))];

  return (
    <div className="service-catalog">
      <div className="catalog-header">
        <h3>Service Catalog</h3>
        <div className="controls">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <FontAwesomeIcon icon={faFilter} />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <button className="new-item-btn">
            <FontAwesomeIcon icon={faPlus} /> New Service
          </button>
        </div>
      </div>

      <div className="catalog-tabs">
        <button 
          className={activeTab === 'services' ? 'tab-active' : ''}
          onClick={() => setActiveTab('services')}
        >
          Services ({services.length})
        </button>
        <button 
          className={activeTab === 'dependencies' ? 'tab-active' : ''}
          onClick={() => setActiveTab('dependencies')}
        >
          Dependencies ({dependencies.length})
        </button>
        <button 
          className={activeTab === 'sla' ? 'tab-active' : ''}
          onClick={() => setActiveTab('sla')}
        >
          SLA Management
        </button>
      </div>

      {activeTab === 'services' && (
        <div className="catalog-list">
          {filteredServices.map(service => (
            <div key={service.id} className="catalog-item">
              <div className="item-main-info">
                <div className="item-name">{service.name}</div>
                <div className="item-category">{service.category}</div>
                <div className="item-version">v{service.version}</div>
                <div className={`item-status ${service.status}`}>
                  {service.status}
                </div>
              </div>
              
              <div className="item-description">
                <p>{service.description}</p>
              </div>
              
              <div className="item-details">
                <div className="detail">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Owner: {service.owner}</span>
                </div>
                <div className="detail">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>SLA: {service.sla}</span>
                </div>
              </div>
              
              <div className="item-dependencies">
                <h5>Dependencies:</h5>
                <div className="dependencies-list">
                  {service.dependencies.map((dep, index) => (
                    <span key={index} className="dependency-tag">{dep}</span>
                  ))}
                </div>
              </div>
              
              <div className="item-actions">
                <button className="edit-btn">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="view-details-btn">
                  <FontAwesomeIcon icon={faInfoCircle} /> Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'dependencies' && (
        <div className="catalog-list">
          {filteredDependencies.map(dependency => (
            <div key={dependency.id} className="catalog-item">
              <div className="item-main-info">
                <div className="item-name">{dependency.name}</div>
                <div className={`item-status ${dependency.status}`}>
                  {dependency.status}
                </div>
              </div>
              
              <div className="item-description">
                <p>{dependency.description}</p>
              </div>
              
              <div className="item-details">
                <div className="detail">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Owner: {dependency.owner}</span>
                </div>
              </div>
              
              <div className="item-usage">
                <h5>Used by:</h5>
                <div className="usage-list">
                  {services
                    .filter(service => service.dependencies.includes(dependency.name))
                    .map(service => (
                      <span key={service.id} className="usage-tag">{service.name}</span>
                    ))
                  }
                </div>
              </div>
              
              <div className="item-actions">
                <button className="edit-btn">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'sla' && (
        <div className="sla-management">
          <h4>Service Level Agreement Management</h4>
          <div className="sla-table">
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Category</th>
                  <th>SLA Target</th>
                  <th>Current Performance</th>
                  <th>Compliance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map(service => {
                  const target = parseFloat(service.sla);
                  const performance = target - (Math.random() * 0.5); // Random performance for demo
                  const compliance = performance >= target ? 'Met' : 'Not Met';
                  
                  return (
                    <tr key={service.id}>
                      <td>{service.name}</td>
                      <td>{service.category}</td>
                      <td>{service.sla}</td>
                      <td>{performance.toFixed(2)}%</td>
                      <td>
                        <span className={`compliance-status ${compliance.toLowerCase().replace(' ', '-')}`}>
                          {compliance}
                        </span>
                      </td>
                      <td>
                        <button className="sla-edit-btn">
                          <FontAwesomeIcon icon={faEdit} /> Edit SLA
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(activeTab === 'services' && filteredServices.length === 0) |
       (activeTab === 'dependencies' && filteredDependencies.length === 0) && (
        <div className="no-results">
          <p>No items found matching your criteria.</p>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Close
        </button>
        <button type="button" className="export-btn">
          Export Catalog
        </button>
      </div>
    </div>
  );
};

export default ServiceCatalog;