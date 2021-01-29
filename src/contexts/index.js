import React from "react";

const Data = React.createContext(null);

export const DataProvider = ({ children }) => {
  const value = "value";

  return <Data.Provider value={{ value }}>{children}</Data.Provider>;
};

export const useData = () => React.useContext(Data);
