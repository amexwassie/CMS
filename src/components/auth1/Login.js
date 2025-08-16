import React, { useState } from 'react';
// import { registerUser, loginUser } from './api';
import { registerUser, loginUser } from '../../api';
const LoginSystem = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    empId: '',
    email: '',
    password: '',
    department: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      if (isLogin) {
        const response = await loginUser({ empId: formData.empId, password: formData.password });
        alert('Login successful!');
        console.log(response.data);
      } else {
        await registerUser(formData);
        setSuccessMessage('User created successfully! You can now sign in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Employee Sign In' : 'Sign Up'}</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="empId"
          value={formData.empId}
          onChange={handleChange}
          placeholder="Employee ID"
          required
        />
        {!isLogin && (
          <>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
              required
            />
          </>
        )}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required={isLogin}
        />
        <button type="submit">{isLogin ? 'Sign In' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin((prev) => !prev)}>
        {isLogin ? 'Don’t have an account? Sign Up' : 'Already have an account? Sign In'}
      </button>
    </div>
  );
};

export default LoginSystem;