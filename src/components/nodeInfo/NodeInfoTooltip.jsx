import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const NodeInfoTooltip = () => {
  // ... (your data definition)

  const labels = ["Positive" , "Negative" , "Comments"];
  const da = {
    labels: labels,
    datasets: [
    
      {axis: 'y',
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [1500, 1345, 1445, ],
      },
    ],
  };


 const config = {
    type: 'bar',
   da,
    options: {
      indexAxis: 'y',
    }
  };

  return (
    <div
      className="nodeInfoTooltip"
      style={{ width: "200px", height: "200px" }}
    >
      <Bar data={da} width={500} height={500} options={config}/>
      {/* ... */}
    </div>
  );
};

export default NodeInfoTooltip;
