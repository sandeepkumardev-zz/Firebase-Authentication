import React from "react";
import { dataReducer, initialState } from "./reducers";

const Data = React.createContext(null);

export const DataProvider = ({ children }) => {
  const [data, dispatch] = React.useReducer(dataReducer, initialState);

  return <Data.Provider value={{ data, dispatch }}>{children}</Data.Provider>;
};

export const useData = () => React.useContext(Data);
