// InputChartProvider.jsx
import  { createContext, useContext, useState } from 'react';

// Create the InputChart context for data sharing
export const InputChartContext = createContext(null);

// Custom hook to easily access and update chart data


// InputChartProvider component to manage and provide chart data
export const InputChartProvider = ({ children }) => {
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState(""); // Provide an initial value for yAxis

  return (
    <InputChartContext.Provider value={{ xAxis, setXAxis, yAxis, setYAxis }}>
      {children}
    </InputChartContext.Provider>
  );
};
