import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div className="node__box" style={{ backgroundColor: data.color }}>
        {data.label}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default CustomNode;
