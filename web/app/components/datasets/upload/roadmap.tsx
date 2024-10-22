import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nanoid } from 'nanoid';

// Custom node component with editable label
function EditableNode({ id, data, isConnectable }) {
  const [label, setLabel] = useState(data.label);

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
    data.label = event.target.value; // Update the node's data with the new label
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#fff', border: '1px solid #ddd' }}>
      <Handle type="target" position="top" isConnectable={isConnectable} />
      <input
        type="text"
        value={label}
        onChange={handleLabelChange}
        style={{ width: '100%', border: 'none', backgroundColor: 'transparent', textAlign: 'center' }}
      />
      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </div>
  );
}

function ReactRoadmap({ initialNodes, initialEdges }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const storageKey = 'react-roadmap-flow';

  // Load nodes and edges from localStorage on mount
  useEffect(() => {
    const savedFlow = JSON.parse(localStorage.getItem(storageKey));
    if (savedFlow) {
      setNodes(savedFlow.nodes || initialNodes);
      setEdges(savedFlow.edges || initialEdges);
    }
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Save nodes and edges to localStorage
  const saveFlow = useCallback(() => {
    const flow = { nodes, edges };
    localStorage.setItem(storageKey, JSON.stringify(flow));
    alert('Roadmap saved!');
  }, [nodes, edges]);

  // Handle adding new nodes
  const addNode = () => {
    const newNode = {
      id: nanoid(),
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: `New Node` },
      type: 'editableNode', // Use the custom node type for editable label
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Handle edge creation
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={{ editableNode: EditableNode }} // Register the custom editable node
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>

        {/* Add buttons for adding nodes and saving the roadmap */}
        <div style={{ position: 'absolute', top: 16, right: 64 }}>
          <button onClick={addNode}>Add Node</button>
          <button onClick={saveFlow} style={{ marginLeft: 10 }}>
            Save Roadmap
          </button>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default ReactRoadmap;
