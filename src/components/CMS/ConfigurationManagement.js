import React, { useState, useEffect } from 'react';
import '../style/config.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, faServer, faDesktop, 
  faCogs, faHardDrive, faTimes, faTeletype
} from '@fortawesome/free-solid-svg-icons';
import DatacenterRegistration from '../datacenter';
import RackRegistrationForm from '../RackRegistrationForm';
import TelecomInfrastructureForm from '../TelecomInfrastructureForm';
import NetworkDeviceForm from './NetworkDeviceForm';
import ServerRegistrationForm from'./ServerRegistrationForm';
const ConfigurationManagement = () => {
  const [showRackForm, setShowRackForm] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [rackCount, setRackCount] = useState(0);
  const [teleCount, setTeleCount] = useState(0);
  const [DCCount, setDCCount] = useState(0);
  const [NetCount, setNetCount] = useState(0);
  const [SerCount, setSerCount] = useState(0);

  // Fetch DC count
  useEffect(() => {
    const fetchDCCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/datacenters/count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDCCount(data.count);
      } catch (error) {
        console.error('Error fetching datacenter count:', error);
      }
    };
    
    fetchDCCount();
  }, []);

  // Fetch rack count
  useEffect(() => {
    const fetchRackCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/racks/count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRackCount(data.count);
      } catch (error) {
        console.error('Error fetching rack count:', error);
      }
    };
    
    fetchRackCount();
  }, []);

  // Fetch telecom count
  useEffect(() => {
    const fetchTeleCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/telecoms/count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTeleCount(data.count);
      } catch (error) {
        console.error('Error fetching telecom count:', error);
      }
    };
    
    fetchTeleCount();
  }, []);

  // Fetch network device count
  useEffect(() => {
    const fetchNetCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/networkdevices/count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNetCount(data.count);
      } catch (error) {
        console.error('Error fetching network device count:', error);
      }
    };
    
    fetchNetCount();
  }, []);

  
  // Fetch server device count
  useEffect(() => {
    const fetchSerCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/serverregistrations/count');
        if (!response.ok) {
          throw new Error('serverregistrations response was not ok');
        }
        const data = await response.json();
        setSerCount(data.count);
      } catch (error) {
        console.error('Error fetching serveregistrations count:', error);
      }
    };
    
    fetchSerCount();
  }, []);

  const openForm = (formName) => {
    setActiveForm(formName);
    setShowRackForm(true);
  };

  const closeForm = () => {
    setShowRackForm(false);
    setActiveForm(null);
  };

  // Refresh counts when form closes
  const handleFormClose = () => {
    closeForm();
    
    // Re-fetch all counts after form closes to get updated data
    Promise.all([
      fetch('http://localhost:5000/api/datacenters/count')
        .then(res => res.ok ? res.json() : Promise.reject('Network response was not ok'))
        .then(data => setDCCount(data.count))
        .catch(err => console.error('Error refreshing datacenter count:', err)),
      
      fetch('http://localhost:5000/api/racks/count')
        .then(res => res.ok ? res.json() : Promise.reject('Network response was not ok'))
        .then(data => setRackCount(data.count))
        .catch(err => console.error('Error refreshing rack count:', err)),
      
      fetch('http://localhost:5000/api/telecoms/count')
        .then(res => res.ok ? res.json() : Promise.reject('Network response was not ok'))
        .then(data => setTeleCount(data.count))
        .catch(err => console.error('Error refreshing telecom count:', err)),


        
      
      fetch('http://localhost:5000/api/networkdevices/count')
        .then(res => res.ok ? res.json() : Promise.reject('Network response was not ok'))
        .then(data => setNetCount(data.count))
        .catch(err => console.error('Error refreshing network device count:', err)),


      fetch('http://localhost:5000/api/serverregistrations/count')
        .then(res => res.ok ? res.json() : Promise.reject('Server response was not ok'))
        .then(data => setSerCount(data.count))
        .catch(err => console.error('Error refreshing Server device count:', err))
    ]);
  };

  return (
    <div className="asset-management">
      {/* Rack Form Modal */}
      {showRackForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                {activeForm === 'Rack' && (
                  <>
                    <FontAwesomeIcon icon={faServer} /> Rack Infrastructure Registration Form
                  </>
                )}
                {activeForm === 'Ser' && (
                  <>
                    <FontAwesomeIcon icon={faServer} /> Server Infrastructure Registration Form
                  </>
                )}

                {activeForm === 'Tele' && (
                  <>
                    <FontAwesomeIcon icon={faTeletype} /> Telecom Infrastructure Registration Form
                  </>
                )}
                {activeForm === 'DC' && (
                  <>
                    <FontAwesomeIcon icon={faServer} /> Datacenter Registration Form
                  </>
                )}
                {activeForm === 'Net' && (
                  <>
                    <FontAwesomeIcon icon={faServer} /> Network Device Registration Form
                  </>
                )}
              </h2>
              <button className="close-btn" onClick={handleFormClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="modal-body">
              {activeForm === 'Rack' && <RackRegistrationForm onClose={handleFormClose} />}
              {activeForm === 'Ser' && <ServerRegistrationForm onClose={handleFormClose} />}
              {activeForm === 'Tele' && <TelecomInfrastructureForm onClose={handleFormClose} />}
              {activeForm === 'DC' && <DatacenterRegistration onClose={handleFormClose} />}
              {activeForm === 'Net' && <NetworkDeviceForm onClose={handleFormClose} />}
            </div>
          </div>
        </div>
      )}
      
      {/* Infrastructure Section */}
      <div className="section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faServer} /> CBE Infrastructure
        </h2>
        
        <div className="config-items-grid">
          <div className="config-item">
            <div className="item-header" onClick={() => openForm('DC')}>
              <span className="count">{DCCount}</span>
              <span className="name">
                <FontAwesomeIcon icon={faHardDrive} /> Datacenter
              </span>
            </div>
            <button 
              className="create-btn"
              onClick={() => openForm('DC')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>

          <div className="config-item">
            <div className="item-header" onClick={() => openForm('Rack')}>
              <span className="count">{rackCount}</span>
              <span className="name">
                <FontAwesomeIcon icon={faHardDrive} /> Rack
              </span>
            </div>
            <button 
              className="create-btn"
              onClick={() => openForm('Rack')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header" onClick={() => openForm('Tele')}>
              <span className="count">{teleCount}</span>
              <span className="name">
                <FontAwesomeIcon icon={faTeletype} /> Service_Provider
              </span>
            </div>
            <button 
              className="create-btn"
              onClick={() => openForm('Tele')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>

          <div className="config-item">
            <div className="item-header" onClick={() => openForm('Ser')}>
              <span className="count">{SerCount}</span>
              <span className="name">
                 <FontAwesomeIcon icon={faServer} />
                Server</span>
            </div>
            <button className="create-btn"
             onClick={() => openForm('Ser')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header" onClick={() => openForm('Net')}>
              <span className="count">{NetCount}</span>
              <span className="name">Network Device</span>
            </div>
            <button 
              className="create-btn"  
              onClick={() => openForm('Net')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header">
              <span className="count">0</span>
              <span className="name">Storage System</span>
            </div>
            <button className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header">
              <span className="count">8</span>
              <span className="name">SAN Switch</span>
            </div>
            <button className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header">
              <span className="count">0</span>
              <span className="name">NAS</span>
            </div>
            <button className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          {/* <div className="divider"></div> */}
          
          <div className="config-item">
            <div className="item-header">
              <span className="count">1</span>
              <span className="name">Tape Library</span>
            </div>
            <button className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header">
              <span className="count">1</span>
              <span className="name">Power Connection</span>
            </div>
            <button className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          {/* <div className="divider"></div> */}
          
          <div className="config-item">
            <div className="item-header">
              <span className="count">2</span>
              <span className="name">Virtualization</span>
            </div>
            <button className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header">
              <span className="count">3</span>
              <span className="name">Farm</span>
            </div>
            <button className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header">
              <span className="count">3</span>
              <span className="name">Hypervisor</span>
            </div>
            <button className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header">
              <span className="count">4</span>
              <span className="name">Virtual Machine</span>
            </div>
            <button className="create-btn">
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
        </div>
      </div>
      
      {/* End User Devices Section */}
      <div className="section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faDesktop} /> End User Devices
        </h2>
        <div className="config-items-grid">
          {['PC',  'Mobile Phone', 'Tablet', 'Printer', 'Peripheral'].map((device) => (
            <div key={device} className="config-item">
              <div className="item-header">
                <span className="name">{device}</span>
              </div>
              <button className="create-btn">
                <FontAwesomeIcon icon={faPlus} /> Create
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Software and Applications Section */}
      <div className="section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faCogs} /> Software and Applications Server
        </h2>
        <div className="config-items-grid">
          {['Middleware Server', 'DB Server', 'Web Server', 'Application Server', 'OS Platform', 'Middleware Instance'].map((software) => (
            <div key={software} className="config-item">
              <div className="item-header">
                <span className="name">{software}</span>
              </div>
              <button className="create-btn">
                <FontAwesomeIcon icon={faPlus} /> Create
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigurationManagement;