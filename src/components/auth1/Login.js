import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bankLogo from 'E:/CMS/src/assets/images/bank-logo.jpg'; // Adjust the path as needed
const API_BASE_URL = 'http://localhost:5000/api/employees';

const Login = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ empId: '', department: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({ empId: '', department: '' });

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
    setValidationErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = { empId: '', department: '' };

    if (!formData.empId) {
      errors.empId = 'Employee ID is required.';
      valid = false;
    } else if (!employees.some(emp => emp.EMP_ID === formData.empId)) {
      errors.empId = 'Employee ID does not exist.';
      valid = false;
    }

    if (!formData.department) {
      errors.department = 'Department is required.';
      valid = false;
    } else if (!employees.some(emp => emp.DEPARTMENT === formData.department)) {
      errors.department = 'Department does not match any employee.';
      valid = false;
    }

    const isValidCombination = employees.some(emp => emp.EMP_ID === formData.empId && emp.DEPARTMENT === formData.department);
    if (!isValidCombination) {
      errors.empId = `The Employee ID ${formData.empId} does not match with the selected department (${formData.department}).`;
      valid = false;
    }

    setValidationErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log('Login submitted:', formData);
    navigate('/Dashboard');
  };

  const distinctDepartments = [...new Set(employees.map(emp => emp.DEPARTMENT))];

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="auth-card p-4 border rounded shadow">
         
        <h2 className="text-center">
          <img src={bankLogo} alt="Commercial Bank Logo" className="bank-logo" /> <br/>
          CMS Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>EmpID:</label>
            <input
              type="text"
              className="form-control"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              placeholder="Enter emp ID..."
              required
            />
            {validationErrors.empId && <div className="text-danger">{validationErrors.empId}</div>}
          </div>
          <div className="form-group">
            <label>Department:</label>
            <select
              className="form-control"
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
            {validationErrors.department && <div className="text-danger">{validationErrors.department}</div>}
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;