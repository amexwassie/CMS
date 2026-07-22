import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faSearch,
  faFilter,
  faCheckCircle,
  faExclamationTriangle,
  faClock,
  faTimesCircle,
  faUser,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import '../style/ServiceDashboard.css';

const IncidentManagement = ({ onClose }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  const [incidents] = useState([
    {
      id: 1,
      service: 'MB USSD',
      status: 'degraded',
      priority: 'high',
      startTime: '2023-06-18 14:30',
      description: 'Slow response times affecting some transactions',
      assignedTo: 'Network Team',
      resolution: 'Being investigated by network team',
      updates: [
        {
          time: '2023-06-18 15:45',
          message: 'Initial investigation underway',
          user: 'John Doe'
        }
      ]
    },
    {
      id: 2,
      service: 'CBE Birr Smart App',
      status: 'maintenance',
      priority: 'medium',
      startTime: '2023-06-20 02:00',
      description: 'Scheduled maintenance for system upgrade',
      assignedTo: 'System Admin Team',
      resolution: 'Expected completion by 06:00',
      updates: [
        {
          time: '2023-06-20 02:30',
          message: 'Maintenance in progress',
          user: 'Jane Smith'
        }
      ]
    },
    {
      id: 3,
      service: 'ATM Services',
      status: 'degraded',
      priority: 'high',
      startTime: '2023-06-19 09:15',
      description: 'Connectivity issues with some ATM units',
      assignedTo: 'Field Technicians',
      resolution: 'Technicians dispatched to affected locations',
      updates: [
        {
          time: '2023-06-19 10:30',
          message: '10 ATMs identified with connectivity issues',
          user: 'Mike Johnson'
        },
        {
          time: '2023-06-19 11:45',
          message: '5 ATMs restored, working on remaining units',
          user: 'Mike Johnson'
        }
      ]
    },
    {
      id: 4,
      service: 'Internet Banking',
      status: 'resolved',
      priority: 'critical',
      startTime: '2023-06-12 11:20',
      endTime: '2023-06-12 13:45',
      description: 'Login authentication failure for some users',
      assignedTo: 'Security Team',
      resolution: 'Authentication server restarted, issue resolved',
      updates: [
        {
          time: '2023-06-12 11:45',
          message: 'Identified authentication server issue',
          user: 'Sarah Wilson'
        },
        {
          time: '2023-06-12 12:30',
          message: 'Server restart in progress',
          user: 'Sarah Wilson'
        },
        {
          time: '2023-06-12 13:45',
          message: 'Service restored and verified',
          user: 'Sarah Wilson'
        }
      ]
    }
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return faCheckCircle;
      case 'degraded': return faExclamationTriangle;
      case 'outage': return faTimesCircle;
      case 'maintenance': return faClock;
      default: return faExclamationTriangle;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'resolved': return 'status-resolved';
      case 'degraded': return 'status-degraded';
      case 'outage': return 'status-outage';
      case 'maintenance': return 'status-maintenance';
      default: return 'status-degraded';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'critical': return 'priority-critical';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    if (activeTab === 'active' && incident.status === 'resolved') return false;
    if (activeTab === 'resolved' && incident.status !== 'resolved') return false;
    
    const matchesFilter = filter === 'all' || incident.priority === filter;
    const matchesSearch = incident.service.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="incident-management">
      <div className="incident-header">
        <h3>Incident Management</h3>
        <div className="controls">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <FontAwesomeIcon icon={faFilter} />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button className="new-incident-btn">
            <FontAwesomeIcon icon={faPlus} /> New Incident
          </button>
        </div>
      </div>

      <div className="incident-tabs">
        <button 
          className={activeTab === 'active' ? 'tab-active' : ''}
          onClick={() => setActiveTab('active')}
        >
          Active Incidents ({incidents.filter(i => i.status !== 'resolved').length})
        </button>
        <button 
          className={activeTab === 'resolved' ? 'tab-active' : ''}
          onClick={() => setActiveTab('resolved')}
        >
          Resolved Incidents ({incidents.filter(i => i.status === 'resolved').length})
        </button>
      </div>

      <div className="incidents-list">
        {filteredIncidents.map(incident => (
          <div key={incident.id} className="incident-detail-card">
            <div className="incident-main-info">
              <div className="incident-service">{incident.service}</div>
              <div className="incident-priority">
                <span className={`priority-indicator ${getPriorityClass(incident.priority)}`}>
                  {incident.priority}
                </span>
              </div>
              <div className={`incident-status ${getStatusClass(incident.status)}`}>
                <FontAwesomeIcon icon={getStatusIcon(incident.status)} />
                <span>{incident.status}</span>
              </div>
            </div>
            
            <div className="incident-description">
              <p>{incident.description}</p>
            </div>
            
            <div className="incident-details">
              <div className="detail">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>Started: {incident.startTime}</span>
              </div>
              {incident.endTime && (
                <div className="detail">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>Resolved: {incident.endTime}</span>
                </div>
              )}
              <div className="detail">
                <FontAwesomeIcon icon={faUser} />
                <span>Assigned to: {incident.assignedTo}</span>
              </div>
            </div>
            
            <div className="incident-resolution">
              <strong>Resolution:</strong> {incident.resolution}
            </div>
            
            {incident.updates && incident.updates.length > 0 && (
              <div className="incident-updates">
                <h5>Updates</h5>
                {incident.updates.map((update, index) => (
                  <div key={index} className="update">
                    <div className="update-time">{update.time}</div>
                    <div className="update-message">{update.message}</div>
                    <div className="update-user">- {update.user}</div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="incident-actions">
              <button className="update-btn">Add Update</button>
              <button className="assign-btn">Reassign</button>
              {incident.status !== 'resolved' && (
                <button className="resolve-btn">Resolve Incident</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <div className="no-results">
          <p>No incidents found matching your criteria.</p>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Close
        </button>
        <button type="button" className="export-btn">
          Export Incidents
        </button>
      </div>
    </div>
  );
};

export default IncidentManagement;