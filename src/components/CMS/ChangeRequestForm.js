import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../style/ChangeManagementForms.css';

const ChangeRequestForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'normal',
    priority: 'medium',
    description: '',
    justification: '',
    impact: '',
    risk: 'medium',
    plannedDate: '',
    implementationDetails: '',
    rollbackPlan: '',
    requester: '',
    department: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Change Request Submitted:', formData);
    // API call would go here
    alert('Change request submitted successfully!');
    onClose();
  };

  return (
    <div className="change-form">
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Change Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Change Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="normal">Normal</option>
                <option value="standard">Standard</option>
                <option value="emergency">Emergency</option>
                <option value="major">Major</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Priority *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label>Planned Implementation Date *</label>
              <input
                type="datetime-local"
                name="plannedDate"
                value={formData.plannedDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Change Details</h3>
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Business Justification *</label>
            <textarea
              name="justification"
              value={formData.justification}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Impact Analysis *</label>
            <textarea
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Implementation Details</h3>
          <div className="form-group">
            <label>Implementation Steps *</label>
            <textarea
              name="implementationDetails"
              value={formData.implementationDetails}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Rollback Plan *</label>
            <textarea
              name="rollbackPlan"
              value={formData.rollbackPlan}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Risk Level *</label>
              <select
                name="risk"
                value={formData.risk}
                onChange={handleChange}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Requester Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Requester Name *</label>
              <input
                type="text"
                name="requester"
                value={formData.requester}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Department *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} /> Cancel
          </button>
          <button type="submit" className="submit-btn">
            <FontAwesomeIcon icon={faSave} /> Submit Change Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeRequestForm;