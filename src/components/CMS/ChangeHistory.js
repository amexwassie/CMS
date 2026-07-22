import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFilter, 
  faSearch, 
  faCheckCircle, 
  faTimesCircle, 
  faClock,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import '../style/ChangeManagementForms.css';

const ChangeHistory = ({ onClose }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [changes] = useState([
    {
      id: 1001,
      title: 'ERP System Upgrade',
      type: 'major',
      status: 'completed',
      requester: 'Michael Chen',
      submitted: '2023-05-10T09:15:00',
      approved: '2023-05-12T14:30:00',
      implemented: '2023-05-15T02:00:00',
      duration: '4 hours 30 minutes',
      outcome: 'success'
    },
    {
      id: 1002,
      title: 'Security Certificate Renewal',
      type: 'standard',
      status: 'completed',
      requester: 'IT Security Team',
      submitted: '2023-05-18T11:20:00',
      approved: '2023-05-18T11:25:00',
      implemented: '2023-05-18T13:00:00',
      duration: '45 minutes',
      outcome: 'success'
    },
    {
      id: 1003,
      title: 'Database Performance Tuning',
      type: 'normal',
      status: 'completed',
      requester: 'Database Administration',
      submitted: '2023-05-22T08:45:00',
      approved: '2023-05-23T10:15:00',
      implemented: '2023-05-24T23:00:00',
      duration: '2 hours 15 minutes',
      outcome: 'success'
    },
    {
      id: 1004,
      title: 'Network Switch Replacement',
      type: 'emergency',
      status: 'completed',
      requester: 'Network Operations',
      submitted: '2023-06-01T16:40:00',
      approved: '2023-06-01T16:45:00',
      implemented: '2023-06-01T17:30:00',
      duration: '50 minutes',
      outcome: 'success'
    },
    {
      id: 1005,
      title: 'Application Feature Deployment',
      type: 'normal',
      status: 'failed',
      requester: 'Development Team',
      submitted: '2023-06-05T13:20:00',
      approved: '2023-06-06T09:30:00',
      implemented: '2023-06-07T20:00:00',
      duration: '1 hour 10 minutes',
      outcome: 'failed',
      notes: 'Rollback initiated due to compatibility issues'
    },
    {
      id: 1006,
      title: 'Storage Array Expansion',
      type: 'major',
      status: 'completed',
      requester: 'Storage Team',
      submitted: '2023-06-10T10:05:00',
      approved: '2023-06-12T15:20:00',
      implemented: '2023-06-15T01:00:00',
      duration: '3 hours 45 minutes',
      outcome: 'success'
    }
  ]);

  const filteredChanges = changes.filter(change => {
    const matchesFilter = filter === 'all' || change.status === filter || change.type === filter || change.outcome === filter;
    const matchesSearch = change.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         change.requester.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return faCheckCircle;
      case 'failed': return faTimesCircle;
      case 'pending': return faClock;
      case 'emergency': return faExclamationTriangle;
      default: return faCheckCircle;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'failed': return 'status-failed';
      case 'pending': return 'status-pending';
      case 'emergency': return 'status-emergency';
      default: return 'status-completed';
    }
  };

  const getOutcomeClass = (outcome) => {
    return outcome === 'success' ? 'outcome-success' : 'outcome-failed';
  };

  return (
    <div className="change-history">
      <div className="history-header">
        <h2>Change History</h2>
        <div className="controls">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search changes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <FontAwesomeIcon icon={faFilter} />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Changes</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="major">Major</option>
              <option value="normal">Normal</option>
              <option value="standard">Standard</option>
              <option value="emergency">Emergency</option>
              <option value="success">Successful</option>
            </select>
          </div>
        </div>
      </div>

      <div className="changes-list">
        {filteredChanges.map(change => (
          <div key={change.id} className="change-record">
            <div className="change-main-info">
              <div className="change-status">
                <FontAwesomeIcon 
                  icon={getStatusIcon(change.status)} 
                  className={getStatusClass(change.status)}
                />
              </div>
              <div className="change-details">
                <h3>{change.title}</h3>
                <div className="change-meta">
                  <span className="change-id">ID: {change.id}</span>
                  <span className="change-type">{change.type}</span>
                  <span className="change-requester">By: {change.requester}</span>
                </div>
              </div>
              <div className="change-outcome">
                <span className={getOutcomeClass(change.outcome)}>
                  {change.outcome.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="change-timeline">
              <div className="timeline-item">
                <span className="timeline-label">Submitted:</span>
                <span className="timeline-value">
                  {new Date(change.submitted).toLocaleString()}
                </span>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">Approved:</span>
                <span className="timeline-value">
                  {new Date(change.approved).toLocaleString()}
                </span>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">Implemented:</span>
                <span className="timeline-value">
                  {new Date(change.implemented).toLocaleString()}
                </span>
              </div>
              <div className="timeline-item">
                <span className="timeline-label">Duration:</span>
                <span className="timeline-value">{change.duration}</span>
              </div>
            </div>

            {change.notes && (
              <div className="change-notes">
                <strong>Notes:</strong> {change.notes}
              </div>
            )}

            <button className="view-details-btn">View Full Details</button>
          </div>
        ))}
      </div>

      {filteredChanges.length === 0 && (
        <div className="no-results">
          <p>No changes found matching your criteria.</p>
        </div>
      )}

      <div className="history-summary">
        <h3>Summary</h3>
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-value">{changes.length}</span>
            <span className="stat-label">Total Changes</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {changes.filter(c => c.outcome === 'success').length}
            </span>
            <span className="stat-label">Successful</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {changes.filter(c => c.outcome === 'failed').length}
            </span>
            <span className="stat-label">Failed</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {changes.filter(c => c.type === 'emergency').length}
            </span>
            <span className="stat-label">Emergency</span>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Close
        </button>
        <button type="button" className="export-btn">
          Export to CSV
        </button>
      </div>
    </div>
  );
};

export default ChangeHistory;