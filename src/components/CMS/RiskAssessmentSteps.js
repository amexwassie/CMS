import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, faCheckCircle, faArrowRight,
  faClipboardList, faSearch, faChartBar, 
  faCog, faFileAlt, faCheckSquare
} from '@fortawesome/free-solid-svg-icons';

const RiskAssessmentSteps = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      id: 1,
      title: "System Characterization",
      description: "Define the scope and boundaries of the system being assessed",
      icon: faClipboardList,
      form: "SystemCharacterizationForm"
    },
    {
      id: 2,
      title: "Threat Identification",
      description: "Identify potential threats to the system",
      icon: faSearch,
      form: "ThreatIdentificationForm"
    },
    {
      id: 3,
      title: "Vulnerability Identification",
      description: "Identify vulnerabilities that could be exploited",
      icon: faChartBar,
      form: "VulnerabilityIdentificationForm"
    },
    {
      id: 4,
      title: "Control Analysis",
      description: "Analyze existing security controls",
      icon: faCog,
      form: "ControlAnalysisForm"
    },
    {
      id: 5,
      title: "Likelihood Determination",
      description: "Determine the likelihood of threat exploitation",
      icon: faChartBar,
      form: "LikelihoodDeterminationForm"
    },
    {
      id: 6,
      title: "Impact Analysis",
      description: "Analyze the impact of potential incidents",
      icon: faFileAlt,
      form: "ImpactAnalysisForm"
    },
    {
      id: 7,
      title: "Risk Determination",
      description: "Determine the level of risk for each threat",
      icon: faCheckSquare,
      form: "RiskDeterminationForm"
    },
    {
      id: 8,
      title: "Control Recommendations",
      description: "Recommend controls to mitigate identified risks",
      icon: faCog,
      form: "ControlRecommendationsForm"
    },
    {
      id: 9,
      title: "Results Documentation",
      description: "Document the risk assessment results",
      icon: faFileAlt,
      form: "ResultsDocumentationForm"
    }
  ];

  const handleStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1);
    } else {
      // All steps completed
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const isStepCompleted = (stepId) => completedSteps.includes(stepId);

  return (
    <div className="modal-overlay">
      <div className="modal-content risk-assessment-steps">
        <div className="modal-header">
          <h2>
            <FontAwesomeIcon icon={faClipboardList} /> Risk Assessment Process
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="progress-indicator">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(completedSteps.length / steps.length) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Step {currentStep} of {steps.length} • {Math.round((completedSteps.length / steps.length) * 100)}% Complete
            </div>
          </div>
          
          <div className="steps-container">
            {steps.map(step => (
              <div 
                key={step.id} 
                className={`step-card ${currentStep === step.id ? 'active' : ''} ${isStepCompleted(step.id) ? 'completed' : ''}`}
              >
                <div className="step-header">
                  <div className="step-number">
                    {isStepCompleted(step.id) ? (
                      <FontAwesomeIcon icon={faCheckCircle} className="completed-icon" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="step-info">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  <div className="step-icon">
                    <FontAwesomeIcon icon={step.icon} />
                  </div>
                </div>
                
                {currentStep === step.id && (
                  <div className="step-actions">
                    <button 
                      className="complete-btn"
                      onClick={() => handleStepComplete(step.id)}
                    >
                      {step.id === steps.length ? 'Complete Assessment' : 'Mark Complete'}
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentSteps;