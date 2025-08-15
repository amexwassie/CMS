import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../auth1/LoginSystem.css';

const API_BASE_URL = 'http://localhost:5000/api';
const AUTH_ENDPOINT = '/employees';

const LoginSystem = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    empId: '',
    email: '',
    password: '',
    department: '',
    systemRole: '',
    responsibilities: [],
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/employees`);
        setDepartments(response.data);
      } catch (err) {
        console.error('Failed to fetch departments:', err);
        setError('Failed to load department data');
      }
    };
    
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      if (isLogin) {
        // Login logic
        const response = await axios.post(`${API_BASE_URL}${AUTH_ENDPOINT}/users`, {
          empId: formData.empId,
          password: formData.password,
        });

        // Store employee data in local storage
        localStorage.setItem('userSession', JSON.stringify(response.data.user));
        navigate('/welcome');
      } else {
        // Check employee information
        const employeeResponse = await axios.get(`${API_BASE_URL}/employees/${formData.EMP_ID}`);
        if (!employeeResponse.data) {
          setError('Employee not found. Please check your Employee ID.');
          return;
        }

        // Registration logic
        const response = await axios.post(`${API_BASE_URL}${AUTH_ENDPOINT}/users`, {
          empId: formData.empId,
          email: formData.email,
          password: formData.password,
          department: formData.department,
          systemRole: formData.systemRole,
          responsibilities: formData.responsibilities,
        });
        setSuccessMessage('User created successfully! You can now sign in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">{isLogin ? 'Employee Sign In' : 'users'}</h2>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">EMPLOYEE ID</label>
            <input
              type="text"
              name="empId"
              value={formData.empId}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your employee ID"
              required
            />
          </div>
          
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label">EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">DEPARTMENT</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select your department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          
          <div className="form-group">
            <label className="form-label">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            {isLogin && (
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Loading...' : (isLogin ? 'Sign In' : 'Register')}
          </button>

          <div className="auth-footer">
            {isLogin ? (
              <p>
                Don't have an account? 
                <button type="button" onClick={() => setIsLogin(false)} className="auth-toggle">Sign Up</button>
              </p>
            ) : (
              <p>
                Already have an account? 
                <button type="button" onClick={() => setIsLogin(true)} className="auth-toggle">Sign In</button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginSystem;