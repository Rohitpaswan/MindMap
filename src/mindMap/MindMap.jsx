import { useCallback, useContext, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "../CustomNode";
import NodeInfoTooltip from "../components/nodeInfo/NodeInfoTooltip";
import { InputChartContext } from "../context/InputChartProvider";
import { v4 as uuidv4 } from 'uuid';
import "./mindmap.css";

const nodeTypes = { customNode: CustomNode };
const MindMap = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [name, setName] = useState("");
  const [element, setElement] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#0000ff");
  const [info, setInfo] = useState("");
  const [toggle, setToggle] = useState({ elmHide: false, chartHide: false });
  const [xData, setXData] = useState("");
  const [yData, setYData] = useState("");
  const { setXAxis, setYAxis } = useContext(InputChartContext);
 

  const addNode = useCallback(() => {
    if (name === "") {
      alert("Enter Task Title");
      return;
    }
    const randomId = uuidv4();
    const newNode = {
      id:  randomId.toString(),
      type: "customNode",
      data: {
        label: name,
        description: info,
        chart: <NodeInfoTooltip />,
        color: selectedColor,
      },
      position: { x: 100, y: 100 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setSelectedColor("#0000ff");
    toggle.chartHide = xData !== "" && yData !== "" ? true : false;
    setName(""); 
    setInfo("");
    setXData("");
    setYData("");
  }, [info, name, selectedColor, toggle, xData, yData]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge({ ...connection }, eds)),
    [setEdges]
  );

  //for delation on node
 
  const deleteNode = () => {
    console.log(nodes[0]);
    const updatedNodes = nodes.slice(0, nodes.length - 1); // Efficiently create a new array
    setNodes(updatedNodes);
  };
  
  console.log(nodes);

  const onNodeClick = (event, element) => {
    setElement(element.data);
    setToggle((prevState) => ({
      ...prevState,
      elmHide: !prevState.elmHide,
    }));
  };

  return (
    <div className="container">
      <div className="user__input">
        <div className="user__input__wrapper">
          <div className="input__wrapper">
            <h3 className="input__title "> Task</h3> &nbsp; &nbsp;
            <input
              type="text"
              className="node__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="info__wrapper">
            <h3 className="input__title "> Task-Details</h3> &nbsp; &nbsp;
            <textarea
              type="text"
              className="node__info"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>

          <div className="color__picker">
            <h3>Choose color</h3>&nbsp; &nbsp; &nbsp;
            <input
              type="color"
              onChange={(e) => setSelectedColor(e.target.value)}
              value={selectedColor}
            />
            &nbsp;&nbsp;
            <button type="button" className="addnode__btn" onClick={addNode}>
              Add Node
            </button>
            <button type="button" className="addnode__btn" onClick={deleteNode}>
              Delete Node
            </button>
          </div>
        </div>
        <div className="chart__wrapper">
          <h2>Bar Chart Info</h2>
          <div className="chart">
            <span>X-axis</span>
            <input
              type="text"
              className="chart__input"
              onChange={(e) => {
                setXData(e.target.value);
                setXAxis(e.target.value);
              }}
              value={xData}
              placeholder="ex: item1, item2"
            />
          </div>
          <div className="chart">
            <span>Y-axis</span>
            <input
              type="text"
              className="chart__input"
              onChange={(e) => {
                setYData(e.target.value);
                setYAxis(e.target.value);
              }}
              value={yData}
              placeholder="ex: 100,200"
            />
          </div>
        </div>
      </div>
      {/* Infomation of every node */}
      <div className="node__information">
        {toggle.elmHide && (
          <>
            <div className="elem__title"><span>Title :</span>{element.label}</div>
            <div className="elem__info"><span>Details :</span> {element.description}</div>
            {toggle.chartHide && <div>{element.chart}</div>}
          </>
        )}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
      >
        <Controls position="top" />
        <MiniMap position="bottom right" />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default MindMap;
