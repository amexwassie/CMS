import React, { createContext, useState } from 'react';

export const RiskContext = createContext();

export const RiskProvider = ({ children }) => {
  const [riskData, setRiskData] = useState({
    Dashboard: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {},
    step7: {},
    step8: {},
    step9: {},
     step10: {},
    step11: {},
    step12: {},
  });

  return (
    <RiskContext.Provider value={{ riskData, setRiskData }}>
      {children}
    </RiskContext.Provider>
  );
};