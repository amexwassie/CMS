import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import bankLogo from 'C:/Users/Aragawwassie/risk_assessment/src/assets/images/bank-logo.jpg'; // Adjust the path as needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <header className="header">
        <div className="logo-container">
          <img src={bankLogo} alt="Commercial Bank Logo" className="bank-logo" />
          <div className="overlay-text">Web-Based Risk Assessment System for Commercial Bank of Ethiopia</div>
        </div>
      </header>

      <div className="links-container">
        <Link to="/">Dashboard</Link>
        <Link to="/step1">Risk_Assessment</Link>
        <Link to="/step2">ThreatIdentification </Link>
        <Link to="/step3">Department List</Link>
        <Link to="/step4">Role List</Link>
        <Link to="/step5">DataCenter</Link>
        <Link to="/step6">Rack</Link>
        <Link to="/step7">Service_Provider </Link>
        <Link to="/step8">Network</Link>
        <Link to="/step9">Server</Link>
        <Link to="/step10">Virtualization</Link>
        <Link to="/step11">Application</Link>
        <Link to="/step12">DB</Link>
        
        {/* Add links for other steps */}
      </div>
    </nav>
  );
};

export default Navbar;