import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, faTimes, faFileAlt,
  faChartLine, faShieldAlt, faSyncAlt, faExclamationTriangle,
  faClipboardList, faTasks, faHistory
} from '@fortawesome/free-solid-svg-icons';
import RiskAssessmentForm from '../Step1SystemCharacterization';
import BIAForm from '../Step2ThreatIdentification';
import RecoveryStrategyForm from '../unitRegistration';
import BCPForm from '../RoleRegistrationForm';
import DRPForm from '../Step1SystemCharacterization';
import TestingPlanForm from '../Step2ThreatIdentification';
import RiskAssessmentSteps from './RiskAssessmentSteps'; // Import the new component
import '../style/BCDRDashboard.css';

const BCDRDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showRiskSteps, setShowRiskSteps] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [riskAssessmentCount, setRiskAssessmentCount] = useState(0);
  const [BIACount, setBIACount] = useState(0);
  const [strategyCount, setStrategyCount] = useState(0);
  const [BCPCount, setBCPCount] = useState(0);
  const [DRPCount, setDRPCount] = useState(0);
  const [testPlanCount, setTestPlanCount] = useState(0);

  // Fetch counts for different BCDR components
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://localhost:5000/api/assets/count'),
          fetch('http://localhost:5000/api/bia/count'),
          fetch('http://localhost:5000/api/strategies/count'),
          fetch('http://localhost:5000/api/bcp/count'),
          fetch('http://localhost:5000/api/drp/count'),
          fetch('http://localhost:5000/api/testplans/count')
        ]);
        
        const data = await Promise.all(responses.map(res => res.json()));
        
        setRiskAssessmentCount(data[0].count);
        setBIACount(data[1].count);
        setStrategyCount(data[2].count);
        setBCPCount(data[3].count);
        setDRPCount(data[4].count);
        setTestPlanCount(data[5].count);
      } catch (error) {
        console.error('Error fetching BCDR counts:', error);
        setRiskAssessmentCount(5);
        setBIACount(3);
        setStrategyCount(8);
        setBCPCount(2);
        setDRPCount(4);
        setTestPlanCount(6);
      }
    };
    
    fetchCounts();
  }, []);

  const openForm = (formName) => {
    setActiveForm(formName);
    setShowForm(true);
  };

  const openRiskAssessmentSteps = () => {
    setShowRiskSteps(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setActiveForm(null);
  };

  const closeRiskSteps = () => {
    setShowRiskSteps(false);
  };

  const handleFormClose = () => {
    closeForm();
  };

  const handleRiskStepsClose = () => {
    closeRiskSteps();
  };

  return (
    <div className="bcdr-dashboard">
      {/* Risk Assessment Steps Modal */}
      {showRiskSteps && (
        <RiskAssessmentSteps onClose={handleRiskStepsClose} />
      )}
      
      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                {activeForm === 'RiskAssessment' && (
                  <>
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Risk Assessment Form
                  </>
                )}
                {activeForm === 'BIA' && (
                  <>
                    <FontAwesomeIcon icon={faChartLine} /> Business Impact Analysis Form
                  </>
                )}
                {activeForm === 'RecoveryStrategy' && (
                  <>
                    <FontAwesomeIcon icon={faSyncAlt} /> Recovery Strategy Form
                  </>
                )}
                {activeForm === 'BCP' && (
                  <>
                    <FontAwesomeIcon icon={faShieldAlt} /> Business Continuity Plan Form
                  </>
                )}
                {activeForm === 'DRP' && (
                  <>
                    <FontAwesomeIcon icon={faSyncAlt} /> Disaster Recovery Plan Form
                  </>
                )}
                {activeForm === 'TestingPlan' && (
                  <>
                    <FontAwesomeIcon icon={faClipboardList} /> Testing Plan Form
                  </>
                )}
              </h2>
              <button className="close-btn" onClick={handleFormClose}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-body">
              {activeForm === 'RiskAssessment' && <RiskAssessmentForm onClose={handleFormClose} />}
              {activeForm === 'BIA' && <BIAForm onClose={handleFormClose} />}
              {activeForm === 'RecoveryStrategy' && <RecoveryStrategyForm onClose={handleFormClose} />}
              {activeForm === 'BCP' && <BCPForm onClose={handleFormClose} />}
              {activeForm === 'DRP' && <DRPForm onClose={handleFormClose} />}
              {activeForm === 'TestingPlan' && <TestingPlanForm onClose={handleFormClose} />}
            </div>
          </div>
        </div>
      )}
      
      {/* BCDR Core Processes Section */}
      <div className="section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faClipboardList} /> BCDR Core Processes
        </h2>
        
        <div className="bcdr-items-grid">
          <div className="config-item">
            <div className="item-header" onClick={openRiskAssessmentSteps}>
              <span className="count">{riskAssessmentCount}</span>
              <span className="name">
                <FontAwesomeIcon icon={faExclamationTriangle} /> Risk Assessment
              </span>
            </div>
            <button 
              className="create-btn"
              onClick={openRiskAssessmentSteps}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header" onClick={() => openForm('BIA')}>
              <span className="count">{BIACount}</span>
              <span className="name">
                <FontAwesomeIcon icon={faChartLine} /> Business Impact Analysis
              </span>
            </div>
            <button 
              className="create-btn"
              onClick={() => openForm('BIA')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header" onClick={() => openForm('RecoveryStrategy')}>
              <span className="count">{strategyCount}</span>
              <span className="name">
                <FontAwesomeIcon icon={faSyncAlt} /> Recovery Strategies
              </span>
            </div>
            <button 
              className="create-btn"
              onClick={() => openForm('RecoveryStrategy')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header" onClick={() => openForm('BCP')}>
              <span className="count">{BCPCount}</span>
              <span className="name">
                <FontAwesomeIcon icon={faShieldAlt} /> Business Continuity Plan
              </span>
            </div>
            <button 
              className="create-btn"
              onClick={() => openForm('BCP')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header" onClick={() => openForm('DRP')}>
              <span className="count">{DRPCount}</span>
              <span className="name">
                <FontAwesomeIcon icon={faSyncAlt} /> Disaster Recovery Plan
              </span>
            </div>
            <button 
              className="create-btn"
              onClick={() => openForm('DRP')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
          
          <div className="config-item">
            <div className="item-header" onClick={() => openForm('TestingPlan')}>
              <span className="count">{testPlanCount}</span>
              <span className="name">
                <FontAwesomeIcon icon={faClipboardList} /> Testing Plan
              </span>
            </div>
            <button 
              className="create-btn"
              onClick={() => openForm('TestingPlan')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create
            </button>
          </div>
        </div>
      </div>
      
      {/* Other sections remain the same */}
      <div className="section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faTasks} /> Recovery Objectives
        </h2>
        <div className="bcdr-items-grid">
          {['RTO', 'RPO', 'MAD', 'MAO', 'MRC', 'Service Level Agreements'].map((item) => (
            <div key={item} className="config-item">
              <div className="item-header">
                <span className="name">{item}</span>
              </div>
              <button className="create-btn">
                <FontAwesomeIcon icon={faPlus} /> Define
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faFileAlt} /> Documentation & Training
        </h2>
        <div className="bcdr-items-grid">
          {['BCP Documentation', 'DRP Documentation', 'Training Materials', 'Awareness Programs', 'Contact Lists', 'Vendor Contracts'].map((item) => (
            <div key={item} className="config-item">
              <div className="item-header">
                <span className="name">{item}</span>
              </div>
              <button className="create-btn">
                <FontAwesomeIcon icon={faPlus} /> Create
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faHistory} /> Testing & Maintenance
        </h2>
        <div className="bcdr-items-grid">
          {['Tabletop Exercises', 'Functional Tests', 'Full Interruption Tests', 'Plan Maintenance', 'Change Management', 'Lessons Learned'].map((item) => (
            <div key={item} className="config-item">
              <div className="item-header">
                <span className="name">{item}</span>
              </div>
              <button className="create-btn">
                <FontAwesomeIcon icon={faPlus} /> Schedule
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BCDRDashboard;