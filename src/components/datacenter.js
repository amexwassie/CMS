import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileBankingAssetForm.css';

const API_BASE_URL = 'http://localhost:5000/api/datacenters';

const DataCenterRegistrationForm = () => {
  const [dataCenters, setDataCenters] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const navigate = useNavigate();
  
    const handleNext = (e) => {
      e.preventDefault();
      navigate('/step6');
    };
  
    const handlePrevious = (e) => {
      e.preventDefault();
      navigate('/step4');
    };
  

  const emptyDataCenter = {
  DCCode: '', // Ensure this is included
  dataCenterName: '',
  location: '',
  rackCapacity: '',
  currentRackCount: '',
  powerSource: '',
  coolingType: '',
  fireSuppression: '',
  accessControl: '',
  tierLevel: '',
  ownershipType: '',
  operationalSince: '',
  maintenanceSchedule: '',
  responsibleTeam: '',
  upstreamDependency: '',
  downstreamDependency: ''
};
  // Fetch data centers from MongoDB
  const fetchDataCenters = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setDataCenters(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchDataCenters(); }, []);

  // Handle input changes
  const handleChange = (index, field, value) => {
  const updatedDataCenters = [...dataCenters];
  updatedDataCenters[index][field] = value;
  setDataCenters(updatedDataCenters);
};

  // Save data center to MongoDB
 const saveDataCenter = async (dataCenter) => {
  try {
    let response;
    if (dataCenter._id) {
      response = await fetch(`${API_BASE_URL}/${dataCenter._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataCenter)
      });
    } else {
      response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataCenter)
      });
    }

    const responseBody = await response.json();
    if (!response.ok) throw new Error(`Save failed: ${responseBody.error || responseBody.message}`);
    fetchDataCenters(); // Refresh data
    setEditingId(null);
  } catch (err) {
    setError(err.message); // Display error message
  }
};
  // Delete data center from MongoDB
  const deleteDataCenter = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      fetchDataCenters(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new empty data center
  const addDataCenter = () => {
    setDataCenters([...dataCenters, { ...emptyDataCenter }]);
    setEditingId(dataCenters.length);
  };

  // Filter data centers by search term
  const filteredDataCenters = dataCenters.filter(dc => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (dc.dataCenterName && dc.dataCenterName.toLowerCase().includes(searchLower)) ||
      (dc.location && dc.location.toLowerCase().includes(searchLower)) 
      
    );
  });

  if (isLoading) return <div className="loading">Loading data centers...</div>;

  return (
    <div className="asset-form">
      <h2 style={{ color: '#800080' }}>Data Center Registration</h2>

      <div className="search-bar">
        <label>Search Data Centers:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or location..."
        />
      </div>

      <table>
        <thead>
          <tr>   
            <th>No</th>
            <th>DCCode</th>
            <th>Data Center Name</th>
            <th>Location</th>
            <th>Rack Capacity</th>
            <th>Current Rack Count</th>
            <th>Power Source</th>
            <th>Cooling Type</th>
            <th>Fire Suppression</th>
            <th>Access Control</th>
            <th>Tier Level</th>
            <th>Operational Since</th>
            <th>Maintenance Schedule</th>
            <th>Responsible Team</th>
            <th>Upstream Dependency</th>
            <th>Downstream Dependency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDataCenters.map((dataCenter, index) => (
            <tr key={dataCenter._id || index}>
              <td>
                  {index + 1}</td>
                  <td>
                {editingId === index ? (
                  <input
                    type="text"
                    value={dataCenter.DCCode}
                    onChange={(e) => handleChange(index, 'DCCode', e.target.value)}
                    placeholder="Enter Data Center Name"
                  />
                ) : (
                  dataCenter.DCCode || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <input
                    type="text"
                    value={dataCenter.dataCenterName}
                    onChange={(e) => handleChange(index, 'dataCenterName', e.target.value)}
                    placeholder="Enter Data Center Name"
                  />
                ) : (
                  dataCenter.dataCenterName || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <input
                    type="text"
                    value={dataCenter.location}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    placeholder="Enter Location"
                  />
                ) : (
                  dataCenter.location || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <input
                    type="number"
                    value={dataCenter.rackCapacity}
                    onChange={(e) => handleChange(index, 'rackCapacity', e.target.value)}
                    placeholder="Enter Rack Capacity"
                  />
                ) : (
                  dataCenter.rackCapacity || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <input
                    type="number"
                    value={dataCenter.currentRackCount}
                    onChange={(e) => handleChange(index, 'currentRackCount', e.target.value)}
                    placeholder="Enter Current Rack Count"
                  />
                ) : (
                  dataCenter.currentRackCount || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <select
                    multiple
                    value={dataCenter.powerSource.split(',')}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                      handleChange(index, 'powerSource', selectedOptions.join(','));
                    }}
                  >
                    <option value="UPS">UPS</option>
                    <option value="Generator">Generator</option>
                    <option value="Dual Feed">Dual Feed</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                  </select>
                ) : (
                  dataCenter.powerSource || '-'
                )}
              </td>
    
              <td>
                {editingId === index ? (
                  <select
                    multiple
                    value={dataCenter.coolingType.split(',')}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                      handleChange(index, 'coolingType', selectedOptions.join(','));
                    }}
                 >
                    <option value="HVAC">HVAC</option>
                    <option value="water-based">water-based</option>
                    <option value="air-cooled systems">air-cooled systems</option>
                    <option value="other">othery</option>
                  </select>
                ) : (
                  dataCenter.coolingType || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                   <select
                    multiple
                    value={dataCenter.fireSuppression.split(',')}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                      handleChange(index, 'fireSuppression', selectedOptions.join(','));
                    }}
                 >
                    <option value="CO2">CO2</option>
                    <option value="FM-200 ">FM-200 </option>
                    <option value="Water Mist">Water Mist</option>
                    <option value="None">None</option>
                  </select>
                ) : (
                  dataCenter.fireSuppression || '-'
                )}
              </td>
        
              <td>
                {editingId === index ? (
                  <select
                    multiple
                    value={dataCenter.accessControl.split(',')}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                      handleChange(index, 'accessControl', selectedOptions.join(','));
                    }}
                 >
                    <option value="Biometric">Biometric</option>
                    <option value="RFID ">RFID </option>
                    <option value="Security ID">Security ID</option>
                    <option value="None">CCTV coverage</option>
                  </select>
                ) : (
                  dataCenter.accessControl || '-'
                )}
              </td>
          
              <td>
                {editingId === index ? (
                    <select
                    multiple
                    value={dataCenter.tierLevel.split(',')}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                      handleChange(index, 'tierLevel', selectedOptions.join(','));
                    }}
                 >
                    <option value="Tier I">Tier I</option>
                    <option value="Tier II ">Tier II </option>
                    <option value="Tier III">Tier III</option>
                    <option value="Tier IV">Tier IV</option>
                  </select>
                ) : (
                  dataCenter.tierLevel || '-'
                )}
              </td>
               <td>
                  {editingId === index ? (
                    <input
                      type="date"
                      value={dataCenter.operationalSince}
                      onChange={(e) => handleChange(index, 'operationalSince', e.target.value)}
                    />
                  ) : (
                    dataCenter.operationalSince ? new Date(dataCenter.operationalSince).toLocaleDateString() : '-'
                  )}
                </td>

             
              <td>
                {editingId === index ? (
                  <input
                    type="text"
                    value={dataCenter.maintenanceSchedule}
                    onChange={(e) => handleChange(index, 'maintenanceSchedule', e.target.value)}
                    placeholder="Enter Maintenance Schedule"
                  />
                ) : (
                  dataCenter.maintenanceSchedule || '-'
                )}
              </td>
         
              <td>
                {editingId === index ? (
                   <select
                    multiple
                    value={dataCenter.responsibleTeam.split(',')}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                      handleChange(index, 'responsibleTeam', selectedOptions.join(','));
                    }}
                 >
                    <option value=" Facilities"> Facilities</option>
                    <option value="Infrastructure">Infrastructure </option>
                    <option value=" IS Operations">IS Operations</option>
                    <option value="other">other</option>
                  </select>
                ) : (
                  dataCenter.responsibleTeam || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <input
                    type="text"
                    value={dataCenter.upstreamDependency}
                    onChange={(e) => handleChange(index, 'upstreamDependency', e.target.value)}
                    placeholder="Enter Upstream Dependency"
                  />
                ) : (
                  dataCenter.upstreamDependency || '-'
                )}
              </td>
         
              <td>
                {editingId === index ? (
                  <select
                    multiple
                    value={dataCenter.downstreamDependency.split(',')}
                    onChange={(e) => {
                      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                      handleChange(index, 'downstreamDependency', selectedOptions.join(','));
                    }}
                 >
                    <option value=" Racks"> Racks</option>
                    <option value="Network Devices">Network Devices </option>
                    <option value=" Compute">Compute</option>
                    <option value="Storage">Storage</option>
                    <option value=" Applications">Applications</option>
                    <option value="other">other</option>
                  </select>
                ) : (
                  dataCenter.downstreamDependency || '-'
                )}
              </td>
              <td className="action-buttons">
                {editingId === index ? (
                  <>
                    <button onClick={() => saveDataCenter(dataCenter)} className="save-btn">
                      <i className="fas fa-save"></i>
                    </button>
                    <button onClick={() => {
                      if (!dataCenter._id) {
                        setDataCenters(dataCenters.filter((_, i) => i !== index));
                      }
                      setEditingId(null);
                    }} className="cancel-btn">
                      <i className="fas fa-times"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditingId(index)} className="edit-btn">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => {
                      if (window.confirm('Delete this data center?')) {
                        if (dataCenter._id) {
                          deleteDataCenter(dataCenter._id);
                        } else {
                          setDataCenters(dataCenters.filter((_, i) => i !== index));
                        }
                      }
                    }} className="delete-btn">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-actions">
        <button className="add-new-asset-btn" onClick={addDataCenter}>
          <i className="fas fa-plus"></i> Add New Data Center Information
        </button>
    

         <div className="page-navigation">
          <button 
            className="navigation-btn" 
            onClick={handlePrevious}
          >
            Previous <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="navigation-btn" 
            onClick={handleNext}
          >
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default DataCenterRegistrationForm;