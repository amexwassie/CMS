import React, { useState, useEffect } from 'react';
import './MobileBankingAssetForm.css';

const API_BASE_URL = 'http://localhost:5000/api/assets';

const MobileBankingAssetForm = () => {
  const [assets, setAssets] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const emptyAsset = {
    service: '', name: '', number: '', owner: '', mode: '', 
    site: '', type: '', model: '', dependence: '', criticality: '',
    value: '', license: '', availability: '', description: ''
  };

  // Fetch assets from MongoDB
  const fetchAssets = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setAssets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchAssets(); }, []);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updatedAssets = [...assets];
    updatedAssets[index][field] = value;
    setAssets(updatedAssets);
  };

  // Save asset to MongoDB
  const saveAsset = async (asset) => {
    try {
      let response;
      if (asset._id) {
        // Update existing asset
        response = await fetch(`${API_BASE_URL}/${asset._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(asset)
        });
      } else {
        // Create new asset
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(asset)
        });
      }
      
      if (!response.ok) throw new Error('Save failed');
      fetchAssets(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete asset from MongoDB
  const deleteAsset = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      fetchAssets(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new empty asset
  const addAsset = () => {
    setAssets([...assets, { ...emptyAsset }]);
    setEditingId(assets.length); // Set to edit mode for the new asset
  };

  // Filter assets by service name
  const filteredAssets = assets.filter(asset => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    return (
      (asset.service && asset.service.toLowerCase().includes(searchLower)) ||
      (asset.name && asset.name.toLowerCase().includes(searchLower)) ||
      (asset.number && asset.number.toString().includes(searchTerm)) ||
      (asset.owner && asset.owner.toLowerCase().includes(searchLower)) ||
      (asset.mode && asset.mode.toLowerCase().includes(searchLower)) ||
      (asset.site && asset.site.toLowerCase().includes(searchLower)) ||
      (asset.type && asset.type.toLowerCase().includes(searchLower)) ||
      (asset.model && asset.model.toLowerCase().includes(searchLower)) ||
      (asset.dependence && asset.dependence.toLowerCase().includes(searchLower)) ||
      (asset.criticality && asset.criticality.toLowerCase().includes(searchLower)) ||
      (asset.value && asset.value.toLowerCase().includes(searchLower)) ||
      (asset.license && asset.license.toLowerCase().includes(searchLower)) ||
      (asset.availability && asset.availability.toLowerCase().includes(searchLower)) ||
      (asset.description && asset.description.toLowerCase().includes(searchLower))
    );
  });

  if (isLoading) return <div>Loading assets...</div>;

  return (
    <div className="asset-form">
      
      <h2 style={{ color: '#800080' }}>Mobile Banking Asset Management</h2> {/* Purple title */}

      <div className="search-bar">
        <label>Search All Fields:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search across all fields..."
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Service</th>
            <th>Asset Name</th>
            <th>Number</th>
            <th>Owner</th>
            <th>Mode</th>
            <th>Site</th>
            <th>Type</th>
            <th>Model</th>
            <th>Dependence</th>
            <th>Criticality</th>
            <th>Value</th>
            <th>License</th>
            <th>Availability</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset, index) => (
            <tr key={asset._id || index}>
              <td>{index + 1}</td>
              <td>
                {editingId === index ? (
                  <select
                    value={asset.service}
                    onChange={(e) => handleChange(index, 'service', e.target.value)}
                  >
                  <option value="">Select Service Name</option>
                  <option value="Branch">Branch</option>
                  <option value="MB USSD">MB USSD</option>
                  <option value="MB Smart App">MB Smart App</option>
                  <option value="Switch">CBE Birr USSD</option>
                  <option value="DCAM">CBE Birr Smart App</option>
                  <option value="ISS">ATM/POS</option>
                  <option value="DB">Swift</option>
                  <option value="Network">IB</option>
                  <option value="IIB">IIB</option>
                  <option value="Other">Other</option>
                  </select>
                ) : (
                  asset.service || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <select
                    value={asset.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                  >
                    <option value="">Select Asset/Component Name</option>
                  <option value="ussd Gateway">USSD Gateway</option>
                  <option value="External Firewall">External Firewall</option>
                  <option value="Internal Firewall">Internal Firewall</option>
                  <option value="dns Server">DNS Server</option>
                  <option value="T24 App Server">T24 App Server</option>
                  <option value="T24 DB (Exadata)">T24 DB (Exadata)</option>
                  <option value="IHS">IHS</option>
                  <option value="nfs server">NFS Server</option>
                  <option value="WAs">WAS</option>
                  <option value="Mq server">MQ Server</option>
                  <option value="SDC">SDC</option>
                  <option value="Other">Other</option>
                  </select>
                ) : (
                  asset.name || '-'
                )}
              </td>
              {/* Render other fields similarly */}
              <td>
                {editingId === index ? (
                  <input
                    type="number"
                    value={asset.number}
                    onChange={(e) => handleChange(index, 'number', e.target.value)}
                  />
                ) : (
                  asset.number || '-'
                )}
              </td>
          
            <td>
                {editingId === index ? (
                  <select
                    value={asset.owner}
                    onChange={(e) => handleChange(index, 'owner', e.target.value)}
                  >
                   <option value="">Select Owner</option>
                  <option value="Core Banking">Core Banking</option>
                  <option value="Web">Web</option>
                  <option value="Server">Server</option>
                  <option value="Switch">Switch</option>
                  <option value="DCAM">DCAM</option>
                  <option value="ISS">ISS</option>
                  <option value="DB">DB</option>
                  <option value="Network">Network</option>
                  <option value="IIB">IIB</option>
                  <option value="Swift">Swift</option>
                  <option value="SDC">SDC</option>
                  <option value="Other">Other</option>
                  </select>
                ) : (
                  asset.owner || '-'
                )}
              </td>


 <td>
                {editingId === index ? (
                  <select
                    value={asset.mode}
                    onChange={(e) => handleChange(index, 'mode', e.target.value)}
                  >
                   <option value="">Select Operational Mode</option>
                  <option value="Active-Active">Active-Active</option>
                  <option value="Active-Standby">Active-Standby</option>
                  </select>
                ) : (
                  asset.mode || '-'
                )}
              </td> <td>
                {editingId === index ? (
                  <select
                    value={asset.site}
                    onChange={(e) => handleChange(index, 'site', e.target.value)}
                  >
                   <option value="">Select Site</option>
                  <option value="AA">AA</option>
                  <option value="Kera">Kera</option>
                  <option value="Both">Both</option>
                  </select>
                ) : (
                  asset.site || '-'
                )}
              </td> <td>
                {editingId === index ? (
                  <select
                    value={asset.type}
                    onChange={(e) => handleChange(index, 'type', e.target.value)}
                  >
                  <option value="">Select Component Type</option>
                  <option value="Hardware Appliance">Hardware Appliance</option>
                  <option value="System Software">System Software</option>
                  <option value="Application Software">Application Software</option>
                  <option value="Virtual Appliance">Virtual Appliance</option>
                  <option value="Database">Database</option>
                  <option value="Hardware/Database">Hardware/Database</option>
                  <option value="Agent">Agent</option>
                  <option value="Other">Other</option>
                  </select>
                ) : (
                  asset.type || '-'
                )}
              </td>

               <td>
                {editingId === index ? (
                 <textarea
                  value={asset.model}
                    onChange={(e) => handleChange(index, 'model', e.target.value)}
                  
                  
                  rows="2"
                  placeholder="please enter current Asset model/version..."
                />
                ) : (
                  asset.model || '-'
                )}
              </td> 
              <td>
                {editingId === index ? (
                  

                <textarea
                  value={asset.dependence}
                    onChange={(e) => handleChange(index, 'dependence', e.target.value)}
                  
                  
                  rows="2"
                  placeholder="please enter current  dependence of this component..."
                />
                ) : (
                  asset.dependence || '-'
                )}
              </td> <td>
                {editingId === index ? (
                  <select
                    value={asset.criticality}
                    onChange={(e) => handleChange(index, 'criticality', e.target.value)}
                  >
                    <option value="">Select Criticality</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  </select>
                ) : (
                  asset.criticality || '-'
                )}
              </td> 
              <td>
                {editingId === index ? (
                  <select
                    value={asset.value}
                    onChange={(e) => handleChange(index, 'value', e.target.value)}
                  >
                  <option value="">Select Asset Value</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  </select>
                ) : (
                  asset.value || '-'
                )}
              </td>

             <td>
                {editingId === index ? (
                  <select
                    value={asset.license}
                    onChange={(e) => handleChange(index, 'license', e.target.value)}
                  >
                 <option value="">Select License</option>
                  <option value="Proprietary License">Proprietary License</option>
                  <option value="Open Source License">Open Source License</option>
                  <option value="Commercial License">Commercial License</option>
                  <option value="Trial License">Trial License</option>
                  </select>
                ) : (
                  asset.license || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <select
                    value={asset.availability}
                    onChange={(e) => handleChange(index, 'availability', e.target.value)}
                  >
                 <option value="">Select Availability</option>
                  <option value="System Availability">System Availability</option>
                  <option value="Application Availability">Application Availability</option>
                  <option value="Network Availability">Network Availability</option>
                  <option value="High Availability (HA)">High Availability (HA)</option>
                  <option value="Fault Tolerance">Fault Tolerance</option>
                  <option value="SLA">Service Level Agreement (SLA) Availability</option>
                  </select>
                ) : (
                  asset.availability || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                 
                
                <textarea
                  value={asset.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                  
                  
                  rows="2"
                  placeholder="please enter current description of this component..."
                />
                ) : (
                  asset.description|| '-'
                )}
              </td>












              <td colSpan="2" className="action-buttons">
  {editingId === index ? (
    <div className="edit-actions">
      <button 
        onClick={() => {
          saveAsset(asset);
          setEditingId(null);
        }}
        className="save-btn"
        title="Save"
      >
        <i className="fas fa-save"></i>
      </button>
      <button 
        onClick={() => {
          if (!asset._id) {
            setAssets(assets.filter((_, i) => i !== index));
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
          if (window.confirm('Delete this asset?')) {
            if (asset._id) {
              deleteAsset(asset._id);
            } else {
              setAssets(assets.filter((_, i) => i !== index));
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
    
  <div className="form-actions">
        <button className="add-new-asset-btn" onClick={addAsset}>
          <i className="fas fa-plus"></i> Add New Asset
        </button>
        <div className="page-navigation">
          <button className="navigation-btn" onClick={() => {/* Previous action */}}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="navigation-btn" onClick={() => {
            // Logic to navigate to Step2ThreatIdentification page
          }}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      

      {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default MobileBankingAssetForm;