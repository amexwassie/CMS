import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, faTimes, faClipboardList, faTasks, 
  faHistory, faCog, faExchangeAlt, faUserCog,
  faCalendarAlt, faCheckCircle, faClock, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import ChangeRequestForm from './ChangeRequestForm';
import ChangeCalendar from './ChangeCalendar';
import ApprovalWorkflow from './ApprovalWorkflow';
import ChangeHistory from './ChangeHistory';
import '../style/ChangeManagement.css';

const ChangeManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [pendingChanges, setPendingChanges] = useState(0);
  const [scheduledChanges, setScheduledChanges] = useState(0);
  const [completedChanges, setCompletedChanges] = useState(0);
  const [emergencyChanges, setEmergencyChanges] = useState(0);

  // Fetch counts for change management components
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          fetch('http://localhost:5000/api/changes/pending/count'),
          fetch('http://localhost:5000/api/changes/scheduled/count'),
          fetch('http://localhost:5000/api/changes/completed/count'),
          fetch('http://localhost:5000/api/changes/emergency/count')
        ]);
        
        const data = await Promise.all(responses.map(res => res.json()));
        
        setPendingChanges(data[0].count);
        setScheduledChanges(data[1].count);
        setCompletedChanges(data[2].count);
        setEmergencyChanges(data[3].count);
      } catch (error) {
        console.error('Error fetching change management counts:', error);
        // Fallback data
        setPendingChanges(5);
        setScheduledChanges(3);
        setCompletedChanges(12);
        setEmergencyChanges(2);
      }
    };
    
    fetchCounts();
  }, []);

  const openForm = (formName) => {
    setActiveForm(formName);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setActiveForm(null);
  };

  const handleFormClose = () => {
    closeForm();
  };

  return (
    <div className="change-management-dashboard">
      {/* Header with Bank Information */}
      {/* <div className="bank-header">
        <h1>Commercial Bank of Ethiopia</h1>
        <h2>PARKPOZENJI - Economic China Offshore (CBE)</h2>
        <div className="admin-info">
          <FontAwesomeIcon icon={faUserCog} /> System Administrator
        </div>
      </div> */}

      {/* Main Content */}
      <div className="change-management-content">
        <h2 className="page-title">
          <FontAwesomeIcon icon={faExchangeAlt} /> Change Management
        </h2>

        {/* Form Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>
                  {activeForm === 'ChangeRequest' && (
                    <>
                      <FontAwesomeIcon icon={faClipboardList} /> Change Request Form
                    </>
                  )}
                  {activeForm === 'ChangeCalendar' && (
                    <>
                      <FontAwesomeIcon icon={faCalendarAlt} /> Change Calendar
                    </>
                  )}
                  {activeForm === 'ApprovalWorkflow' && (
                    <>
                      <FontAwesomeIcon icon={faCheckCircle} /> Approval Workflow
                    </>
                  )}
                  {activeForm === 'ChangeHistory' && (
                    <>
                      <FontAwesomeIcon icon={faHistory} /> Change History
                    </>
                  )}
                </h2>
                <button className="close-btn" onClick={handleFormClose}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-body">
                {activeForm === 'ChangeRequest' && <ChangeRequestForm onClose={handleFormClose} />}
                {activeForm === 'ChangeCalendar' && <ChangeCalendar onClose={handleFormClose} />}
                {activeForm === 'ApprovalWorkflow' && <ApprovalWorkflow onClose={handleFormClose} />}
                {activeForm === 'ChangeHistory' && <ChangeHistory onClose={handleFormClose} />}
              </div>
            </div>
          </div>
        )}

        {/* Change Management Dashboard Sections */}
        <div className="section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faClipboardList} /> Change Requests
          </h2>
          
          <div className="change-items-grid">
            <div className="change-item">
              <div className="item-header" onClick={() => openForm('ChangeRequest')}>
                <span className="count">{pendingChanges}</span>
                <span className="name">
                  <FontAwesomeIcon icon={faClock} /> Pending Changes
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('ChangeRequest')}
              >
                <FontAwesomeIcon icon={faPlus} /> New Request
              </button>
            </div>
            
            <div className="change-item">
              <div className="item-header" onClick={() => openForm('ChangeCalendar')}>
                <span className="count">{scheduledChanges}</span>
                <span className="name">
                  <FontAwesomeIcon icon={faCalendarAlt} /> Scheduled Changes
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('ChangeCalendar')}
              >
                <FontAwesomeIcon icon={faPlus} /> View Calendar
              </button>
            </div>
            
            <div className="change-item">
              <div className="item-header" onClick={() => openForm('ChangeHistory')}>
                <span className="count">{completedChanges}</span>
                <span className="name">
                  <FontAwesomeIcon icon={faCheckCircle} /> Completed Changes
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('ChangeHistory')}
              >
                <FontAwesomeIcon icon={faPlus} /> View History
              </button>
            </div>
            
            <div className="change-item emergency">
              <div className="item-header" onClick={() => openForm('ChangeRequest')}>
                <span className="count">{emergencyChanges}</span>
                <span className="name">
                  <FontAwesomeIcon icon={faExclamationTriangle} /> Emergency Changes
                </span>
              </div>
              <button 
                className="create-btn"
                onClick={() => openForm('ChangeRequest')}
              >
                <FontAwesomeIcon icon={faPlus} /> Emergency Request
              </button>
            </div>
          </div>
        </div>
        
        <div className="section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faTasks} /> Change Approval Workflow
          </h2>
          <div className="change-items-grid">
            {['Change Advisory Board', 'Standard Changes', 'Normal Changes', 'Emergency Approval', 'Delegated Authority', 'Policy Exceptions'].map((item) => (
              <div key={item} className="change-item">
                <div className="item-header" onClick={() => openForm('ApprovalWorkflow')}>
                  <span className="name">{item}</span>
                </div>
                <button className="create-btn" onClick={() => openForm('ApprovalWorkflow')}>
                  <FontAwesomeIcon icon={faPlus} /> Configure
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faCog} /> Change Configuration
          </h2>
          <div className="change-items-grid">
            {['Change Types', 'Impact Assessment', 'Risk Evaluation', 'Priority Settings', 'Notification Rules', 'Template Management'].map((item) => (
              <div key={item} className="change-item">
                <div className="item-header">
                  <span className="name">{item}</span>
                </div>
                <button className="create-btn">
                  <FontAwesomeIcon icon={faPlus} /> Configure
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="section">
          <h2 className="section-title">
            <FontAwesomeIcon icon={faHistory} /> Reports & Analytics
          </h2>
          <div className="change-items-grid">
            {['Change Success Rate', 'Failed Changes', 'Change Volume Trends', 'Approval Cycle Times', 'Emergency Change Analysis', 'Compliance Reports'].map((item) => (
              <div key={item} className="change-item">
                <div className="item-header">
                  <span className="name">{item}</span>
                </div>
                <button className="create-btn">
                  <FontAwesomeIcon icon={faPlus} /> Generate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeManagement;