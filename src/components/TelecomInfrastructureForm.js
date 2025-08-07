import React, { useState, useEffect } from 'react';
import './MobileBankingAssetForm.css';

const API_BASE_URL = 'http://localhost:5000/api/telecoms';

const TelecomInfrastructureForm = () => {
  const [telecoms, setTelecoms] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const emptyTelecom = {
    ciID: '',
    providerName: '',
    serviceType: '',
    bandwidth: '',
    startPoint: '',
    endPoint: '',
    ipRange: '',
    vlanID: '',
    technologyUsed: '',
    routerSwitchEndpoint: '',
    linkStatus: 'Active', // Default value
    commissionedDate: '',
    contractExpiry: '',
    supportContact: '',
    monitoringTool: '',
    slaAgreement: '',
    downstreamDependencies: '',
    upstreamDependencies: '',
    responsibleTeam: ''
  };

  // Fetch telecoms from MongoDB
  const fetchTelecoms = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setTelecoms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    fetchTelecoms();
  }, []);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updatedTelecoms = [...telecoms];
    updatedTelecoms[index][field] = value;
    setTelecoms(updatedTelecoms);
  };

  // Save telecom to MongoDB
  const saveTelecom = async (telecom) => {
    try {
      let response;

      if (telecom._id) {
        response = await fetch(`${API_BASE_URL}/${telecom._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(telecom)
        });
      } else {
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(telecom)
        });
      }

      const responseBody = await response.json();

      if (!response.ok) throw new Error(`Save failed: ${responseBody.error || responseBody.message}`);
      fetchTelecoms();
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete telecom from MongoDB
  const deleteTelecom = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      fetchTelecoms();
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new empty telecom
  const addTelecom = () => {
    setTelecoms([...telecoms, { ...emptyTelecom }]);
    setEditingId(telecoms.length);
  };

  // Filter telecoms by search term
  const filteredTelecoms = telecoms.filter(telecom => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (telecom.ciID && telecom.ciID.toLowerCase().includes(searchLower)) ||
      (telecom.serviceName && telecom.serviceName.toLowerCase().includes(searchLower))
    );
  });

  if (isLoading) return <div className="loading">Loading telecoms...</div>;

  return (
    <div className="asset-form">
      <h2 style={{ color: '#800080' }}>Telecom Infrastructure Registration</h2>

      <div className="search-bar">
        <label>Search Telecoms:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by CI ID or Service Name..."
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>CI ID</th>
              <th>Provider Name</th>
              <th>Service Type</th>
              <th>Bandwidth</th>
              <th>Start Point</th>
              <th>End Point</th>
              <th>IP Range</th>
              <th>VLAN ID</th>
              <th>Technology Used</th>
              <th>Router/Switch Endpoint</th>
              <th>Link Status</th>
              <th>Commissioned Date</th>
              <th>Contract Expiry</th>
              <th>Support Contact</th>
              <th>Monitoring Tool</th>
              <th>SLA Agreement</th>
              <th>Downstream Dependencies</th>
              <th>Upstream Dependencies</th>
              <th>Responsible Team</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTelecoms.map((telecom, index) => (
              <tr key={telecom._id || index}>
                <td>{index + 1}</td>
              
<td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.ciID}
                      onChange={(e) => handleChange(index, 'ciID', e.target.value)}
                    />
                  ) : (
                    telecom.ciID || '-'
                  )}
                </td>

                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.providerName}
                      onChange={(e) => handleChange(index, 'providerName', e.target.value)}
                    />
                  ) : (
                    telecom.providerName || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.serviceType}
                      onChange={(e) => handleChange(index, 'serviceType', e.target.value)}
                    />
                  ) : (
                    telecom.serviceType || '-'
                  )}
                </td>
                
                
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.bandwidth}
                      onChange={(e) => handleChange(index, 'bandwidth', e.target.value)}
                    />
                  ) : (
                    telecom.bandwidth || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.startPoint}
                      onChange={(e) => handleChange(index, 'startPoint', e.target.value)}
                    />
                  ) : (
                    telecom.startPoint || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.endPoint}
                      onChange={(e) => handleChange(index, 'endPoint', e.target.value)}
                    />
                  ) : (
                    telecom.endPoint || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.ipRange}
                      onChange={(e) => handleChange(index, 'ipRange', e.target.value)}
                    />
                  ) : (
                    telecom.ipRange || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.vlanID}
                      onChange={(e) => handleChange(index, 'vlanID', e.target.value)}
                    />
                  ) : (
                    telecom.vlanID || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.technologyUsed}
                      onChange={(e) => handleChange(index, 'technologyUsed', e.target.value)}
                    />
                  ) : (
                    telecom.technologyUsed || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.routerSwitchEndpoint}
                      onChange={(e) => handleChange(index, 'routerSwitchEndpoint', e.target.value)}
                    />
                  ) : (
                    telecom.routerSwitchEndpoint || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <select
                      value={telecom.linkStatus}
                      onChange={(e) => handleChange(index, 'linkStatus', e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Degraded">Degraded</option>
                    </select>
                  ) : (
                    telecom.linkStatus || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="date"
                      value={telecom.commissionedDate}
                      onChange={(e) => handleChange(index, 'commissionedDate', e.target.value)}
                    />
                  ) : (
                    telecom.commissionedDate ? new Date(telecom.commissionedDate).toLocaleDateString() : '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="date"
                      value={telecom.contractExpiry}
                      onChange={(e) => handleChange(index, 'contractExpiry', e.target.value)}
                    />
                  ) : (
                    telecom.contractExpiry ? new Date(telecom.contractExpiry).toLocaleDateString() : '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.supportContact}
                      onChange={(e) => handleChange(index, 'supportContact', e.target.value)}
                    />
                  ) : (
                    telecom.supportContact || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.monitoringTool}
                      onChange={(e) => handleChange(index, 'monitoringTool', e.target.value)}
                    />
                  ) : (
                    telecom.monitoringTool || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.slaAgreement}
                      onChange={(e) => handleChange(index, 'slaAgreement', e.target.value)}
                    />
                  ) : (
                    telecom.slaAgreement || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.downstreamDependencies}
                      onChange={(e) => handleChange(index, 'downstreamDependencies', e.target.value)}
                    />
                  ) : (
                    telecom.downstreamDependencies || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.upstreamDependencies}
                      onChange={(e) => handleChange(index, 'upstreamDependencies', e.target.value)}
                    />
                  ) : (
                    telecom.upstreamDependencies || '-'
                  )}
                </td>
                <td>
                  {editingId === index ? (
                    <input
                      type="text"
                      value={telecom.responsibleTeam}
                      onChange={(e) => handleChange(index, 'responsibleTeam', e.target.value)}
                    />
                  ) : (
                    telecom.responsibleTeam || '-'
                  )}
                </td>
                <td className="action-buttons">
                  {editingId === index ? (
                    <div className="edit-actions">
                      <button 
                        onClick={() => saveTelecom(telecom)} 
                        className="save-btn"
                        title="Save"
                      >
                        <i className="fas fa-save"></i>
                      </button>
                      <button 
                        onClick={() => {
                          if (!telecom._id) {
                            setTelecoms(telecoms.filter((_, i) => i !== index));
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
                          if (window.confirm('Delete this telecom?')) {
                            if (telecom._id) {
                              deleteTelecom(telecom._id);
                            } else {
                              setTelecoms(telecoms.filter((_, i) => i !== index));
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
        <button className="add-new-asset-btn" onClick={addTelecom}>
          <i className="fas fa-plus"></i> Add New Telecom
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TelecomInfrastructureForm;