import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nanoid } from 'nanoid';
import CustomEdge from './edges';
import EditableNode from './nodes';
import DraggableMenu from './draggable-menu'; // Import the new menu component
import NodeDetails from './node-detail'; // Import the new NodeDetails component

function ReactRoadmap({ initialNodes, initialEdges }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const storageKey = 'react-roadmap-flow';

  const nodeTypes = useMemo(() => ({ editableNode: EditableNode }), []);
  const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), []);

  useEffect(() => {
    const savedFlow = JSON.parse(localStorage.getItem(storageKey));
    if (savedFlow) {
      setNodes(savedFlow.nodes || initialNodes);
      setEdges(savedFlow.edges || initialEdges);
    }
  }, [initialNodes, initialEdges]);

  const saveFlow = useCallback(() => {
    const flow = { nodes, edges };
    localStorage.setItem(storageKey, JSON.stringify(flow));
    alert('Roadmap saved!');
  }, [nodes, edges]);

  const addNode = (type) => {
    let newLabel = type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, " $1");

    const newNode = {
      id: nanoid(),
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: newLabel },
      type,
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'customEdge' }, eds)),
    [setEdges]
  );

  const onNodeClick = (id) => {
    setSelectedNode(id);
  };

  // Handle drag event
  const handleDragStart = (event, component) => {
    event.dataTransfer.setData('application/reactflow', component.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');

    if (type) {
      addNode(type);
    }
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh', display: 'flex', backgroundColor: '#f4f4f9' }}>
        <DraggableMenu onDrag={handleDragStart} />

        <div style={{ flexGrow: 1 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()} // Prevent default to allow drop
            onNodeClick={(_, node) => onNodeClick(node.id)}
            fitView
            defaultZoom={1.5}
            minZoom={0.5}
            maxZoom={2}
          >
            <Controls />
            <Background color="#32a852" variant={BackgroundVariant.Dots} />
          </ReactFlow>

          {/* Add buttons for saving the roadmap */}
          <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
            <button
              onClick={saveFlow}
              style={{
                border: '2px solid #007bff',
                borderRadius: '50%', // Make it circular
                backgroundColor: '#007bff',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '16px',
                width: '50px', // Set a fixed width
                height: '50px', // Set a fixed height
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              Save
            </button>
          </div>

          {/* Use the NodeDetails component */}
          <NodeDetails selectedNode={selectedNode} nodes={nodes} />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default ReactRoadmap;