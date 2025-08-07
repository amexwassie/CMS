import React, { createContext, useState } from 'react';

export const RiskContext = createContext();

export const RiskProvider = ({ children }) => {
  const [riskData, setRiskData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {},
    step7: {},
    step8: {},
    step9: {},
  });

  return (
    <RiskContext.Provider value={{ riskData, setRiskData }}>
      {children}
    </RiskContext.Provider>
  );
};