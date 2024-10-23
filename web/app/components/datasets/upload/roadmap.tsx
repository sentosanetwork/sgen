import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { nanoid } from 'nanoid';
import CustomEdge from './edges';
import EditableNode from './nodes';
import DraggableMenu from './draggable-menu';

function ReactRoadmap({ initialNodes, initialEdges }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedNodeLabel, setSelectedNodeLabel] = useState('');
  const [selectedNodeInfo, setSelectedNodeInfo] = useState('');

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

  const handleDragStart = (event, component) => {
    event.dataTransfer.setData('application/reactflow', component.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    
    if (type) {
      addNode(type);
    }
  };

  return (
    <ReactFlowProvider>
      <div style={{ height:'100vh', display:'flex' }}>
        <DraggableMenu onDrag={handleDragStart} />
        
        <div style={{ flexGrow:'1' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>

          {/* Add buttons for saving the roadmap */}
          <div style={{ position:'absolute', bottom:'4px', right:'4px' }}>
            <button
              onClick={saveFlow}
              style={{
                border:'2px solid #2196f3',
                padding:'0 8px',
                borderRadius:'5px',
                backgroundColor:'#fff',
                color:'#2196f3',
                cursor:'pointer',
              }}
            >
              Save
            </button>
          </div>

          {/* Display selected node details */}
          {/* ... (existing code for displaying node details) */}
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default ReactRoadmap;