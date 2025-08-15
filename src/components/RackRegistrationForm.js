import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const API_BASE_URL = 'http://localhost:5000/api/racks';

const RackInfrastructureForm = () => {
  const [racks, setRacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataCenters, setDataCenters] = useState([]);
  const [departments, setDepartments] = useState([]); // Departments state
  const navigate = useNavigate();
    
      const handleNext = (e) => {
        e.preventDefault();
        navigate('/step7');
      };
    
      const handlePrevious = (e) => {
        e.preventDefault();
        navigate('/step5');
      };
    

  const emptyRack = {
    RackID: '',
    rackName: '',
    dataCenterID: '',
    roomZoneID: '',
    heightU: '',
    availableSpaceU: '',
    powerCapacityKW: '',
    currentPowerUsage: '',
    coolingZoneID: '',
    physicalAccess: '',
    grounded: '',
    occupiedDevices: '',
    monitoringEnabled: '',
    operationalStatus: '',
    commissionedDate: '',
    maintenanceSchedule: '',
    responsibleTeam: '',
    upstreamDependency: '',
    downstreamDependency: ''
  };

  // Fetch racks from MongoDB
  const fetchRacks = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setRacks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data centers for dropdown
  const fetchDataCenters = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/datacenters');
      const data = await response.json();
      setDataCenters(data);
    } catch (err) {
      console.error('Failed to fetch data centers:', err);
    }
  };

  useEffect(() => { 
    fetchRacks();
    fetchDataCenters();
  }, []);


  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  };

  useEffect(() => { 
    fetchRacks();
    fetchDataCenters();
    fetchDepartments(); // Fetch departments
  }, []);



  // Handle input changes
  const handleChange = (index, field, value) => {
  const updatedRacks = [...racks];
  updatedRacks[index][field] = value;
  setRacks(updatedRacks);
};

  const saveRack = async (rack) => {
  try {
    let response;
    if (rack._id) {
      response = await fetch(`${API_BASE_URL}/${rack._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rack)
      });
    } else {
      response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rack)
      });
    }

    const responseBody = await response.json();
    if (!response.ok) throw new Error(`Save failed: ${responseBody.error || responseBody.message}`);
    
    fetchRacks(); // Refresh data
    setEditingId(null);
  } catch (err) {
    setError(err.message); // Display error message
  }
};

  // Delete rack from MongoDB
  const deleteRack = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      fetchRacks();
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new empty rack
  const addRack = () => {
    setRacks([...racks, { ...emptyRack }]);
    setEditingId(racks.length);
  };

  // Filter racks by search term
  const filteredRacks = racks.filter(rack => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (rack.rackName && rack.rackName.toLowerCase().includes(searchLower)) ||
      (rack.ciID && rack.ciID.toLowerCase().includes(searchLower))
    );
  });

  if (isLoading) return <div className="loading">Loading racks...</div>;

  return (
    <div className="asset-form">
      {/* <h2 style={{ color: '#800080' }}>Rack Infrastructure Registration</h2> */}

      <div className="search-bar">
        <label>Search Racks:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by CI ID or Rack Name..."
        />
      </div>
<button className="add-new-asset-btn" onClick={addRack}>
          <i className="fas fa-plus"></i> Add New Rack
        </button>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
               <th>No</th>
              <th>RackID</th>
              <th>Rack Name</th>
              <th>Data Center</th>
              <th>Room/Zone</th>
              <th>Height (U)</th>
              <th>Available Space (U)</th>
              <th>Power Capacity (kW)</th>
              <th>Current Power Usage</th>
              <th>Cooling Zone</th>
              <th>Physical Access</th>
              <th>Grounded</th>
              <th>Occupied Devices</th>
              <th>Monitoring Enabled</th>
              <th>Operational Status</th>
              <th>Commissioned Date</th>
              <th>Maintenance Schedule</th>
              <th>Responsible Team</th>
              <th>Upstream Dependency</th>
              <th>Downstream Dependency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRacks.map((rack, index) => (
              <tr key={rack._id || index}>
               <td>
                  {index + 1}</td>
                  <td>
  {editingId === index ? (
    <input
      type="text"
      value={rack.RackID}
      onChange={(e) => handleChange(index, 'RackID', e.target.value)}
      placeholder="Rack-A01"
    />
  ) : (
    rack.RackID || '-'
  )}
</td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={rack.rackName}
                      onChange={(e) => handleChange(index, 'rackName', e.target.value)}
                      placeholder="Rack-A01"
                    />
                  ) : (
                    rack.rackName || '-'
                  )}
                </td>
           <td>
  {editingId === index ? (
    <select
      value={rack.dataCenterID}
      onChange={(e) => {
        const selectedDataCenterId = e.target.value;
        const selectedDataCenter = dataCenters.find(dc => dc._id === selectedDataCenterId);
        
        handleChange(index, 'dataCenterID', selectedDataCenterId);
        handleChange(index, 'upstreamDependency', selectedDataCenter ? selectedDataCenter.DCCode : '');
      }}
    >
      <option value="">Select Data Center</option>
      {dataCenters.map(dc => (
        <option key={dc._id} value={dc._id}>
          {dc.dataCenterName}
        </option>
      ))}
    </select>
  ) : (
    rack.dataCenterID ? rack.dataCenterID.dataCenterName : '-'
  )}
</td>

             
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={rack.roomZoneID}
                      onChange={(e) => handleChange(index, 'roomZoneID', e.target.value)}
                      placeholder="Room B, Row 3"
                    />
                  ) : (
                    rack.roomZoneID || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="number"
                      value={rack.heightU}
                      onChange={(e) => handleChange(index, 'heightU', e.target.value)}
                      placeholder="42"
                    />
                  ) : (
                    rack.heightU || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="number"
                      value={rack.availableSpaceU}
                      onChange={(e) => handleChange(index, 'availableSpaceU', e.target.value)}
                      placeholder="15"
                    />
                  ) : (
                    rack.availableSpaceU || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="number"
                      value={rack.powerCapacityKW}
                      onChange={(e) => handleChange(index, 'powerCapacityKW', e.target.value)}
                      placeholder="10.5"
                    />
                  ) : (
                    rack.powerCapacityKW || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="number"
                      value={rack.currentPowerUsage}
                      onChange={(e) => handleChange(index, 'currentPowerUsage', e.target.value)}
                      placeholder="7.2"
                    />
                  ) : (
                    rack.currentPowerUsage || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={rack.coolingZoneID}
                      onChange={(e) => handleChange(index, 'coolingZoneID', e.target.value)}
                      placeholder="CZ-02"
                    />
                  ) : (
                    rack.coolingZoneID || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={rack.physicalAccess}
                      onChange={(e) => handleChange(index, 'physicalAccess', e.target.value)}
                      placeholder="Keycard + Biometric"
                    />
                  ) : (
                    rack.physicalAccess || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <select
                      value={rack.grounded}
                      onChange={(e) => handleChange(index, 'grounded', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    rack.grounded || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <textarea
                      value={rack.occupiedDevices}
                      onChange={(e) => handleChange(index, 'occupiedDevices', e.target.value)}
                      rows="2"
                      placeholder="DEV-001, DEV-002"
                    />
                  ) : (
                    rack.occupiedDevices || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <select
                      value={rack.monitoringEnabled}
                      onChange={(e) => handleChange(index, 'monitoringEnabled', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    rack.monitoringEnabled || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <select
                      value={rack.operationalStatus}
                      onChange={(e) => handleChange(index, 'operationalStatus', e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Reserved">Reserved</option>
                    </select>
                  ) : (
                    rack.operationalStatus || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="date"
                      value={rack.commissionedDate}
                      onChange={(e) => handleChange(index, 'commissionedDate', e.target.value)}
                    />
                  ) : (
                    rack.commissionedDate ? new Date(rack.commissionedDate).toLocaleDateString() : '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={rack.maintenanceSchedule}
                      onChange={(e) => handleChange(index, 'maintenanceSchedule', e.target.value)}
                      placeholder="Quarterly"
                    />
                  ) : (
                    rack.maintenanceSchedule || '-'
                  )}
                </td>
                <td>
  {editingId === index ? (
    <select
      value={rack.responsibleTeam}
      onChange={(e) => handleChange(index, 'responsibleTeam', e.target.value)}
    >
      <option value="">Select Team</option>
      {departments.map(department => (
        <option key={department.UnitID} value={department.unitName}>
          {department.unitName}
        </option>
      ))}
    </select>
  ) : (
    rack.responsibleTeam || '-'
  )}
</td>
    <td>
  {editingId === index ? (
    <input
      type="text"
      value={rack.upstreamDependency}
      readOnly // Make it uneditable
      placeholder="Upstream Dependency"
    />
  ) : (
    rack.upstreamDependency || '-'
  )}
</td>
                <td>
                  {editingId === index ? (
                    <textarea
                      value={rack.downstreamDependency}
                      onChange={(e) => handleChange(index, 'downstreamDependency', e.target.value)}
                      rows="2"
                      placeholder="SRV-001, SW-002"
                    />
                  ) : (
                    rack.downstreamDependency || '-'
                  )}
                </td>
                <td className="action-buttons">
                  {editingId === index ? (
                    <div className="edit-actions">
                      <button 
                        onClick={() => saveRack(rack)} 
                        className="save-btn"
                        title="Save"
                      >
                        <i className="fas fa-save"></i>
                      </button>
                      <button 
                        onClick={() => {
                          if (!rack._id) {
                            setRacks(racks.filter((_, i) => i !== index));
                          }
                          setEditingId(null);
                        }} 
                        className="cancel-btn"
                        title="Cancel"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="view-actions">
                      <button 
                        onClick={() => setEditingId(index)} 
                        className="edit-btn"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm('Delete this rack?')) {
                            if (rack._id) {
                              deleteRack(rack._id);
                            } else {
                              setRacks(racks.filter((_, i) => i !== index));
                            }
                          }
                        }} 
                        className="delete-btn"
                        title="Delete"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-actions">
        
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

export default RackInfrastructureForm;