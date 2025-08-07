import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileBankingAssetForm.css';

const API_BASE_URL = 'http://localhost:5000/api/departments';

const DepartmentRegistrationForm = () => {
  const [departments, setDepartments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

const emptyDepartment = {
  UnitID: '', // Change unitID to UnitID
  unitName: '',
  divisionName: '',
  description: ''
};

  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/step4');
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    navigate('/step2');
  };

  // Fetch departments from MongoDB
  const fetchDepartments = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setDepartments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchDepartments(); }, []);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updatedDepartments = [...departments];
    updatedDepartments[index][field] = value;
    setDepartments(updatedDepartments);
  };

  // Save department to MongoDB
 const saveDepartment = async (department) => {
  try {
    let response;
    if (department._id) {
      response = await fetch(`${API_BASE_URL}/${department._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(department) // Ensure UnitID is included
      });
    } else {
      response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(department) // Ensure UnitID is included
      });
    }

    const responseBody = await response.json();
    if (!response.ok) throw new Error(`Save failed: ${responseBody.error || responseBody.message}`);
    fetchDepartments(); // Refresh data
    setEditingId(null);
  } catch (err) {
    setError(err.message);
  }
};

  // Delete department from MongoDB
  const deleteDepartment = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      fetchDepartments(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new empty department
  const addDepartment = () => {
    setDepartments([...departments, { ...emptyDepartment }]);
    setEditingId(departments.length);
  };

  // Filter departments by search term
  const filteredDepartments = departments.filter(dept => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (dept.unitName && dept.unitName.toLowerCase().includes(searchLower)) ||
      (dept.divisionName && dept.divisionName.toLowerCase().includes(searchLower)) ||
      (dept.description && dept.description.toLowerCase().includes(searchLower))
    );
  });

  if (isLoading) return <div className="loading">Loading departments...</div>;

  return (
    <div className="asset-form">
      <h2 style={{ color: '#800080' }}>Department/Unit Registration</h2>

      <div className="search-bar">
        <label>Search Departments:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, division, or description..."
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Unit Code</th>
            <th>Unit Name</th>
            <th>Division</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((department, index) => (
            <tr key={department._id || index}>
              <td>{index + 1}</td>
      <td>
  {editingId === index ? (
    <input
      type="text"
      value={department.UnitID} // Change unitID to UnitID
      onChange={(e) => handleChange(index, 'UnitID', e.target.value)} // Change to UnitID
      placeholder="Enter unit ID"
    />
  ) : (
    department.UnitID || '-' // Change unitID to UnitID
  )}
</td>
              <td>
                {editingId === index ? (
                  <input
                    type="text"
                    value={department.unitName}
                    onChange={(e) => handleChange(index, 'unitName', e.target.value)}
                    placeholder="Enter unit name"
                  />
                ) : (
                  department.unitName || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <select
                    value={department.divisionName}
                    onChange={(e) => handleChange(index, 'divisionName', e.target.value)}
                  >
                    <option value="">Select Division</option>
                    <option value="IS Division">IS Division</option>
                    <option value="HR Division">HR Division</option>
                    <option value="Finance Division">Finance Division</option>
                    <option value="Wholesale Division">Wholesale Division</option>
                    <option value="Retail Division">Retail Division</option>
                    <option value="Credit Division">Credit Division</option>
                  </select>
                ) : (
                  department.divisionName || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <textarea
                    value={department.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    rows="2"
                    placeholder="Department description..."
                  />
                ) : (
                  department.description || '-'
                )}
              </td>
              <td className="action-buttons">
                {editingId === index ? (
                  <div className="edit-actions">
                    <button 
                      onClick={() => saveDepartment(department)} 
                      className="save-btn"
                      title="Save"
                    >
                      <i className="fas fa-save"></i>
                    </button>
                    <button 
                      onClick={() => {
                        if (!department._id) {
                          setDepartments(departments.filter((_, i) => i !== index));
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
                        if (window.confirm('Delete this department?')) {
                          if (department._id) {
                            deleteDepartment(department._id);
                          } else {
                            setDepartments(departments.filter((_, i) => i !== index));
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
        <button className="add-new-asset-btn" onClick={addDepartment}>
          <i className="fas fa-plus"></i> Add New Department
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

export default DepartmentRegistrationForm;