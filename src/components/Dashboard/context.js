import React from "react";

export const DashboardAction = React.createContext(null);

export const ActionProvider = ({ children }) => {
  const val = 20;
  return (
    <DashboardAction.Provider value={{ val }}>
      {children}
    </DashboardAction.Provider>
  );
};
