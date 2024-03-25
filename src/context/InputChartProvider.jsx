// InputChartProvider.jsx
import { createContext, useState } from "react";

// Create the InputChart context for data sharing
export const InputChartContext = createContext(null);

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
