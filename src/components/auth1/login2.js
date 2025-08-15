
import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation
} from 'react-router-dom';

// Set axios defaults
axios.defaults.withCredentials = true;
// const API_URL = process.env.REACT_APP_API_URL , 'http://localhost:5000';

// Create Auth Context
const AuthContext = createContext();

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/department" element={
                <ProtectedRoute>
                  <DepartmentDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

// Auth Provider Component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/auth/me`);
        setUser(res.data.user);
        setDepartment(res.data.user.department);
      } catch (err) {
        setUser(null);
        setDepartment(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, formData);
      setUser(res.data.user);
      setDepartment(res.data.user.department);
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error,  err.message);
    //   return { success: false, error: err.response?.data?.error , err.message };
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);
      setUser(res.data.user);
      setDepartment(res.data.user.department);
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error , err.message);
    //   return { success: false, error: err.response?.data?.error  err.message };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.get(`${API_URL}/api/auth/logout`);
      setUser(null);
      setDepartment(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error , err.message);
    }
  };

  // Value to provide to context consumers
  const value = {
    user,
    department,
    loading,
    error,
    register,
    login,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
function useAuth() {
  return useContext(AuthContext);
}

// Protected Route Component
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// Navbar Component
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MERN Auth Demo</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <span>Welcome, {user.firstName} ({user.role})</span>
            <Link to="/department">Department</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// Home Component
function Home() {
  const { user } = useAuth();

  return (
    <div className="page home">
      <h1>Welcome to the MERN Authentication System</h1>
      {user ? (
        <p>You are logged in as {user.email} ({user.role})</p>
      ) : (
        <p>Please login or register to access the system</p>
      )}
    </div>
  );
}

// Login Component
function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    departmentCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.success) {
      navigate('/department');
    }
  };

  return (
    <div className="page auth-form">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department Code</label>
          <input
            type="text"
            name="departmentCode"
            value={formData.departmentCode}
            onChange={handleChange}
            placeholder="e.g., IT-003"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

// Register Component
function Register() {
  const { register, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    departmentCode: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result.success) {
      navigate('/department');
    }
  };

return (
    <div className="page auth-form">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            minLength="8"
            required
          />
        </div>
        <div className="form-group">
          <label>Department Code</label>
          <input
            type="text"
            name="departmentCode"
            value={formData.departmentCode}
            onChange={handleChange}
            placeholder="e.g., IT-003"
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          ><option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="staff">Staff</option>
            <option value="hod">Head of Department</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

// Department Dashboard Component
function DepartmentDashboard() {
  const { user, department } = useAuth();
  const [departmentUsers, setDepartmentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentUsers = async () => {
      try {
        // const res = await axios.get(${API_URL}/api/departments/$,{department._id}/users);
        setDepartmentUsers(res.data.data);
      } catch (err) {
        setError(err.response?.data?.error,  err.message);
      } finally {
        setLoading(false);
      }
    };

    if (department) {
      fetchDepartmentUsers();
    }
  }, [department]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page dashboard">
      <h2>{department.name} Dashboard</h2>
      <p>Welcome, {user.firstName}! You are a {user.role} in this department.</p>
      
      <h3>Department Members</h3>
      <ul className="user-list">
        {departmentUsers.map(user => (
          <li key={user._id}>
            {user.firstName} {user.lastName} ({user.email}) - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/departments`);
        setDepartments(res.data.data);
      } catch (err) {
        setError(err.response?.data?.error , err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;


return (
    <div className="page dashboard">
      <h2>Admin Dashboard</h2>
      <h3>All Departments</h3>
      <ul className="department-list">
        {departments.map(dept => (
          <li key={dept._id}>
            <strong>{dept.name}</strong> ({dept.code})
            {dept.hod && <span> - HOD: {dept.hod.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Unauthorized Component
function Unauthorized() {
  return (
    <div className="page unauthorized">
      <h2>Unauthorized Access</h2>
      <p>You don't have permission to view this page.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

// Basic CSS (in JS)
const styles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
  }
  
  .app-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 30px;
  }
  
  .navbar-brand a {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }
  
  .navbar-links {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  
  .navbar-links a, .navbar-links button {
    text-decoration: none;
    color: #333;
    padding: 5px 10px;
  }
  
  .navbar-links button {
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .page {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .auth-form {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input, .form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background: #0056b3;
  }
  
  .error {
    color: #dc3545;
    background: #f8d7da;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  
  .user-list, .department-list {
    list-style: none;
    margin-top: 20px;
  }
  
  .user-list li, .department-list li {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
`;

// Add styles to the head
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default App;