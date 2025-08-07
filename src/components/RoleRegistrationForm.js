import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileBankingAssetForm.css';

const API_BASE_URL = 'http://localhost:5000/api/roles';

const RoleRegistrationForm = () => {
  const [roles, setRoles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const emptyRole = {
    roleId: '',
    roleName: '',
    grade: '',
    category: ''
  };

   const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/step5');
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    navigate('/step3');
  };
  // Fetch roles from backend
  const fetchRoles = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setRoles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchRoles(); }, []);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updatedRoles = [...roles];
    updatedRoles[index][field] = value;
    setRoles(updatedRoles);
  };

  // Save role to backend
  const saveRole = async (role) => {
    try {
      let response;
      if (role._id) {
        // Update existing role
        response = await fetch(`${API_BASE_URL}/${role._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(role)
        });
      } else {
        // Create new role
        response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(role)
        });
      }
      
      if (!response.ok) throw new Error('Save failed');
      fetchRoles(); // Refresh data
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete role
  const deleteRole = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      fetchRoles(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  // Add new empty role
  const addRole = () => {
    setRoles([...roles, { ...emptyRole }]);
    setEditingId(roles.length);
  };

  // Filter roles
  const filteredRoles = roles.filter(role => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (role.roleName && role.roleName.toLowerCase().includes(searchLower)) ||
      (role.grade && role.grade.toString().includes(searchTerm)) ||
      (role.category && role.category.toLowerCase().includes(searchLower))
    );
  });

  if (isLoading) return <div className="loading">Loading roles...</div>;

  return (
    <div className="asset-form">
      <h2 style={{ color: '#800080' }}>Role Registration Form</h2>

      <div className="search-bar">
        <label>Search Roles:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by role name, grade, or category..."
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Role ID</th>
            <th>Role Name</th>
            <th>Grade</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.map((role, index) => (
            <tr key={role._id || index}>
              <td>{index + 1}</td>
              <td>
                {editingId === index ? (
                  <input
                    type="text"
                    value={role.roleId}
                    onChange={(e) => handleChange(index, 'roleId', e.target.value)}
                    placeholder="Enter role ID"
                  />
                ) : (
                  role.roleId || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <input
                    type="text"
                    value={role.roleName}
                    onChange={(e) => handleChange(index, 'roleName', e.target.value)}
                    placeholder="Enter role name"
                  />
                ) : (
                  role.roleName || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <select
                    value={role.grade}
                    onChange={(e) => handleChange(index, 'grade', e.target.value)}
                  >
                    <option value="">Select Grade</option>
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                    <option value="13">Grade 13</option>
                    <option value="14">Grade 14</option>
                    <option value="15">Grade 15</option>
                  </select>
                ) : (
                  role.grade || '-'
                )}
              </td>
              <td>
                {editingId === index ? (
                  <select
                    value={role.category}
                    onChange={(e) => handleChange(index, 'category', e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Technical">Technical</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Management">Management</option>
                    <option value="Support">Support</option>
                  </select>
                ) : (
                  role.category || '-'
                )}
              </td>
              <td className="action-buttons">
                {editingId === index ? (
                  <>
                    <button onClick={() => saveRole(role)} className="save-btn">
                      <i className="fas fa-save"></i>
                    </button>
                    <button onClick={() => {
                      if (!role._id) {
                        setRoles(roles.filter((_, i) => i !== index));
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
                      if (window.confirm('Delete this role?')) {
                        if (role._id) {
                          deleteRole(role._id);
                        } else {
                          setRoles(roles.filter((_, i) => i !== index));
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
        <button className="add-new-asset-btn" onClick={addRole}>
          <i className="fas fa-plus"></i> Add New Role
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

export default RoleRegistrationForm;