import React, { useContext, useState } from 'react';
import { RiskContext } from '../context/RiskContext';
import { useNavigate } from 'react-router-dom';

const Step2ThreatIdentification = () => {
  const { setRiskData } = useContext(RiskContext);
  const [threats, setThreats] = useState([{
    type: '',
    source: '',
    description: '',
    motivation: '',
    origin: [],
  }]);

  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newThreats = [...threats];
    if (name === 'origin') {
      // Toggle checkbox selection
      if (newThreats[index].origin.includes(value)) {
        newThreats[index].origin = newThreats[index].origin.filter((o) => o !== value);
      } else {
        newThreats[index].origin.push(value);
      }
    } else {
      newThreats[index][name] = value;
    }
    setThreats(newThreats);
  };

  const handleAddThreat = () => {
    setThreats([...threats, { type: '', source: '', description: '', motivation: '', origin: [] }]);
  };

  const handleDeleteThreat = (index) => {
    const newThreats = threats.filter((_, i) => i !== index);
    setThreats(newThreats);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRiskData((prev) => ({ ...prev, step2: threats }));
    navigate('/step3');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Step 2: Threat Identification</h2>

      <table>
        <thead>
          <tr>
            <th>Threat Type</th>
            <th>Threat Source</th>
            <th>Threat Description</th>
            <th>Motivation</th>
            <th>Origin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {threats.map((threat, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="type"
                  value={threat.type}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Type of threat"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="source"
                  value={threat.source}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Source of threat"
                />
              </td>
              <td>
                <textarea
                  name="description"
                  value={threat.description}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Description of the threat"
                />
              </td>
              <td>
                <textarea
                  name="motivation"
                  value={threat.motivation}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="motivation behind the threat"
                />
              </td>
              
              <td>
                <label>
                  <input
                    type="checkbox"
                    name="origin"
                    value="D"
                    checked={threat.origin.includes('D')}
                    onChange={(e) => handleChange(index, e)}
                  /> Deliberate
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="origin"
                    value="A"
                    checked={threat.origin.includes('A')}
                    onChange={(e) => handleChange(index, e)}
                  /> Accidental
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="origin"
                    value="E"
                    checked={threat.origin.includes('E')}
                    onChange={(e) => handleChange(index, e)}
                  /> Environmental
                </label>
              </td>
              <td>
                <button type="button" onClick={() => handleDeleteThreat(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleAddThreat}>Add Threat</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default Step2ThreatIdentification;