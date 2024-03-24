import  { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { InputChartContext } from "../../context/InputChartProvider";
import Chart from "chart.js/auto";

const NodeInfoTooltip = () => {
  const { xAxis, setXAxis, yAxis, setYAxis } = useContext(InputChartContext);
  const [label, setLabel] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const labelArray = xAxis.split(",");
    const dataArray = yAxis.split(",");
    setLabel(labelArray);
    setData(dataArray);
    setXAxis("");
    setYAxis("");
  }, []); // Empty dependency array to run the effect only once after mount


  const chartData = {
    labels: label,
    datasets: [
      {
        
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: data,
      },
    ],
  };

  const options = {
    
  };
  

  return (
    <div className="nodeInfoTooltip" style={{ width: "200px", height: "200px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default NodeInfoTooltip;
