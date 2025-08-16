import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MobileBankingAssetForm.css';

const API_BASE_URL = 'http://localhost:5000/api';
const EMPLOYEES_ENDPOINT = '/employee_information';



<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>



const EmployeeManagementForm = () => {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('employees');
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const emptyEmployee = {
    EMP_ID: '',
    EMP_NAME: '',
    EMAIL_ADDRESS: '',
    SUPERVISOR_NAME: '',
    STATUS: '',
    UNIT_NAME: '',
    ROLE: '',
    POSITION: '',
    GRADE: '',
    JOBCAT: '',
    SALARY: '',
    SECTOR: '',
    DIVISION: '',
    DEPARTMENT: ''
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

  // Fetch employees from MongoDB - FIXED
  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}${EMPLOYEES_ENDPOINT}`);
      setEmployees(response.data);
      setError(null);
    } catch (err) {
      setError(`Failed to load employees: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    fetchEmployees(); 
  }, []);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index][field] = value;
    setEmployees(updatedEmployees);
  };

  // Save employee to MongoDB - FIXED
  const saveEmployee = async (employee, index) => {
    try {
      let response;
      if (employee._id) {
        response = await axios.put(
          `${API_BASE_URL}${EMPLOYEES_ENDPOINT}/${employee._id}`, 
          employee
        );
      } else {
        response = await axios.post(
          `${API_BASE_URL}${EMPLOYEES_ENDPOINT}`, 
          employee
        );
        // Update the employee in state with the new _id from backend
        const updatedEmployees = [...employees];
        updatedEmployees[index] = response.data;
        setEmployees(updatedEmployees);
      }
      setEditingId(null);
    } catch (err) {
      setError(`Save failed: ${err.response?.data?.message || err.message}`);
    }
  };

  // Delete employee from MongoDB
  const deleteEmployee = async (id, index) => {
    try {
      await axios.delete(`${API_BASE_URL}${EMPLOYEES_ENDPOINT}/${id}`);
      // Remove from local state
      const updatedEmployees = [...employees];
      updatedEmployees.splice(index, 1);
      setEmployees(updatedEmployees);
    } catch (err) {
      setError(`Delete failed: ${err.message}`);
    }
  };

  // Add new empty employee - FIXED
  const addEmployee = () => {
    setEmployees([...employees, { ...emptyEmployee }]);
    setEditingId(employees.length); // Edit the new row immediately
  };

  // Excel Upload Handlers - FIXED
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Uploading employee data...');
    setProgress(0);

    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}${EMPLOYEES_ENDPOINT}/upload`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        }
      );
      
      setUploadStatus(`Success: ${response.data.message}`);
      if (response.data.details?.length) {
        setUploadStatus(prev => prev + ` | ${response.data.details.length} errors`);
      }
      
      // Refresh employee list after successful upload
      fetchEmployees();
    } catch (error) {
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message;
      setUploadStatus(`Error: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Filter employees by search term - FIXED
  const filteredEmployees = employees.filter(emp => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (emp.EMP_NAME && emp.EMP_NAME.toLowerCase().includes(searchLower)) ||
      (emp.EMP_ID && emp.EMP_ID.toLowerCase().includes(searchLower)) ||
      (emp.EMAIL_ADDRESS && emp.EMAIL_ADDRESS.toLowerCase().includes(searchLower)) ||
      (emp.GRADE && emp.GRADE.toLowerCase().includes(searchLower)) ||
      (emp.DEPARTMENT && emp.DEPARTMENT.toLowerCase().includes(searchLower)) ||
      (emp.POSITION && emp.POSITION.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="asset-form">
      <h2 style={{ color: '#800080' }}>CBE Employee Information Management</h2>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
          onClick={() => setActiveTab('employees')}
        >
          Employee Registration
        </button>
        <button 
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Bulk Upload
        </button>
      </div>

      {activeTab === 'employees' ? (
        <>
          <div className="search-bar">
            <label>Search Employees:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, email, or grade..."
            />
          </div>

          {isLoading ? (
            <div className="loading">
              <i className="fas fa-spinner fa-spin"></i> Loading employee data...
            </div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Employee ID</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Grade</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee, index) => (
                      <tr key={employee._id || `new-${index}`}>
                        <td>{index + 1}</td>
                        <td>
                          {editingId === index ? (
                            <input
                              type="text"
                              value={employee.EMP_ID || ''}
                              onChange={(e) => handleChange(index, 'EMP_ID', e.target.value)}
                              placeholder="Employee ID"
                            />
                          ) : (
                            employee.EMP_ID || '-'
                          )}
                        </td>
                        <td>
                          {editingId === index ? (
                            <input
                              type="text"
                              value={employee.EMP_NAME || ''}
                              onChange={(e) => handleChange(index, 'EMP_NAME', e.target.value)}
                              placeholder="Full Name"
                            />
                          ) : (
                            employee.EMP_NAME || '-'
                          )}
                        </td>
                        <td>
                          {editingId === index ? (
                            <input
                              type="email"
                              value={employee.EMAIL_ADDRESS || ''}
                              onChange={(e) => handleChange(index, 'EMAIL_ADDRESS', e.target.value)}
                              placeholder="Email Address"
                            />
                          ) : (
                            employee.EMAIL_ADDRESS || '-'
                          )}
                        </td>
                        <td>
                          {editingId === index ? (
                            <input
                              type="text"
                              value={employee.GRADE || ''}
                              onChange={(e) => handleChange(index, 'GRADE', e.target.value)}
                              placeholder="Grade"
                            />
                          ) : (
                            employee.GRADE || '-'
                          )}
                        </td>
                        <td>
                          {editingId === index ? (
                            <input
                              type="text"
                              value={employee.DEPARTMENT || ''}
                              onChange={(e) => handleChange(index, 'DEPARTMENT', e.target.value)}
                              placeholder="Department"
                            />
                          ) : (
                            employee.DEPARTMENT || '-'
                          )}
                        </td>
                        <td>
                          {editingId === index ? (
                            <input
                              type="text"
                              value={employee.POSITION || ''}
                              onChange={(e) => handleChange(index, 'POSITION', e.target.value)}
                              placeholder="Position"
                            />
                          ) : (
                            employee.POSITION || '-'
                          )}
                        </td>
                        <td className="action-buttons">
                          {editingId === index ? (
                            <div className="edit-actions">
                              <button 
                                onClick={() => saveEmployee(employee, index)} 
                                className="save-btn"
                                title="Save"
                              >
                                <i className="fas fa-save"></i>
                              </button>
                              <button 
                                onClick={() => {
                                  if (!employee._id) {
                                    // Remove new employee if canceled
                                    const updatedEmployees = [...employees];
                                    updatedEmployees.splice(index, 1);
                                    setEmployees(updatedEmployees);
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
                                  if (window.confirm('Delete this employee record?')) {
                                    if (employee._id) {
                                      deleteEmployee(employee._id, index);
                                    } else {
                                      // Remove unsaved employee
                                      const updatedEmployees = [...employees];
                                      updatedEmployees.splice(index, 1);
                                      setEmployees(updatedEmployees);
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
                <button className="add-new-employee-btn" onClick={addEmployee}>
                  <i className="fas fa-plus"></i> Add New Employee
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="upload-section">
          <h3>Bulk Upload Employee Data</h3>
          <div className="upload-instructions">
            <p>Upload Excel file (.xlsx, .xls) with employee data:</p>
            <ul>
              <li>File should include columns: EMP_ID, EMP_NAME, EMAIL_ADDRESS, etc.</li>
              <li>First row should contain headers</li>
              <li>Maximum file size: 10MB</li>
            </ul>
          </div>
          
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="file-input-group">
              <label htmlFor="file-upload" className="file-label">
                {file ? file.name : 'Choose Excel File'}
                <i className="fas fa-file-excel file-icon"></i>
              </label>
              <input 
                id="file-upload"
                type="file" 
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="file-input"
              />
            </div>
            
            {isUploading && (
              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}>
                    {progress}%
                  </div>
                </div>
                <div className="progress-text">Uploading... {progress}%</div>
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={isUploading}
              className="btn-upload"
            >
              {isUploading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-upload"></i> Upload to Database
                </>
              )}
            </button>
          </form>
          
          {uploadStatus && (
            <div className={`upload-status ${uploadStatus.includes('Success') ? 'success' : 'error'}`}>
              <i className={`fas ${uploadStatus.includes('Success') ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
              {uploadStatus}
            </div>
          )}
        </div>
      )}

      <div className="page-navigation">
        <button 
          className="navigation-btn" 
          onClick={handlePrevious}
        >
          <i className="fas fa-chevron-left"></i> Previous
        </button>
        <button 
          className="navigation-btn" 
          onClick={handleNext}
        >
          Next <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <style jsx>{`
        .asset-form {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 25px;
          border: 1px solid #e1e4e8;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          background: white;
        }
        
        .tab-navigation {
          display: flex;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
        }
        
        .tab-btn {
          padding: 12px 24px;
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          position: relative;
          bottom: -1px;
          transition: all 0.3s;
        }
        
        .tab-btn.active {
          border-bottom: 3px solid #800080;
          color: #800080;
          font-weight: bold;
          background-color: #f9f2fc;
        }
        
        .search-bar {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
        }
        
        .search-bar label {
          margin-right: 10px;
          font-weight: bold;
          min-width: 150px;
        }
        
        .search-bar input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        .table-container {
          overflow-x: auto;
          margin-bottom: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
          max-height: 500px;
          overflow-y: auto;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        th {
          background-color: #800080;
          color: white;
          position: sticky;
          top: 0;
        }
        
        tr:hover {
          background-color: #f5f5f5;
        }
        
        input, select, textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .action-buttons {
          display: flex;
          justify-content: center;
        }
        
        .edit-actions, .view-actions {
          display: flex;
          gap: 8px;
        }
        
        .save-btn, .cancel-btn, .edit-btn, .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          padding: 5px;
        }
        
        .save-btn { color: #4CAF50; }
        .cancel-btn { color: #f44336; }
        .edit-btn { color: #2196F3; }
        .delete-btn { color: #f44336; }
        
        .form-actions {
          margin-top: 20px;
          text-align: center;
        }
        
        .add-new-employee-btn {
          background-color: #800080;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .add-new-employee-btn:hover {
          background-color: #6a006a;
        }
        
        .upload-section {
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
          background: #f9f9f9;
        }
        
        .upload-instructions {
          background: #e8f4ff;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #2196F3;
        }
        
        .upload-instructions ul {
          padding-left: 20px;
          margin: 10px 0;
        }
        
        .upload-instructions li {
          margin-bottom: 5px;
        }
        
        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .file-input-group {
          position: relative;
        }
        
        .file-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          background: #f8f9fa;
          border: 2px dashed #ddd;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          color: #555;
          transition: all 0.3s;
        }
        
        .file-label:hover {
          background: #e9ecef;
          border-color: #800080;
        }
        
        .file-icon {
          color: #1d6f42;
          font-size: 20px;
        }
        
        .file-input {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          border: 0;
        }
        
        .btn-upload {
          background-color: #4CAF50;
          color: white;
          padding: 12px 25px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .btn-upload:hover:not(:disabled) {
          background-color: #45a049;
        }
        
        .btn-upload:disabled {
          background-color: #a5d6a7;
          cursor: not-allowed;
        }
        
        .progress-container {
          margin: 15px 0;
        }
        
        .progress-bar {
          height: 25px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 5px;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4CAF50, #8BC34A);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          transition: width 0.3s;
        }
        
        .progress-text {
          text-align: center;
          font-size: 14px;
          color: #666;
        }
        
        .upload-status {
          margin-top: 15px;
          padding: 12px 15px;
          border-radius: 4px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        .page-navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        
        .navigation-btn {
          padding: 10px 20px;
          background-color: #800080;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s;
        }
        
        .navigation-btn:hover {
          background-color: #6a006a;
        }
        
        .error-message {
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          padding: 15px;
          border-radius: 4px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .loading {
          text-align: center;
          padding: 20px;
          font-size: 18px;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .table-container {
            font-size: 14px;
          }
          
          th, td {
            padding: 8px 10px;
          }
          
          .tab-btn {
            padding: 10px 15px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeManagementForm;