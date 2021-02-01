import React from "react";

export const Data = React.createContext(null);

export const DataProvider = ({ children }) => {
  const [userD, setUser] = React.useState(null);

  const updateUser = (logs) => {
    setUser(logs);
  };

  return (
    <Data.Provider value={{ userD, updateUser }}>{children}</Data.Provider>
  );
};
