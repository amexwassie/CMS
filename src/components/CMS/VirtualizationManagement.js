// src/components/VirtualizationManagement.jsx
import React, { useState } from 'react';

const VirtualizationManagement = () => {
  const [activeTab, setActiveTab] = useState('hypervisors');
  const [activeForm, setActiveForm] = useState('');

  return (
    <div className="virtualization-management">
      <div className="header">
        <h1>Virtualization & VM Management</h1>
        <p>Manage your virtualization platforms, clusters, and virtual machines</p>
      </div>
      
      <div className="tabs">
        <button 
          className={activeTab === 'hypervisors' ? 'active' : ''}
          onClick={() => setActiveTab('hypervisors')}
        >
          <i className="fas fa-server"></i> Hypervisors
        </button>
        <button 
          className={activeTab === 'clusters' ? 'active' : ''}
          onClick={() => setActiveTab('clusters')}
        >
          <i className="fas fa-network-wired"></i> VM Clusters
        </button>
        <button 
          className={activeTab === 'vms' ? 'active' : ''}
          onClick={() => setActiveTab('vms')}
        >
          <i className="fas fa-cube"></i> Virtual Machines
        </button>
      </div>
      
      <div className="content">
        {activeTab === 'hypervisors' && (
          <HypervisorsSection 
            activeForm={activeForm} 
            setActiveForm={setActiveForm} 
          />
        )}
        
        {activeTab === 'clusters' && (
          <ClustersSection 
            activeForm={activeForm} 
            setActiveForm={setActiveForm} 
          />
        )}
        
        {activeTab === 'vms' && (
          <VMsSection 
            activeForm={activeForm} 
            setActiveForm={setActiveForm} 
          />
        )}
      </div>
    </div>
  );
};

// Hypervisors Section
const HypervisorsSection = ({ activeForm, setActiveForm }) => {
  const [hypervisors] = useState([
    { id: 'HV-001', name: 'ESXi-Prod-01', type: 'VMware ESXi', version: '7.0.3', status: 'Active', vms: 24 },
    { id: 'HV-002', name: 'HyperV-DR-01', type: 'Microsoft Hyper-V', version: '2019', status: 'Active', vms: 18 },
    { id: 'HV-003', name: 'KVM-Dev-01', type: 'KVM', version: '5.8', status: 'Maintenance', vms: 12 },
  ]);
  
  return (
    <div className="section">
      <div className="section-header">
        <h2>Virtualization Platforms</h2>
        <button className="btn-primary" onClick={() => setActiveForm('hypervisor')}>
          <i className="fas fa-plus"></i> Add Hypervisor
        </button>
      </div>
      
      {activeForm === 'hypervisor' ? (
        <HypervisorForm onCancel={() => setActiveForm('')} />
      ) : (
        <div className="cards-grid">
          {hypervisors.map(hv => (
            <div key={hv.id} className="card">
              <div className="card-header">
                <div className={`status-badge ${hv.status.toLowerCase()}`}>{hv.status}</div>
                <h3>{hv.name}</h3>
                <span className="id">{hv.id}</span>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <span>Type:</span>
                  <span>{hv.type}</span>
                </div>
                <div className="info-row">
                  <span>Version:</span>
                  <span>{hv.version}</span>
                </div>
                <div className="info-row">
                  <span>VMs Running:</span>
                  <span className="highlight">{hv.vms}</span>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn-action">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn-action">
                  <i className="fas fa-chart-line"></i> Monitor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HypervisorForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    ciId: 'HV-',
    name: '',
    type: 'VMware ESXi',
    version: '',
    managementIp: '',
    hostServer: '',
    cluster: '',
    status: 'Active',
    commissionDate: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="form-container">
      <div className="form-section">
        <h3>Hypervisor Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>CI ID</label>
            <input 
              type="text" 
              name="ciId" 
              value={formData.ciId} 
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              placeholder="ESXi-Prod-01"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="VMware ESXi">VMware ESXi</option>
              <option value="Microsoft Hyper-V">Microsoft Hyper-V</option>
              <option value="KVM">KVM</option>
              <option value="Proxmox">Proxmox</option>
              <option value="Xen">Xen</option>
            </select>
          </div>
          <div className="form-group">
            <label>Version</label>
            <input 
              type="text" 
              name="version" 
              value={formData.version} 
              onChange={handleChange}
              placeholder="7.0.3"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Management IP</label>
            <input 
              type="text" 
              name="managementIp" 
              value={formData.managementIp} 
              onChange={handleChange}
              placeholder="192.168.1.10"
            />
          </div>
          <div className="form-group">
            <label>Host Server</label>
            <input 
              type="text" 
              name="hostServer" 
              value={formData.hostServer} 
              onChange={handleChange}
              placeholder="SRV-PHY-001"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3>Configuration & Status</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Cluster</label>
            <input 
              type="text" 
              name="cluster" 
              value={formData.cluster} 
              onChange={handleChange}
              placeholder="Prod-Cluster-01"
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
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
        
        <div className="form-group">
          <label>Notes</label>
          <textarea 
            name="notes" 
            value={formData.notes} 
            onChange={handleChange}
            rows="3"
            placeholder="Additional configuration details..."
          />
        </div>
        <button className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-submit">
          Save Hypervisor
        </button>
      </div>
      
    
    </div>
  );
};

// VM Clusters Section
const ClustersSection = ({ activeForm, setActiveForm }) => {
  const [clusters] = useState([
    { id: 'CL-001', name: 'Production Cluster', type: 'vSphere', hypervisors: 3, ha: true, dr: true, status: 'Active' },
    { id: 'CL-002', name: 'Development Cluster', type: 'Hyper-V', hypervisors: 2, ha: false, dr: false, status: 'Active' },
    { id: 'CL-003', name: 'DR Cluster', type: 'vSphere', hypervisors: 2, ha: true, dr: true, status: 'Standby' },
  ]);
  
  return (
    <div className="section">
      <div className="section-header">
        <h2>VM Clusters</h2>
        <button className="btn-primary" onClick={() => setActiveForm('cluster')}>
          <i className="fas fa-plus"></i> Add Cluster
        </button>
      </div>
      
      {activeForm === 'cluster' ? (
        <ClusterForm onCancel={() => setActiveForm('')} />
      ) : (
        <div className="cards-grid">
          {clusters.map(cluster => (
            <div key={cluster.id} className="card">
              <div className="card-header">
                <div className={`status-badge ${cluster.status.toLowerCase()}`}>{cluster.status}</div>
                <h3>{cluster.name}</h3>
                <span className="id">{cluster.id}</span>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <span>Type:</span>
                  <span>{cluster.type}</span>
                </div>
                <div className="info-row">
                  <span>Hypervisors:</span>
                  <span className="highlight">{cluster.hypervisors}</span>
                </div>
                <div className="features">
                  {cluster.ha && <span className="feature ha">HA</span>}
                  {cluster.dr && <span className="feature dr">DR</span>}
                </div>
              </div>
              <div className="card-actions">
                <button className="btn-action">
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn-action">
                  <i className="fas fa-list"></i> View VMs
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ClusterForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    clusterId: 'CL-',
    name: '',
    type: 'vSphere',
    description: '',
    haEnabled: false,
    drEnabled: false,
    status: 'Active',
    hypervisors: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  return (
    <div className="form-container">
      <div className="form-section">
        <h3>Cluster Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Cluster ID</label>
            <input 
              type="text" 
              name="clusterId" 
              value={formData.clusterId} 
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              placeholder="Production Cluster"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="vSphere">vSphere</option>
              <option value="Hyper-V">Hyper-V</option>
              <option value="KVM">KVM</option>
              <option value="Proxmox">Proxmox</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Standby">Standby</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3>Features & Configuration</h3>
        <div className="form-row">
          <div className="form-group">
            <label>
              <input 
                type="checkbox" 
                name="haEnabled" 
                checked={formData.haEnabled} 
                onChange={handleChange}
              />
              High Availability (HA) Enabled
            </label>
          </div>
          <div className="form-group">
            <label>
              <input 
                type="checkbox" 
                name="drEnabled" 
                checked={formData.drEnabled} 
                onChange={handleChange}
              />
              Disaster Recovery (DR) Enabled
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            rows="3"
            placeholder="Cluster purpose and configuration details..."
          />
        </div>
      </div>
      
      <div className="form-section">
        <h3>Hypervisors</h3>
        <div className="form-group">
          <label>Select Hypervisors</label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" /> HV-001 (ESXi-Prod-01)
            </label>
            <label>
              <input type="checkbox" /> HV-002 (HyperV-DR-01)
            </label>
            <label>
              <input type="checkbox" /> HV-003 (KVM-Dev-01)
            </label>
          </div>
        </div>
        <button className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-submit">
          Save Cluster
        </button>
      </div>
      
      
    </div>
  );
};

// Virtual Machines Section
const VMsSection = ({ activeForm, setActiveForm }) => {
  const [vms, setVms] = useState([
    { id: 'VM-001', name: 'APP-SRV-01', type: 'Application Server', os: 'Windows Server 2022', status: 'Active', cpu: 4, ram: 16, storage: 120 },
    { id: 'VM-002', name: 'DB-SRV-01', type: 'Database Server', os: 'RHEL 8', status: 'Active', cpu: 8, ram: 32, storage: 500 },
    { id: 'VM-003', name: 'WEB-SRV-01', type: 'Web Server', os: 'Ubuntu 20.04', status: 'Active', cpu: 2, ram: 8, storage: 50 },
    { id: 'VM-004', name: 'FILE-SRV-01', type: 'File Server', os: 'Windows Server 2019', status: 'Maintenance', cpu: 4, ram: 16, storage: 200 },
  ]);
   const addVM = (newVM) => {
    setVms((prevVms) => [...prevVms, newVM]);
  };
  return (
    <div className="section">
      <div className="section-header">
        <h2>Virtual Machines</h2>
        <div className="actions">
          <button className="btn-primary" onClick={() => setActiveForm('vm')}>
            <i className="fas fa-plus"></i> Add VM
          </button>
          <div className="search-bar">
            <input type="text" placeholder="Search VMs..." />
            <i className="fas fa-search"></i>
          </div>
        </div>
      </div>
      
      {activeForm === 'vm' ? (
        <VMForm onCancel={() => setActiveForm('')} addVM={addVM} />
      ) : (
        <div className="vm-table-container">
          <table className="vm-table">
            <thead>
              <tr>
                <th>CI ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>OS</th>
                <th>vCPU</th>
                <th>RAM (GB)</th>
                <th>Storage (GB)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vms.map(vm => (
                <tr key={vm.id}>
                  <td>{vm.id}</td>
                  <td>
                    <div className="vm-name">
                      <i className="fas fa-cube"></i>
                      {vm.name}
                    </div>
                  </td>
                  <td>{vm.type}</td>
                  <td>{vm.os}</td>
                  <td>{vm.cpu}</td>
                  <td>{vm.ram}</td>
                  <td>{vm.storage}</td>
                  <td>
                    <div className={`status-badge ${vm.status.toLowerCase()}`}>
                      {vm.status}
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-icon" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-icon" title="Monitor">
                        <i className="fas fa-chart-line"></i>
                      </button>
                      <button className="btn-icon" title="Console">
                        <i className="fas fa-desktop"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const VMForm = ({ onCancel, addVM }) => {
  const [formData, setFormData] = useState({
    Id: '', // Leave empty for generation on submission
    name: '',
    hostname: '', // Add if applicable
    ciType: 'Application VM',
    hypervisor: 'HV-001',
    cluster: 'CL-001',
    owner: {
      department: '',
      primary: {
        name: '',
        employeeId: '',
        contact: ''
      },
      secondary: {
        name: '',
        contact: ''
      }
    },
    technical: {
      vCPU: 2,
      ram: 4,
      diskSize: 50,
      diskType: 'Thin Provisioned',
      os: {
        name: '',
        version: ''
      },
      ipAddresses: [],
      vlanIds: [],
      nicCount: 1,
      snapshots: {
        policy: 'Daily',
        lastSnapshot: null
      },
      backups: {
        status: false, // Change to boolean
        lastBackup: null,
        backupTool: ''
      }
    },
    criticality: {
      businessCriticality: 'Medium',
      slaImpact: '',
      riskRating: 'Medium'
    },
    status: {
      lifecycle: 'Active',
      commissionDate: Date.now(),
      decommissionDate: null
    },
    monitoring: {
      tool: '',
      agentInstalled: false,
      monitoringURL: ''
    },
    security: {
      encrypted: false,
      securityGroups: [],
      compliance: []
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

   const handleSubmit = async () => {
  if (formData.vmName && formData.vcpu && formData.ram) {
const newVM = {
  Id: `VM-${String(Date.now()).slice(-4)}`, // Ensure uniqueness or find an alternative method
  Name: formData.Name,
  hostname: formData.hostname,
  ciType: formData.ciType,
  hypervisor: formData.hypervisor,
  cluster: formData.cluster || null,
  owner: {
    department: formData.department,
    primary: {
      name: formData.name,
      employeeId: formData.primaryEmployeeId,
      contact: formData.primaryContact
    },
    secondary: {
      name: formData.secondaryOwner,
      contact: formData.secondaryContact
    }
  },
  technical: {
    vCPU: formData.vcpu,
    ram: formData.ram,
    diskSize: formData.diskSize,
    diskType: formData.diskType,
    os: {
      name: formData.osName,
      version: formData.osVersion,
      architecture: formData.osArchitecture
    },
    ipAddresses: formData.ipAddresses || [],
    vlanIds: formData.vlanIds || [],
    nicCount: formData.nicCount || 1,
    snapshots: {
      policy: formData.snapshotPolicy || null,
      lastSnapshot: null
    },
    backups: {
      status: formData.backupStatus || false,
      lastBackup: null,
      backupTool: formData.backupTool || null
    }
  },
  dependencies: {
    upstream: [],
    downstream: []
  },
  criticality: {
    businessCriticality: formData.businessCriticality || 'Medium',
    slaImpact: formData.slaImpact || null,
    riskRating: formData.riskRating || 'Medium'
  },
  status: {
    lifecycle: 'Active',
    commissionDate: Date.now(),
    decommissionDate: null,
    lastUpdated: Date.now()
  },
  monitoring: {
    tool: formData.monitoringTool || null,
    agentInstalled: formData.agentInstalled || false,
    monitoringURL: formData.monitoringURL || null
  },
  security: {
    encrypted: formData.encrypted || false,
    securityGroups: formData.securityGroups || [],
    compliance: formData.compliance || []
  }
};

    try {
      const response = await fetch('http://localhost:5000/api/virtualmachines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVM),
      });

      if (response.ok) {
        const data = await response.json();
        addVM(data); // Add the VM to the state if the response is successful
        onCancel(); // Close the form
      } else {
        console.error('Failed to register VM:', response.statusText);
        alert('Failed to register VM. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while attempting to register the VM.');
    }
  } else {
    alert("Please fill out all required fields.");
  }
};
  return (
    <div className="form-container vm-form">
      <div className="form-section">
        <h3>Identification</h3>
        <div className="form-row">
          <div className="form-group">
            <label>CI ID</label>
            <input 
              type="text" 
              name="ciId" 
              value={formData.ciId} 
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>VM Name / Hostname</label>
            <input 
              type="text" 
              name="vmName" 
              value={formData.vmName} 
              onChange={handleChange}
              placeholder="APP-SRV-01"
            />
          </div>
          <div className="form-group">
            <label>CI Type</label>
            <select name="ciType" value={formData.ciType} onChange={handleChange}>
              <option value="Application VM">Application VM</option>
              <option value="Database VM">Database VM</option>
              <option value="Web Server VM">Web Server VM</option>
              <option value="File Server VM">File Server VM</option>
              <option value="Middleware VM">Middleware VM</option>
              <option value="Utility VM">Utility VM</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Hypervisor Host</label>
            <select name="hypervisor" value={formData.hypervisor} onChange={handleChange}>
              <option value="HV-001">HV-001 (ESXi-Prod-01)</option>
              <option value="HV-002">HV-002 (HyperV-DR-01)</option>
              <option value="HV-003">HV-003 (KVM-Dev-01)</option>
            </select>
          </div>
          <div className="form-group">
            <label>VM Cluster</label>
            <select name="cluster" value={formData.cluster} onChange={handleChange}>
              <option value="CL-001">CL-001 (Production Cluster)</option>
              <option value="CL-002">CL-002 (Development Cluster)</option>
              <option value="CL-003">CL-003 (DR Cluster)</option>
              <option value="">Not in a cluster</option>
            </select>
          </div>
        </div>
        <h3>Ownership</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Owner Department</label>
            <input 
              type="text" 
              name="ownerDept" 
              value={formData.ownerDept} 
              onChange={handleChange}
              placeholder="IT Operations"
            />
          </div>
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
            <label>Secondary Owner</label>
            <input 
              type="text" 
              name="secondaryOwner" 
              value={formData.secondaryOwner} 
              onChange={handleChange}
              placeholder="Jane Doe"
            />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3>Technical Attributes</h3>
        <div className="form-row">
          <div className="form-group">
            <label>vCPU Allocation</label>
            <input 
              type="number" 
              name="vcpu" 
              value={formData.vcpu} 
              onChange={handleChange}
              min="1"
              max="64"
            />
          </div>
          <div className="form-group">
            <label>RAM Allocation (GB)</label>
            <input 
              type="number" 
              name="ram" 
              value={formData.ram} 
              onChange={handleChange}
              min="1"
              max="256"
            />
          </div>
          <div className="form-group">
            <label>Disk Size (GB)</label>
            <input 
              type="number" 
              name="diskSize" 
              value={formData.diskSize} 
              onChange={handleChange}
              min="1"
              max="4096"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Disk Type</label>
            <select name="diskType" value={formData.diskType} onChange={handleChange}>
              <option value="Thin Provisioned">Thin Provisioned</option>
              <option value="Thick Provisioned">Thick Provisioned</option>
              <option value="Eager Zeroed">Eager Zeroed</option>
            </select>
          </div>
          <div className="form-group">
            <label>OS Name</label>
            <input 
              type="text" 
              name="osName" 
              value={formData.osName} 
              onChange={handleChange}
              placeholder="Windows Server 2022"
            />
          </div>
          <div className="form-group">
            <label>OS Version</label>
            <input 
              type="text" 
              name="osVersion" 
              value={formData.osVersion} 
              onChange={handleChange}
              placeholder="21H2"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>IP Address</label>
            <input 
              type="text" 
              name="ipAddress" 
              value={formData.ipAddress} 
              onChange={handleChange}
              placeholder="192.168.1.100"
            />
          </div>
          <div className="form-group">
            <label>Network Segment / VLAN ID</label>
            <input 
              type="text" 
              name="vlan" 
              value={formData.vlan} 
              onChange={handleChange}
              placeholder="VLAN 10"
            />
          </div>
          <div className="form-group">
            <label>Virtual NIC Count</label>
            <input 
              type="number" 
              name="nicCount" 
              value={formData.nicCount} 
              onChange={handleChange}
              min="1"
              max="10"
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Snapshot Policy</label>
            <select name="snapshotPolicy" value={formData.snapshotPolicy} onChange={handleChange}>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="None">None</option>
            </select>
          </div>
          <div className="form-group">
            <label>Backup Status</label>
            <select name="backupStatus" value={formData.backupStatus} onChange={handleChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {formData.backupStatus === 'Yes' && (
            <div className="form-group">
              <label>Last Backup Date</label>
              <input 
                type="date" 
                name="lastBackup" 
                value={formData.lastBackup} 
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="form-section">
        <h3>Criticality & Risk</h3>
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
            <label>Risk Rating</label>
            <select name="riskRating" value={formData.riskRating} onChange={handleChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label>SLA Impact</label>
          <textarea 
            name="slaImpact" 
            value={formData.slaImpact} 
            onChange={handleChange}
            rows="2"
            placeholder="Impact on service level agreements..."
          />
        </div>
        <h3>Status</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Lifecycle Status</label>
            <select name="lifecycleStatus" value={formData.lifecycleStatus} onChange={handleChange}>
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
       
         <button className="btn-cancel" onClick={onCancel}>
        Cancel
      </button>
      <button className="btn-submit" onClick={handleSubmit}>
        Create Virtual Machine
      </button>
 </div>
        {formData.lifecycleStatus === 'Retired' && (
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
            
          </div>
          
        )}
      </div>
      
      
       
    

    </div>
    
  );
  
};

export default VirtualizationManagement;