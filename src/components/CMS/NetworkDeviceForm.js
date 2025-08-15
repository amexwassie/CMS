import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000/api/network-devices';

const NetworkDeviceForm = () => {
  const [devices, setDevices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataCenters, setDataCenters] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/step8');
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    navigate('/step6');
  };

  const emptyDevice = {
    ciClass: 'Network Device',
    ciSubClass: '',
    ciID: '',
    deviceName: '',
    deviceType: '',
    vendorModel: '',
    serialNumber: '',
    operatingSystem: '',
    ipAddress: '',
    macAddress: '',
    portConfiguration: '',
    location: '',
    connectedDevices: '',
    upstreamConnection: '',
    downstreamConnection: '',
    securityZone: '',
    redundancy: '',
    powerSource: '',
    commissionedDate: '',
    firmwareLastUpdated: '',
    sla: '',
    monitoringTool: '',
    responsibleTeam: '',
    changeHistoryRef: '',
    notes: ''
  };

  // Fetch devices from MongoDB
  const fetchDevices = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setDevices(data);
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

  // Fetch departments for dropdown
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
    fetchDevices();
    fetchDataCenters();
    fetchDepartments();
  }, []);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updatedDevices = [...devices];
    updatedDevices[index][field] = value;
    setDevices(updatedDevices);
  };

  const saveDevice = async (device) => {
    try {
      let response;
      if (device._id) {
        response = await fetch(`${API_BASE_URL}/${device._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(device)
        });
      } else {
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(device)
        });
      }

      if (!response.ok) throw new Error('Failed to save device');
      
      fetchDevices();
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete device from MongoDB
  const deleteDevice = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      fetchDevices();
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new empty device
  const addDevice = () => {
    setDevices([...devices, { ...emptyDevice }]);
    setEditingId(devices.length);
  };

  // Filter devices by search term
  const filteredDevices = devices.filter(device => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (device.deviceName && device.deviceName.toLowerCase().includes(searchLower)) ||
      (device.ciID && device.ciID.toLowerCase().includes(searchLower)) ||
      (device.serialNumber && device.serialNumber.toLowerCase().includes(searchLower))
    );
  });

  if (isLoading) return <div className="loading">Loading network devices...</div>;

  return (
    <div className="asset-form">
      <div className="search-bar">
        <label>Search Devices:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by CI ID, Name, or Serial..."
        />
      </div>
      
      <button className="add-new-asset-btn" onClick={addDevice}>
        <i className="fas fa-plus"></i> Add New Device
      </button>
      
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>CI ID</th>
              <th>Device Name</th>
              <th>Sub-Class</th>
              <th>Device Type</th>
              <th>Vendor/Model</th>
              <th>Serial Number</th>
              <th>OS/Firmware</th>
              <th>IP Address</th>
              <th>MAC Address</th>
              <th>Location</th>
              <th>Security Zone</th>
              <th>Upstream</th>
              <th>Downstream</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((device, index) => (
              <tr key={device._id || index}>
                <td>{index + 1}</td>
                
                {/* CI ID */}
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={device.ciID}
                      onChange={(e) => handleChange(index, 'ciID', e.target.value)}
                      placeholder="NET-001"
                    />
                  ) : (
                    device.ciID || '-'
                  )}
                </td>
                
                {/* Device Name */}
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={device.deviceName}
                      onChange={(e) => handleChange(index, 'deviceName', e.target.value)}
                      placeholder="DC-Core-SW01"
                    />
                  ) : (
                    device.deviceName || '-'
                  )}
                </td>
                
                {/* Sub-Class */}
                <td>
                  {editingId === index ? (
                    <select
                      value={device.ciSubClass}
                      onChange={(e) => handleChange(index, 'ciSubClass', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Router">Router</option>
                      <option value="Switch">Switch</option>
                      <option value="Firewall">Firewall</option>
                      <option value="Load Balancer">Load Balancer</option>
                      <option value="Wireless Controller">Wireless Controller</option>
                    </select>
                  ) : (
                    device.ciSubClass || '-'
                  )}
                </td>
                
                {/* Device Type */}
                <td>
                  {editingId === index ? (
                    <select
                      value={device.deviceType}
                      onChange={(e) => handleChange(index, 'deviceType', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="Layer 2 Switch">Layer 2 Switch</option>
                      <option value="Layer 3 Router">Layer 3 Router</option>
                      <option value="NGFW">NGFW</option>
                      <option value="Load Balancer">Load Balancer</option>
                      <option value="WLC">Wireless Controller</option>
                    </select>
                  ) : (
                    device.deviceType || '-'
                  )}
                </td>
                
                {/* Vendor/Model */}
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={device.vendorModel}
                      onChange={(e) => handleChange(index, 'vendorModel', e.target.value)}
                      placeholder="Cisco 9300"
                    />
                  ) : (
                    device.vendorModel || '-'
                  )}
                </td>
                
                {/* Serial Number */}
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={device.serialNumber}
                      onChange={(e) => handleChange(index, 'serialNumber', e.target.value)}
                      placeholder="FOC1234Z567"
                    />
                  ) : (
                    device.serialNumber || '-'
                  )}
                </td>
                
                {/* OS/Firmware */}
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={device.operatingSystem}
                      onChange={(e) => handleChange(index, 'operatingSystem', e.target.value)}
                      placeholder="IOS XE 17.3.3"
                    />
                  ) : (
                    device.operatingSystem || '-'
                  )}
                </td>
                
                {/* IP Address */}
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={device.ipAddress}
                      onChange={(e) => handleChange(index, 'ipAddress', e.target.value)}
                      placeholder="192.168.1.1"
                    />
                  ) : (
                    device.ipAddress || '-'
                  )}
                </td>
                
                {/* MAC Address */}
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={device.macAddress}
                      onChange={(e) => handleChange(index, 'macAddress', e.target.value)}
                      placeholder="00:1A:C2:7B:00:47"
                    />
                  ) : (
                    device.macAddress || '-'
                  )}
                </td>
                
                {/* Location */}
                <td>
                  {editingId === index ? (
                    <select
                      value={device.location}
                      onChange={(e) => handleChange(index, 'location', e.target.value)}
                    >
                      <option value="">Select Data Center</option>
                      {dataCenters.map(dc => (
                        <option key={dc._id} value={dc.dataCenterName}>
                          {dc.dataCenterName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    device.location || '-'
                  )}
                </td>
                
                {/* Security Zone */}
                <td>
                  {editingId === index ? (
                    <select
                      value={device.securityZone}
                      onChange={(e) => handleChange(index, 'securityZone', e.target.value)}
                    >
                      <option value="">Select</option>
                      <option value="DMZ">DMZ</option>
                      <option value="Internal">Internal</option>
                      <option value="External">External</option>
                      <option value="Management">Management</option>
                    </select>
                  ) : (
                    device.securityZone || '-'
                  )}
                </td>
                
                {/* Upstream Connection */}
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={device.upstreamConnection}
                      onChange={(e) => handleChange(index, 'upstreamConnection', e.target.value)}
                      placeholder="Core-RTR01"
                    />
                  ) : (
                    device.upstreamConnection || '-'
                  )}
                </td>
                
                {/* Downstream Connection */}
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={device.downstreamConnection}
                      onChange={(e) => handleChange(index, 'downstreamConnection', e.target.value)}
                      placeholder="Access-SW01, SRV-002"
                    />
                  ) : (
                    device.downstreamConnection || '-'
                  )}
                </td>
                
                {/* Action Buttons */}
                <td className="action-buttons">
                  {editingId === index ? (
                    <div className="edit-actions">
                      <button 
                        onClick={() => saveDevice(device)} 
                        className="save-btn"
                        title="Save"
                      >
                        <i className="fas fa-save"></i>
                      </button>
                      <button 
                        onClick={() => {
                          if (!device._id) {
                            setDevices(devices.filter((_, i) => i !== index));
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
                          if (window.confirm('Delete this device?')) {
                            if (device._id) {
                              deleteDevice(device._id);
                            } else {
                              setDevices(devices.filter((_, i) => i !== index));
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

      {/* Collapsible Detail View */}
      {editingId !== null && devices[editingId] && (
        <div className="device-details">
          <h3>Additional Details</h3>
          
          {/* Port Configuration */}
          <div className="form-group">
            <label>Port Configuration:</label>
            <textarea
              value={devices[editingId].portConfiguration}
              onChange={(e) => handleChange(editingId, 'portConfiguration', e.target.value)}
              placeholder="Trunk/Access/VLAN assignments"
              rows="3"
            />
          </div>
          
          {/* Connected Devices */}
          <div className="form-group">
            <label>Connected Devices:</label>
            <textarea
              value={devices[editingId].connectedDevices}
              onChange={(e) => handleChange(editingId, 'connectedDevices', e.target.value)}
              placeholder="SRV-001, STRG-002"
              rows="2"
            />
          </div>
          
          {/* Redundancy */}
          <div className="form-group">
            <label>Redundancy:</label>
            <select
              value={devices[editingId].redundancy}
              onChange={(e) => handleChange(editingId, 'redundancy', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes (HA/Cluster)</option>
              <option value="No">No</option>
            </select>
          </div>
          
          {/* Power Source */}
          <div className="form-group">
            <label>Power Source:</label>
            <select
              value={devices[editingId].powerSource}
              onChange={(e) => handleChange(editingId, 'powerSource', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Main">Main</option>
              <option value="UPS">UPS</option>
              <option value="Dual-Power">Dual-Power</option>
            </select>
          </div>
          
          {/* Dates */}
          <div className="form-row">
            <div className="form-group">
              <label>Commissioned Date:</label>
              <input
                type="date"
                value={devices[editingId].commissionedDate}
                onChange={(e) => handleChange(editingId, 'commissionedDate', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Firmware Updated:</label>
              <input
                type="date"
                value={devices[editingId].firmwareLastUpdated}
                onChange={(e) => handleChange(editingId, 'firmwareLastUpdated', e.target.value)}
              />
            </div>
          </div>
          
          {/* SLA and Monitoring */}
          <div className="form-row">
            <div className="form-group">
              <label>SLA Coverage:</label>
              <input
                type="text"
                value={devices[editingId].sla}
                onChange={(e) => handleChange(editingId, 'sla', e.target.value)}
                placeholder="24/7 Gold Support"
              />
            </div>
            
            <div className="form-group">
              <label>Monitoring Tool:</label>
              <select
                value={devices[editingId].monitoringTool}
                onChange={(e) => handleChange(editingId, 'monitoringTool', e.target.value)}
              >
                <option value="">Select</option>
                <option value="SolarWinds">SolarWinds</option>
                <option value="PRTG">PRTG</option>
                <option value="Zabbix">Zabbix</option>
                <option value="Nagios">Nagios</option>
              </select>
            </div>
          </div>
          
          {/* Responsible Team */}
          <div className="form-group">
            <label>Responsible Team:</label>
            <select
              value={devices[editingId].responsibleTeam}
              onChange={(e) => handleChange(editingId, 'responsibleTeam', e.target.value)}
            >
              <option value="">Select Team</option>
              {departments.map(dept => (
                <option key={dept._id} value={dept.unitName}>
                  {dept.unitName}
                </option>
              ))}
            </select>
          </div>
          
          {/* Change History */}
          <div className="form-group">
            <label>Change History Ref:</label>
            <input
              type="text"
              value={devices[editingId].changeHistoryRef}
              onChange={(e) => handleChange(editingId, 'changeHistoryRef', e.target.value)}
              placeholder="CHG-123456"
            />
          </div>
          
          {/* Notes */}
          <div className="form-group">
            <label>Notes:</label>
            <textarea
              value={devices[editingId].notes}
              onChange={(e) => handleChange(editingId, 'notes', e.target.value)}
              placeholder="QoS policies, VPN config, special VLANs"
              rows="3"
            />
          </div>
        </div>
      )}

      <div className="form-actions">
        <div className="page-navigation">
          <button className="navigation-btn" onClick={handlePrevious}>
            Previous <i className="fas fa-chevron-left"></i>
          </button>
          <button className="navigation-btn" onClick={handleNext}>
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default NetworkDeviceForm;