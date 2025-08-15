import React, { useState, useEffect } from 'react';
import './ConfigurationManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus,  faServer, faDesktop, 
  faCogs, faHardDrive, faTimes,faTeletype
} from '@fortawesome/free-solid-svg-icons';
// faFilter, faFileExport,
import  DatacenterRegistration from '../datacenter';
import RackRegistrationForm from '../RackRegistrationForm';
import  TelecomInfrastructureForm from '../TelecomInfrastructureForm';
import  NetworkDeviceForm from './NetworkDeviceForm';

const ConfigurationManagement = () => {
  const [showRackForm, setShowRackForm] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [rackCount, setRackCount] = useState(0); // State for rack count
  const [teleCount, setTeleCount] = useState(0); // State for tele count
  const [DCCount, setDCCount] = useState(0); // State for dc count
  const [NetCount, setNetCount] = useState(0); // State for net count
  // const [rserverCount, setServerCount] = useState(0); // State for ser count
  // const [appCount, setAppCount] = useState(0); // State for app count


// dcCount
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
        console.error('Error fetching rack count:', error);
      }
    };
    
    fetchDCCount();
  }, []);



  // Fetch rack count on component mount
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
  






 const openForm = (formName) => {
    setActiveForm(formName);
    setShowRackForm(true);
  };

  const closeForm = () => {
    setShowRackForm(false);
    setActiveForm(null);
  };
  

  // Refresh rack count when form closes
  const handleFormClose = () => {
    closeForm();
    // Re-fetch count after form closes to get updated data
    fetch('http://localhost:5000/api/racks/count')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setRackCount(data.count))
      .catch(err => console.error('Error refreshing rack count:', err));
    


  };


// teleCount
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
        console.error('Error fetching rack count:', error);
      }
    };
    
    fetchTeleCount();
  }, []);




// teleCount
useEffect(() => {
    const fetchTeleCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/network-devices/count');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNetCount(data.count);
      } catch (error) {
        console.error('Error fetching rack count:', error);
      }
    };
    
    fetchTeleCount();
  }, []);









  return (
    <div className="configuration-management">
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

                {activeForm === 'Tele' && (
                  <>
                    <FontAwesomeIcon icon={faServer} /> Datacenter Infrastructure Registration Form
                  </>
                )}
                {activeForm === 'DC' && (
                  <>
                    <FontAwesomeIcon icon={faServer} /> Rack Infrastructure Registration Form
                  </>
                )}

                {activeForm === 'Net' && (
                  <>
                    <FontAwesomeIcon icon={faServer} /> Network Infrastructure Registration Form
                  </>
                )}

              </h2>
              <button className="close-btn" onClick={handleFormClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>


            <div className="modal-body">
              {activeForm === 'Rack' && <RackRegistrationForm onClose={handleFormClose} />}
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
        <div className="items-grid">


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
            <div className="item-header"  onClick={() => openForm('Rack')}>
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
          
          {/* Other infrastructure items */}
          <div className="config-item">
            <div className="item-header" onClick={() => openForm('Tele')}>
              <span className="count">{teleCount}</span>
            <span className="name"  >
                <FontAwesomeIcon icon={faTeletype} /> Service_Provider
              
              </span>
                       
            </div>
             <button 
              className="create-btn"
              onClick={() => openForm('Net')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          


          <div className="config-item">
            <div className="item-header" onClick={() => openForm('Net')}>
              <span className="count">{teleCount}</span>
              <span className="name">Server</span>
            </div>
            <button className="create-btn"  onClick={() => openForm('Net')}>
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header" onClick={() => openForm('Net')}>
             <span className="count">{NetCount}</span>
              <span className="name">Network Device</span>
            </div>
            <button className="create-btn"  onClick={() => openForm('Net')}>
              
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
          
          <div className="divider" />
          
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
          
          <div className="divider" />
          
          <div className="config-item">
            <div className="item-header">
              <span className="count">2</span>
              <span className="name">Virtualization</span>
            </div>
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
        <div className="items-grid">
          {['PC', 'Phone', 'IP Phone', 'Mobile Phone', 'Tablet', 'Printer', 'Peripheral'].map((device) => (
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
          <FontAwesomeIcon icon={faCogs} /> Software and Applications
        </h2>
        <div className="items-grid">
          {['Middleware', 'DB Server', 'Web Server', 'PC Software', 'Other Software', 'Middleware Instance'].map((software) => (
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