import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, faTimes, faServer,  faMobileAlt,faCreditCard,faGlobe,faCheckCircle,
  faCog,  faShieldAlt,  faChartLine,  faExclamationTriangle,  faTasks, faHistory,  faExchangeAlt
} from '@fortawesome/free-solid-svg-icons';
// import { 
//   faPlus, faTimes, faServer, faDatabase, faMobileAlt,faCreditCard,faGlobe,faCheckCircle,
//   faCog, faDesktop, faShieldAlt, faNetworkWired,
//   faChartLine, faSyncAlt, faExclamationTriangle,
//   faTasks, faHistory, faUserCog, faExchangeAlt
// } from '@fortawesome/free-solid-svg-icons';
import ServiceStatus from './ServiceStatus';
import IncidentManagement from './IncidentManagement';
import PerformanceMetrics from './PerformanceMetrics';
import ServiceCatalog from './ServiceCatalog';
import '../style/ServiceDashboard.css';

const ServiceManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [operationalServices, setOperationalServices] = useState(0);
  const [degradedServices, setDegradedServices] = useState(0);
  const [outageServices, setOutageServices] = useState(0);
  const [maintenanceServices, setMaintenanceServices] = useState(0);
  const [activeIncidents, setActiveIncidents] = useState(0);
  const [resolvedIncidents, setResolvedIncidents] = useState(0);

  // Fetch counts for service management components
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://localhost:5000/api/services/operational/count'),
          fetch('http://localhost:5000/api/services/degraded/count'),
          fetch('http://localhost:5000/api/services/outage/count'),
          fetch('http://localhost:5000/api/services/maintenance/count'),
          fetch('http://localhost:5000/api/incidents/active/count'),
          fetch('http://localhost:5000/api/incidents/resolved/count')
        ]);
        
        const data = await Promise.all(responses.map(res => res.json()));
        
        setOperationalServices(data[0].count);
        setDegradedServices(data[1].count);
        setOutageServices(data[2].count);
        setMaintenanceServices(data[3].count);
        setActiveIncidents(data[4].count);
        setResolvedIncidents(data[5].count);
      } catch (error) {
        console.error('Error fetching service management counts:', error);
        // Fallback data
        setOperationalServices(6);
        setDegradedServices(1);
        setOutageServices(0);
        setMaintenanceServices(1);
        setActiveIncidents(2);
        setResolvedIncidents(15);
      }
    };
    
    fetchCounts();
  }, []);

  const openForm = (formName) => {
    setActiveForm(formName);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setActiveForm(null);
  };

  const handleFormClose = () => {
    closeForm();
  };

  return (
    <div className="service-management-dashboard">
      {/* Main Content */}
      <div className="service-management-content">
        <h2 className="page-title">
          <FontAwesomeIcon icon={faExchangeAlt} /> Service Management
        </h2>

        {/* Form Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>
                  {activeForm === 'ServiceStatus' && (
                    <>
                      <FontAwesomeIcon icon={faServer} /> Service Status
                    </>
                  )}
                  {activeForm === 'IncidentManagement' && (
                    <>
                      <FontAwesomeIcon icon={faExclamationTriangle} /> Incident Management
                    </>
                  )}
                  {activeForm === 'PerformanceMetrics' && (
                    <>
                      <FontAwesomeIcon icon={faChartLine} /> Performance Metrics
                    </>
                  )}
                  {activeForm === 'ServiceCatalog' && (
                    <>
                      <FontAwesomeIcon icon={faTasks} /> Service Catalog
                    </>
                  )}
                </h2>
                <button className="close-btn" onClick={handleFormClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-body">
                {activeForm === 'ServiceStatus' && <ServiceStatus onClose={handleFormClose} />}
                {activeForm === 'IncidentManagement' && <IncidentManagement onClose={handleFormClose} />}
                {activeForm === 'PerformanceMetrics' && <PerformanceMetrics onClose={handleFormClose} />}
                {activeForm === 'ServiceCatalog' && <ServiceCatalog onClose={handleFormClose} />}
              </div>
            </div>
          </div>
        )}

        {/* Service Status Overview */}
        <div className="section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faServer} /> Service Status Overview
          </h2>
          
          <div className="service-items-grid">
            <div className="service-item operational">
              <div className="item-header" onClick={() => openForm('ServiceStatus')}>
                <span className="count">{operationalServices}</span>
                <span className="name">
                  <FontAwesomeIcon icon={faCheckCircle} /> Operational Services
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('ServiceStatus')}
              >
                <FontAwesomeIcon icon={faPlus} /> View Details
              </button>
            </div>
            
            <div className="service-item degraded">
              <div className="item-header" onClick={() => openForm('ServiceStatus')}>
                <span className="count">{degradedServices}</span>
                <span className="name">
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Degraded Services
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('ServiceStatus')}
              >
                <FontAwesomeIcon icon={faPlus} /> View Details
              </button>
            </div>
            
            <div className="service-item outage">
              <div className="item-header" onClick={() => openForm('ServiceStatus')}>
                <span className="count">{outageServices}</span>
                <span className="name">
                  <FontAwesomeIcon icon={faTimes} /> Service Outages
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('ServiceStatus')}
              >
                <FontAwesomeIcon icon={faPlus} /> View Details
              </button>
            </div>
            
            <div className="service-item maintenance">
              <div className="item-header" onClick={() => openForm('ServiceStatus')}>
                <span className="count">{maintenanceServices}</span>
                <span className="name">
                  <FontAwesomeIcon icon={faCog} /> Maintenance Mode
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('ServiceStatus')}
              >
                <FontAwesomeIcon icon={faPlus} /> View Details
              </button>
            </div>
          </div>
        </div>
        
        {/* Mission Critical Services */}
        <div className="section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faShieldAlt} /> Mission Critical Services
          </h2>
          <div className="service-items-grid">
            {[
              // {name: 'Branch Banking', icon: faBuilding},
              {name: 'MB USSD', icon: faMobileAlt},
              // {name: 'MB Smart App', icon: faMobile},
              {name: 'CBE Birr USSD', icon: faExchangeAlt},
              // {name: 'CBE Birr Smart App', icon: faMobile},
              {name: 'Card Banking', icon: faCreditCard},
              {name: 'Internet Banking', icon: faGlobe},
              {name: 'ATM Services', icon: faCreditCard}
            ].map((service) => (
              <div key={service.name} className="service-item">
                <div className="item-header" onClick={() => openForm('ServiceStatus')}>
                  <span className="name">
                    <FontAwesomeIcon icon={service.icon} /> {service.name}
                  </span>
                </div>
                <button className="create-btn" onClick={() => openForm('ServiceStatus')}>
                  <FontAwesomeIcon icon={faPlus} /> Monitor
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Incident Management */}
        <div className="section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faExclamationTriangle} /> Incident Management
          </h2>
          <div className="service-items-grid">
            <div className="service-item">
              <div className="item-header" onClick={() => openForm('IncidentManagement')}>
                <span className="count">{activeIncidents}</span>
                <span className="name">
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Active Incidents
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('IncidentManagement')}
              >
                <FontAwesomeIcon icon={faPlus} /> View Details
              </button>
            </div>
            
            <div className="service-item">
              <div className="item-header" onClick={() => openForm('IncidentManagement')}>
                <span className="count">{resolvedIncidents}</span>
                <span className="name">
                  <FontAwesomeIcon icon={faCheckCircle} /> Resolved Incidents
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('IncidentManagement')}
              >
                <FontAwesomeIcon icon={faPlus} /> View History
              </button>
            </div>
            
            <div className="service-item">
              <div className="item-header" onClick={() => openForm('IncidentManagement')}>
                <span className="name">
                  <FontAwesomeIcon icon={faPlus} /> New Incident
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('IncidentManagement')}
              >
                <FontAwesomeIcon icon={faPlus} /> Create
              </button>
            </div>
            
            <div className="service-item">
              <div className="item-header" onClick={() => openForm('IncidentManagement')}>
                <span className="name">
                  <FontAwesomeIcon icon={faHistory} /> Incident Reports
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('IncidentManagement')}
              >
                <FontAwesomeIcon icon={faPlus} /> Generate
              </button>
            </div>
          </div>
        </div>
        
        {/* Performance & Analytics */}
        <div className="section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faChartLine} /> Performance & Analytics
          </h2>
          <div className="service-items-grid">
            {['Service Availability', 'Response Times', 'Capacity Metrics', 'Usage Statistics', 'Trend Analysis', 'SLA Compliance'].map((item) => (
              <div key={item} className="service-item">
                <div className="item-header" onClick={() => openForm('PerformanceMetrics')}>
                  <span className="name">{item}</span>
                </div>
                <button className="create-btn" onClick={() => openForm('PerformanceMetrics')}>
                  <FontAwesomeIcon icon={faPlus} /> View Reports
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Service Catalog */}
        <div className="section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faTasks} /> Service Catalog
          </h2>
          <div className="service-items-grid">
            {['Service Definitions', 'Dependencies', 'Documentation', 'SLA Management', 'Version Control', 'Retirement Planning'].map((item) => (
              <div key={item} className="service-item">
                <div className="item-header" onClick={() => openForm('ServiceCatalog')}>
                  <span className="name">{item}</span>
                </div>
                <button className="create-btn" onClick={() => openForm('ServiceCatalog')}>
                  <FontAwesomeIcon icon={faPlus} /> Manage
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;