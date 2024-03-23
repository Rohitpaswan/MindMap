import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import NodeInfoTooltip from "./components/nodeInfo/NodeInfoTooltip";

const nodeTypes = { customNode: CustomNode };
const MindMap = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [name, setName] = useState("");
  const [element, setElement] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#00ff00");
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  const [info, setInfo] = useState("");

  const addNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "customNode",
      data: {
        label: name,
        description: info,
        chart: <NodeInfoTooltip/>,
        color: selectedColor,
      },
      position: { x: 100, y: 100 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setSelectedColor("#00ff00");
    setName("");
    setInfo("");
  }, [info, name, nodes.length, selectedColor]);

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

  const onElementShow = (event, element) => {
    const tooltipX = event.clientX + 5; // Subtracting 30 to offset the tooltip to the left
    const tooltipY = event.clientY - 280;
    setElementPosition({ x: tooltipX, y: tooltipY });
    setElement(element.data);
    console.log(event);
    console.log(element);
  };

  const onElementHide = () => {
    setElement(null);
  };

  console.log(nodes);

  return (
    <div className="container">
      <div className="userInput">
        <div className="input__wrapper">
          <h3 className="input__title "> Title</h3> &nbsp; &nbsp;
          <input
            type="text"
            className="node__input"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="info__wrapper">
          <h3 className="input__title "> Description</h3> &nbsp; &nbsp;
          <textarea
            type="text"
            className="node__info"
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
        </div>
        {/* <div>
          <input type="text" placeholder="x-axis" onChange={(e) => setXAxisValue(e.target.value)}/>
          <input type="text" placeholder="y-axis" onChange={(e) => setYAxisValue(e.target.value)}/>
        </div> */}
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeMouseEnter={onElementShow}
        onNodeMouseLeave={onElementHide}
        nodeTypes={nodeTypes}
       
      >
        <Controls />
        <Background />
        <MiniMap/>
      </ReactFlow>

      {element && (
        <div
          style={{
            position: "absolute",
            top: `${elementPosition.y}px`,
            left: `${elementPosition.x}px`,
          }}
        >
          <h4>{element.label}</h4>
          <span>{element.description}</span>
          <div>{element?.chart}</div>
        </div>
      )}
    </div>
  );
};

export default MindMap;
