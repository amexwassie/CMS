import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Step1SystemCharacterization from './components/Step1SystemCharacterization';
import Step2ThreatIdentification from './components/Step2ThreatIdentification';
import { RiskProvider } from './context/RiskContext';
import  UnitRegistration from './components/unitRegistration';
import  RoleRegistration from './components/RoleRegistrationForm';
import  DatacenterRegistration from './components/datacenter';
import  RackRegistrationForm from './components/RackRegistrationForm';
import  TelecomInfrastructureForm from './components/TelecomInfrastructureForm';

const App = () => {
  return (
    <RiskProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/step1" element={<Step1SystemCharacterization />} />
          <Route path="/step2" element={<Step2ThreatIdentification />} />
            <Route path="/step3" element={<UnitRegistration />} />
             <Route path="/step4" element={<RoleRegistration />} />
              <Route path="/step5" element={<DatacenterRegistration />} />
                <Route path="/step6" element={<RackRegistrationForm />} />
                 <Route path="/step7" element={<TelecomInfrastructureForm />} />
          {/* Add routes for other steps */}
        </Routes>
      </Router>
    </RiskProvider>
  );
};


export default App;