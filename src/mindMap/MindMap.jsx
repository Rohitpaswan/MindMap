
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
import './mindmap.css'

const nodeTypes = { customNode: CustomNode };
const MindMap = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [name, setName] = useState("");
  const [element, setElement] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#00ff00");
  const [info, setInfo] = useState("");
  const [toggle, setToggle] = useState({elmHide:false ,chartHide:false });
  const[xData , setXData] = useState("");
  const[yData , setYData] = useState("");
  const {  setXAxis,  setYAxis } = useContext(InputChartContext);
  

  const addNode = useCallback(() => {
    if(name === "") {
        alert ("Enter Task Title");
        return
    }
    const newNode = {
      id: (nodes.length + 1).toString(),
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
    setSelectedColor("#00ff00");
    
   toggle.chartHide = (xData !== "" && yData !=="") ? true : false
    setName(""); // Clearing the name input field
    setInfo(""); 
    setXData("");
    setYData("");
  }, [info, name, nodes.length, selectedColor, toggle, xData, yData]);

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

  const deleteNode = useCallback(() => {
    const newNode = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      if (nodes.length > 0) newNode.push(nodes[i]);
      else return "error";
    }
    setNodes(newNode);
  }, [nodes]);
  console.log(nodes);

  const onNodeClick = (event, element) => {
    setElement(element.data);
    setToggle(prevState => ({
        ...prevState,
        elmHide: !prevState.elmHide
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
            <h3 >Choose color</h3>&nbsp; &nbsp; &nbsp;
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
              className="node__info"
              onChange={(e) => { setXData(e.target.value) ; setXAxis(xData)}}
              value={xData}
              placeholder="x-axis"
            />
          </div>
          <div className="chart">
            <span>Y-axis</span>
            <input
              type="text"
              className="node__info"
              onChange={(e) => { setYData(e.target.value) ; setYAxis(yData)}}
              value={yData}
              placeholder="y-axis"
            />
          </div>
        </div>
      </div>
      {/* Infomation of every node */}
      <div className="node__information">
        {toggle.elmHide && (
          <>
            <h3>Title : {element.label}</h3>
            <p>Details : {element.description}
            </p>
           {toggle.chartHide && (<div>{element.chart}</div>)}
          </>
        )}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // onNodeMouseEnter={(event, element)=> {setElement(element.data); setToggle((pre) => !pre)}}
        //  onNodeMouseLeave={()=> setToggle(pre => !pre)}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default MindMap;

