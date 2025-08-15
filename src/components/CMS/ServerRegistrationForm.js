import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './com.css';
const ServerRegistrationForm = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('identification');
  
  // Initial form state
  const [formData, setFormData] = useState({
    // Identification
    ciId: '',
    ciName: '',
    hostname: '',
    ciType: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    assetTag: '',
    
    // Ownership & Responsibility
    ownerDepartment: '',
    primaryOwner: '',
    primaryContact: '',
    secondaryOwner: '',
    secondaryContact: '',
    supportVendor: '',
    
    // Location & Site Details
    dataCenter: '',
    rackId: '',
    rackPosition: '',
    roomFloor: '',
    geoCoordinates: '',
    
    // Technical Attributes
    cpuType: '',
    cpuSockets: '',
    coresPerCpu: '',
    logicalProcessors: '',
    ramCapacity: '',
    storageCapacity: '',
    raidConfig: '',
    powerSupplies: '',
    os: '',
    osLicense: '',
    firmwareVersion: '',
    nics: '',
    nicSpeed: '',
    clusterMembership: '',
    clusterName: '',
    
    // Dependency & Relationship Mapping
    upstreamDependencies: '',
    downstreamDependencies: '',
    associatedServices: '',
    
    // Criticality & Risk
    businessCriticality: 'Medium',
    serviceImpact: '',
    riskRating: 'Medium',
    
    // Compliance & Licensing
    licenseType: 'OEM',
    licenseExpiry: '',
    supportContract: 'No',
    contractExpiry: '',
    complianceRequirements: '',
    
    // Monitoring & Maintenance
    monitoringTool: '',
    lastMaintenance: '',
    nextMaintenance: '',
    firmwareHistory: '',
    incidentHistory: '',
    
    // Status
    lifecycleStatus: 'Active',
    commissionDate: '',
    decommissionDate: '',
    addedToCmdb: '',
    lastUpdated: ''
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
    console.log('Form submitted:', formData);
    alert('Server registration submitted successfully!');
    navigate('/dashboard');
  };

  const handleNext = () => {
    const sections = [
      'identification', 'ownership', 'location', 
      'technical', 'dependency', 'criticality',
      'compliance', 'monitoring', 'status'
    ];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const sections = [
      'identification', 'ownership', 'location', 
      'technical', 'dependency', 'criticality',
      'compliance', 'monitoring', 'status'
    ];
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1]);
    }
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'identification':
        return (
          <div className="form-section">
            <h3>1. Identification</h3>
            <div className="form-row">
              <div className="form-group">
                <label>CI ID</label>
                <input 
                  type="text" 
                  name="ciId" 
                  value={formData.ciId} 
                  onChange={handleChange}
                  placeholder="PHY-SRV-001"
                />
              </div>
              <div className="form-group">
                <label>CI Name</label>
                <input 
                  type="text" 
                  name="ciName" 
                  value={formData.ciName} 
                  onChange={handleChange}
                  placeholder="APP-SRV-01"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Hostname</label>
                <input 
                  type="text" 
                  name="hostname" 
                  value={formData.hostname} 
                  onChange={handleChange}
                  placeholder="server01.domain.com"
                />
              </div>
              <div className="form-group">
                <label>CI Type</label>
                <select name="ciType" value={formData.ciType} onChange={handleChange}>
                  <option value="">Select Type</option>
                  <option value="Rack Server">Rack Server</option>
                  <option value="Blade Server">Blade Server</option>
                  <option value="Tower Server">Tower Server</option>
                  <option value="Mainframe">Mainframe</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Manufacturer/Vendor</label>
                <select name="manufacturer" value={formData.manufacturer} onChange={handleChange}>
                  <option value="">Select Vendor</option>
                  <option value="Dell">Dell</option>
                  <option value="HPE">HPE</option>
                  <option value="Lenovo">Lenovo</option>
                  <option value="IBM">IBM</option>
                  <option value="Huawei">Huawei</option>
                  <option value="Cisco">Cisco</option>
                  <option value="Supermicro">Supermicro</option>
                </select>
              </div>
              <div className="form-group">
                <label>Model</label>
                <input 
                  type="text" 
                  name="model" 
                  value={formData.model} 
                  onChange={handleChange}
                  placeholder="PowerEdge R750"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Serial Number</label>
                <input 
                  type="text" 
                  name="serialNumber" 
                  value={formData.serialNumber} 
                  onChange={handleChange}
                  placeholder="ABC123456789"
                />
              </div>
              <div className="form-group">
                <label>Asset Tag</label>
                <input 
                  type="text" 
                  name="assetTag" 
                  value={formData.assetTag} 
                  onChange={handleChange}
                  placeholder="ASSET-00123"
                />
              </div>
            </div>
          </div>
        );
      
      case 'ownership':
        return (
          <div className="form-section">
            <h3>2. Ownership & Responsibility</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Owner Department</label>
                <select name="ownerDepartment" value={formData.ownerDepartment} onChange={handleChange}>
                  <option value="">Select Department</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Data Center">Data Center</option>
                  <option value="IT Operations">IT Operations</option>
                  <option value="Application Development">Application Development</option>
                  <option value="Database Administration">Database Administration</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Primary Owner</label>
                <input 
                  type="text" 
                  name="primaryOwner" 
                  value={formData.primaryOwner} 
                  onChange={handleChange}
                  placeholder="John Smith"
                />
              </div>
              <div className="form-group">
                <label>Contact Info</label>
                <input 
                  type="text" 
                  name="primaryContact" 
                  value={formData.primaryContact} 
                  onChange={handleChange}
                  placeholder="john.smith@company.com"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Secondary Owner</label>
                <input 
                  type="text" 
                  name="secondaryOwner" 
                  value={formData.secondaryOwner} 
                  onChange={handleChange}
                  placeholder="Jane Doe"
                />
              </div>
              <div className="form-group">
                <label>Contact Info</label>
                <input 
                  type="text" 
                  name="secondaryContact" 
                  value={formData.secondaryContact} 
                  onChange={handleChange}
                  placeholder="jane.doe@company.com"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Support Vendor/Contractor</label>
                <input 
                  type="text" 
                  name="supportVendor" 
                  value={formData.supportVendor} 
                  onChange={handleChange}
                  placeholder="Dell Support"
                />
              </div>
            </div>
          </div>
        );
      
      case 'location':
        return (
          <div className="form-section">
            <h3>3. Location & Site Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Data Center / Site Name</label>
                <select name="dataCenter" value={formData.dataCenter} onChange={handleChange}>
                  <option value="">Select Data Center</option>
                  <option value="DC1">Primary Data Center (DC1)</option>
                  <option value="DC2">Secondary Data Center (DC2)</option>
                  <option value="DR Site">Disaster Recovery Site</option>
                  <option value="Branch Office">Branch Office</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Rack ID</label>
                <input 
                  type="text" 
                  name="rackId" 
                  value={formData.rackId} 
                  onChange={handleChange}
                  placeholder="RACK-A01"
                />
              </div>
              <div className="form-group">
                <label>Rack Position (U Number)</label>
                <input 
                  type="text" 
                  name="rackPosition" 
                  value={formData.rackPosition} 
                  onChange={handleChange}
                  placeholder="U12-U15"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Room / Floor</label>
                <input 
                  type="text" 
                  name="roomFloor" 
                  value={formData.roomFloor} 
                  onChange={handleChange}
                  placeholder="Server Room B, Floor 3"
                />
              </div>
              <div className="form-group">
                <label>Geo-Coordinates</label>
                <input 
                  type="text" 
                  name="geoCoordinates" 
                  value={formData.geoCoordinates} 
                  onChange={handleChange}
                  placeholder="9.005401, 38.763611"
                />
              </div>
            </div>
          </div>
        );
      
      case 'technical':
        return (
          <div className="form-section">
            <h3>4. Technical Attributes</h3>
            <div className="form-row">
              <div className="form-group">
                <label>CPU Type</label>
                <input 
                  type="text" 
                  name="cpuType" 
                  value={formData.cpuType} 
                  onChange={handleChange}
                  placeholder="Intel Xeon Gold 6230"
                />
              </div>
              <div className="form-group">
                <label>Number of CPU Sockets</label>
                <input 
                  type="number" 
                  name="cpuSockets" 
                  value={formData.cpuSockets} 
                  onChange={handleChange}
                  placeholder="2"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Cores per CPU</label>
                <input 
                  type="number" 
                  name="coresPerCpu" 
                  value={formData.coresPerCpu} 
                  onChange={handleChange}
                  placeholder="20"
                />
              </div>
              <div className="form-group">
                <label>Total Logical Processors</label>
                <input 
                  type="number" 
                  name="logicalProcessors" 
                  value={formData.logicalProcessors} 
                  onChange={handleChange}
                  placeholder="80"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>RAM Capacity (GB)</label>
                <input 
                  type="text" 
                  name="ramCapacity" 
                  value={formData.ramCapacity} 
                  onChange={handleChange}
                  placeholder="512 GB"
                />
              </div>
              <div className="form-group">
                <label>Internal Storage Capacity</label>
                <input 
                  type="text" 
                  name="storageCapacity" 
                  value={formData.storageCapacity} 
                  onChange={handleChange}
                  placeholder="4 TB SSD"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>RAID Configuration</label>
                <input 
                  type="text" 
                  name="raidConfig" 
                  value={formData.raidConfig} 
                  onChange={handleChange}
                  placeholder="RAID 10"
                />
              </div>
              <div className="form-group">
                <label>Number of Power Supplies</label>
                <input 
                  type="text" 
                  name="powerSupplies" 
                  value={formData.powerSupplies} 
                  onChange={handleChange}
                  placeholder="2 (Redundant)"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Operating System</label>
                <select name="os" value={formData.os} onChange={handleChange}>
                  <option value="">Select OS</option>
                  <option value="Windows Server 2022">Windows Server 2022</option>
                  <option value="RHEL 9">Red Hat Enterprise Linux 9</option>
                  <option value="Ubuntu Server 22.04">Ubuntu Server 22.04</option>
                  <option value="SUSE Linux Enterprise Server">SUSE Linux Enterprise Server</option>
                  <option value="VMware ESXi">VMware ESXi</option>
                </select>
              </div>
              <div className="form-group">
                <label>OS License Key / Subscription ID</label>
                <input 
                  type="text" 
                  name="osLicense" 
                  value={formData.osLicense} 
                  onChange={handleChange}
                  placeholder="XXXXX-XXXXX-XXXXX-XXXXX"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Firmware/BIOS Version</label>
                <input 
                  type="text" 
                  name="firmwareVersion" 
                  value={formData.firmwareVersion} 
                  onChange={handleChange}
                  placeholder="2.8.1"
                />
              </div>
              <div className="form-group">
                <label>Number of Network Interfaces</label>
                <input 
                  type="number" 
                  name="nics" 
                  value={formData.nics} 
                  onChange={handleChange}
                  placeholder="4"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>NIC Speed</label>
                <select name="nicSpeed" value={formData.nicSpeed} onChange={handleChange}>
                  <option value="">Select Speed</option>
                  <option value="1GbE">1GbE</option>
                  <option value="10GbE">10GbE</option>
                  <option value="25GbE">25GbE</option>
                  <option value="40GbE">40GbE</option>
                  <option value="100GbE">100GbE</option>
                </select>
              </div>
              <div className="form-group">
                <label>Cluster Membership</label>
                <select name="clusterMembership" value={formData.clusterMembership} onChange={handleChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
                {formData.clusterMembership === 'Yes' && (
                  <input 
                    type="text" 
                    name="clusterName" 
                    value={formData.clusterName} 
                    onChange={handleChange}
                    placeholder="Cluster Name"
                    style={{marginTop: '10px'}}
                  />
                )}
              </div>
            </div>
          </div>
        );
      
      case 'dependency':
        return (
          <div className="form-section">
            <h3>5. Dependency & Relationship Mapping</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Upstream Dependencies</label>
                <textarea 
                  name="upstreamDependencies" 
                  value={formData.upstreamDependencies} 
                  onChange={handleChange}
                  placeholder="Core Switch (SW-001), Firewall (FW-001)"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Downstream Dependencies</label>
                <textarea 
                  name="downstreamDependencies" 
                  value={formData.downstreamDependencies} 
                  onChange={handleChange}
                  placeholder="VM-001 (Database Server), App-002 (Web Application)"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Associated Services</label>
                <textarea 
                  name="associatedServices" 
                  value={formData.associatedServices} 
                  onChange={handleChange}
                  placeholder="Core Banking System, Mobile Banking API, Payment Gateway"
                  rows="3"
                />
              </div>
            </div>
          </div>
        );
      
      case 'criticality':
        return (
          <div className="form-section">
            <h3>6. Criticality & Risk</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Business Criticality</label>
                <select name="businessCriticality" value={formData.businessCriticality} onChange={handleChange}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="form-group">
                <label>Service Impact Level</label>
                <input 
                  type="text" 
                  name="serviceImpact" 
                  value={formData.serviceImpact} 
                  onChange={handleChange}
                  placeholder="Affects 10,000+ customers"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Risk Rating</label>
                <select name="riskRating" value={formData.riskRating} onChange={handleChange}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'compliance':
        return (
          <div className="form-section">
            <h3>7. Compliance & Licensing</h3>
            <div className="form-row">
              <div className="form-group">
                <label>OS License Type</label>
                <select name="licenseType" value={formData.licenseType} onChange={handleChange}>
                  <option value="OEM">OEM</option>
                  <option value="Volume License">Volume License</option>
                  <option value="Subscription">Subscription</option>
                </select>
              </div>
              <div className="form-group">
                <label>License Expiry Date</label>
                <input 
                  type="date" 
                  name="licenseExpiry" 
                  value={formData.licenseExpiry} 
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Support Contract</label>
                <select name="supportContract" value={formData.supportContract} onChange={handleChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
                {formData.supportContract === 'Yes' && (
                  <div className="form-group" style={{marginTop: '10px'}}>
                    <label>Contract Expiry Date</label>
                    <input 
                      type="date" 
                      name="contractExpiry" 
                      value={formData.contractExpiry} 
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Compliance Requirements</label>
                <textarea 
                  name="complianceRequirements" 
                  value={formData.complianceRequirements} 
                  onChange={handleChange}
                  placeholder="ISO 27001, PCI DSS, NBE Guidelines"
                  rows="3"
                />
              </div>
            </div>
          </div>
        );
      
      case 'monitoring':
        return (
          <div className="form-section">
            <h3>8. Monitoring & Maintenance</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Monitoring Tool</label>
                <select name="monitoringTool" value={formData.monitoringTool} onChange={handleChange}>
                  <option value="">Select Tool</option>
                  <option value="PRTG">PRTG</option>
                  <option value="Grafana">Grafana</option>
                  <option value="HPE OneView">HPE OneView</option>
                  <option value="Dell OpenManage">Dell OpenManage</option>
                  <option value="Nagios">Nagios</option>
                  <option value="Zabbix">Zabbix</option>
                </select>
              </div>
              <div className="form-group">
                <label>Last Maintenance Date</label>
                <input 
                  type="date" 
                  name="lastMaintenance" 
                  value={formData.lastMaintenance} 
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Next Scheduled Maintenance</label>
                <input 
                  type="date" 
                  name="nextMaintenance" 
                  value={formData.nextMaintenance} 
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Firmware Upgrade History</label>
                <textarea 
                  name="firmwareHistory" 
                  value={formData.firmwareHistory} 
                  onChange={handleChange}
                  placeholder="2023-06-15: Updated to v2.5.1\n2023-01-10: Updated to v2.4.3"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Incident History Link</label>
                <input 
                  type="text" 
                  name="incidentHistory" 
                  value={formData.incidentHistory} 
                  onChange={handleChange}
                  placeholder="https://itsm.company.com/incidents/SRV-001"
                />
              </div>
            </div>
          </div>
        );
      
      case 'status':
        return (
          <div className="form-section">
            <h3>9. Status</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Lifecycle Status</label>
                <select name="lifecycleStatus" value={formData.lifecycleStatus} onChange={handleChange}>
                  <option value="Planned">Planned</option>
                  <option value="Active">Active</option>
                  <option value="In Maintenance">In Maintenance</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>
              <div className="form-group">
                <label>Commission Date</label>
                <input 
                  type="date" 
                  name="commissionDate" 
                  value={formData.commissionDate} 
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Decommission Date</label>
                <input 
                  type="date" 
                  name="decommissionDate" 
                  value={formData.decommissionDate} 
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Date Added to CMDB</label>
                <input 
                  type="date" 
                  name="addedToCmdb" 
                  value={formData.addedToCmdb} 
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Last Updated</label>
                <input 
                  type="date" 
                  name="lastUpdated" 
                  value={formData.lastUpdated} 
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      identification: "1. Identification",
      ownership: "2. Ownership & Responsibility",
      location: "3. Location & Site Details",
      technical: "4. Technical Attributes",
      dependency: "5. Dependency & Relationship Mapping",
      criticality: "6. Criticality & Risk",
      compliance: "7. Compliance & Licensing",
      monitoring: "8. Monitoring & Maintenance",
      status: "9. Status"
    };
    return titles[activeSection] || "Server Registration";
  };

  return (
    <div className="server-registration-form">
      <div className="form-header">
        <h1>Physical Server CI Registration</h1>
        <p>Complete all sections to register a new physical server in the CMDB</p>
      </div>
      
      <div className="form-container">
        <div className="form-navigation">
          <div className={`nav-item ${activeSection === 'identification' ? 'active' : ''}`} onClick={() => setActiveSection('identification')}>
            <span>1</span> Identification
          </div>
          <div className={`nav-item ${activeSection === 'ownership' ? 'active' : ''}`} onClick={() => setActiveSection('ownership')}>
            <span>2</span> Ownership
          </div>
          <div className={`nav-item ${activeSection === 'location' ? 'active' : ''}`} onClick={() => setActiveSection('location')}>
            <span>3</span> Location
          </div>
          <div className={`nav-item ${activeSection === 'technical' ? 'active' : ''}`} onClick={() => setActiveSection('technical')}>
            <span>4</span> Technical
          </div>
          <div className={`nav-item ${activeSection === 'dependency' ? 'active' : ''}`} onClick={() => setActiveSection('dependency')}>
            <span>5</span> Dependencies
          </div>
          <div className={`nav-item ${activeSection === 'criticality' ? 'active' : ''}`} onClick={() => setActiveSection('criticality')}>
            <span>6</span> Criticality
          </div>
          <div className={`nav-item ${activeSection === 'compliance' ? 'active' : ''}`} onClick={() => setActiveSection('compliance')}>
            <span>7</span> Compliance
          </div>
          <div className={`nav-item ${activeSection === 'monitoring' ? 'active' : ''}`} onClick={() => setActiveSection('monitoring')}>
            <span>8</span> Monitoring
          </div>
          <div className={`nav-item ${activeSection === 'status' ? 'active' : ''}`} onClick={() => setActiveSection('status')}>
            <span>9</span> Status
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-section-header">
            <h2>{getSectionTitle()}</h2>
          </div>
          
          {renderSection()}
          
          <div className="form-actions">
            {activeSection !== 'identification' && (
              <button type="button" className="btn-previous" onClick={handlePrevious}>
                Previous
              </button>
            )}
            
            {activeSection !== 'status' ? (
              <button type="button" className="btn-next" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit" className="btn-submit">
                Register Server
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServerRegistrationForm;