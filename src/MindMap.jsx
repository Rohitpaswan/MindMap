import { useCallback, useState } from "react";
import ReactFlow, { Background, Controls, addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";

const MindMap = () => {
  const [nodes, setNodes] = useState([]);
  const [ edges, setEdges] = useState([]);
  const [name, setName] = useState("");
  const [nodeInfo , setNodeInfo] = useState(null);
  const [element , setElement] = useState(null);
  const addNode = useCallback(() => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "default",
      data: { label: `${name}`, description: `${nodeInfo}` },
      position: { x: 100, y: 100 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
   
  }, [name, nodeInfo, nodes.length]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) =>
      setEdges((eds) => addEdge({ ...connection}, eds)),
    [setEdges]
  );

  const onElementShow = (event ,element) =>{
   setElement(element.data)

  }

  const onElementHide = () =>{
        setElement(null)
  }


console.log(nodes);

  return (
    <div className="container">
      <div className="userInput">
        <label htmlFor="node__input"> Node Name</label>
        <input     
          type="text"
          className="node__input"
          onChange={(e) => setName(e.target.value)}
        />
        
        <br/>
        <label htmlFor="node__description"> description</label>
        <input     
          type="text"
          className="node__description"
          onChange={(e) => setNodeInfo(e.target.value)}
        />
        <button type="button" className="addnode__btn" onClick={addNode}>
          Add Node
        </button>
      </div>
      <ReactFlow 
      nodes={nodes}
      edges={edges}
       onNodesChange={onNodesChange}
       onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeMouseEnter={onElementShow}
        onNodeMouseLeave={onElementHide}
       >
        <Controls />
        <Background />
      </ReactFlow>
      {
        element && (<div className="info">
          <span>node: {element.label}</span> 
          <div className="description">Description: {element.description}</div> 
            </div>)
      }
    </div>
  );
};

export default MindMap;
