import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    water: 0,
    steps: 0,
    calories: 0,
  });

  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
