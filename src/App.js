import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'; // For Bootstrap
// import 'bootswatch/dist/flatly/bootstrap.min.css';
// import Dashboard from './components/Dashboard';
import Step1SystemCharacterization from './components/Step1SystemCharacterization';
// import Step2ThreatIdentification from './components/Step2ThreatIdentification';
import { RiskProvider } from './context/RiskContext';
import  UnitRegistration from './components/unitRegistration';
import  RoleRegistration from './components/RoleRegistrationForm';
import  DatacenterRegistration from './components/datacenter';
import  RackRegistrationForm from './components/RackRegistrationForm';
import  TelecomInfrastructureForm from './components/TelecomInfrastructureForm';
import  Welcome from './components/CMS/Welcome';
import NetworkDeviceForm from './components/CMS/NetworkDeviceForm';
import ServerRegistrationForm from './components/CMS/ServerRegistrationForm';
import VirtualizationManagement from './components/CMS/VirtualizationManagement';
import Login from './components/auth1/Login';
import  Employee from './components/employee';
const App = () => {
  return (
    <RiskProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Dashboard" element={<Welcome />} />
          <Route path="/" element={<Login/>} />
          <Route path="/Dashboardp" element={<Step1SystemCharacterization />} />
          <Route path="/step2" element={<Step1SystemCharacterization />} />
          <Route path="/step3" element={<UnitRegistration />} />
          <Route path="/step4" element={<RoleRegistration />} />
          <Route path="/step5" element={<DatacenterRegistration />} />
          <Route path="/step6" element={<RackRegistrationForm />} />
          <Route path="/step7" element={<TelecomInfrastructureForm />} />
          <Route path="/step9" element={<ServerRegistrationForm />} />
          <Route path="/step8" element={<NetworkDeviceForm />} />
          <Route path="/step10" element={<VirtualizationManagement />} />
          <Route path="/step11" element={<Employee />} />
          {/* Add routes for other steps */}
        </Routes>
      </Router>
    </RiskProvider>
  );
};


export default App;