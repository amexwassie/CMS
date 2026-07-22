import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import '../style/ChangeManagementForms.css';

const ApprovalWorkflow = ({ onClose }) => {
  const [workflows] = useState([
    {
      id: 1,
      name: 'Standard Change Process',
      description: 'Pre-approved changes with low risk and common occurrence',
      steps: [
        { name: 'Submit Request', role: 'Requester', approvalRequired: false },
        { name: 'Automated Approval', role: 'System', approvalRequired: false },
        { name: 'Implementation', role: 'Implementer', approvalRequired: false }
      ],
      active: true
    },
    {
      id: 2,
      name: 'Normal Change Process',
      description: 'Changes requiring CAB review and approval',
      steps: [
        { name: 'Submit Request', role: 'Requester', approvalRequired: false },
        { name: 'Initial Review', role: 'Change Manager', approvalRequired: true },
        { name: 'CAB Review', role: 'CAB Members', approvalRequired: true },
        { name: 'Approval', role: 'Change Manager', approvalRequired: true },
        { name: 'Implementation', role: 'Implementer', approvalRequired: false },
        { name: 'Post-Implementation Review', role: 'Change Manager', approvalRequired: false }
      ],
      active: true
    },
    {
      id: 3,
      name: 'Emergency Change Process',
      description: 'Expedited process for urgent changes requiring immediate implementation',
      steps: [
        { name: 'Submit Emergency Request', role: 'Requester', approvalRequired: false },
        { name: 'Immediate Assessment', role: 'Change Manager', approvalRequired: true },
        { name: 'Emergency CAB Approval', role: 'ECAB Members', approvalRequired: true },
        { name: 'Implementation', role: 'Implementer', approvalRequired: false },
        { name: 'Post-Implementation Review', role: 'Change Manager', approvalRequired: false },
        { name: 'Documentation', role: 'Change Coordinator', approvalRequired: false }
      ],
      active: true
    }
  ]);

  const [pendingApprovals] = useState([
    {
      id: 101,
      title: 'Database Schema Update',
      requester: 'John Smith',
      submitted: '2023-06-15T10:30:00',
      type: 'normal',
      currentStep: 'CAB Review',
      assignedTo: 'CAB Members',
      deadline: '2023-06-20T17:00:00'
    },
    {
      id: 102,
      title: 'Security Patch Implementation',
      requester: 'Sarah Johnson',
      submitted: '2023-06-16T14:45:00',
      type: 'standard',
      currentStep: 'Automated Approval',
      assignedTo: 'System',
      deadline: '2023-06-17T09:00:00'
    },
    {
      id: 103,
      title: 'Network Outage Resolution',
      requester: 'IT Operations',
      submitted: '2023-06-16T16:20:00',
      type: 'emergency',
      currentStep: 'Emergency CAB Approval',
      assignedTo: 'ECAB Members',
      deadline: '2023-06-16T18:00:00'
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0]);

  return (
    <div className="approval-workflow">
      <div className="workflow-container">
        <div className="workflow-list">
          <h3>Approval Workflows</h3>
          {workflows.map(workflow => (
            <div 
              key={workflow.id} 
              className={`workflow-item ${selectedWorkflow.id === workflow.id ? 'active' : ''}`}
              onClick={() => setSelectedWorkflow(workflow)}
            >
              <h4>{workflow.name}</h4>
              <p>{workflow.description}</p>
              <div className="workflow-status">
                {workflow.active ? (
                  <span className="status-active">Active</span>
                ) : (
                  <span className="status-inactive">Inactive</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="workflow-details">
          <h3>{selectedWorkflow.name} Workflow</h3>
          <p>{selectedWorkflow.description}</p>
          
          <div className="workflow-steps">
            {selectedWorkflow.steps.map((step, index) => (
              <div key={index} className="workflow-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-details">
                  <h4>{step.name}</h4>
                  <div className="step-role">
                    <FontAwesomeIcon icon={faUser} />
                    <span>{step.role}</span>
                  </div>
                  {step.approvalRequired && (
                    <div className="approval-required">Approval Required</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pending-approvals">
        <h3>Pending Approvals</h3>
        {pendingApprovals.map(approval => (
          <div key={approval.id} className="approval-item">
            <div className="approval-header">
              <h4>{approval.title}</h4>
              <span className={`request-type ${approval.type}`}>{approval.type}</span>
            </div>
            <div className="approval-details">
              <div className="detail-row">
                <span className="label">Requester:</span>
                <span className="value">{approval.requester}</span>
              </div>
              <div className="detail-row">
                <span className="label">Current Step:</span>
                <span className="value">{approval.currentStep}</span>
              </div>
              <div className="detail-row">
                <span className="label">Assigned To:</span>
                <span className="value">{approval.assignedTo}</span>
              </div>
              <div className="detail-row">
                <span className="label">Deadline:</span>
                <span className="value">
                  {new Date(approval.deadline).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="approval-actions">
              <button className="approve-btn">
                <FontAwesomeIcon icon={faCheckCircle} /> Approve
              </button>
              <button className="reject-btn">
                <FontAwesomeIcon icon={faTimesCircle} /> Reject
              </button>
              <button className="details-btn">
                <FontAwesomeIcon icon={faClock} /> Defer
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          Close
        </button>
        <button type="button" className="configure-btn">
          Configure Workflows
        </button>
      </div>
    </div>
  );
};

export default ApprovalWorkflow;