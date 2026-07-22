import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../auth1/LoginSystem.css'
const API_BASE_URL = 'http://localhost:5000/api/employees';

const Login = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ empId: '', department: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    navigate('/step1'); // Redirect to dashboard after successful login
  };

  // Extract distinct departments
  const distinctDepartments = [...new Set(employees.map(emp => emp.DEPARTMENT))];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="asset-form">
      <h2>Employee Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>EmpID:</label>
        <input
          type="text"
          name="empId"
          value={formData.empId}
          onChange={handleChange}
          placeholder="Enter emp ID..."
          required
        />
        <label>Department:</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        >
          <option value="">Select department</option>
          {distinctDepartments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <div className="form-actions">
          <button type="submit" className="navigation-btn">
            Submit <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;