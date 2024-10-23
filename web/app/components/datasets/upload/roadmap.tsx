import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
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
import DraggableMenu from './menu'; // Import the new menu component

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
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const saveFlow = useCallback(() => {
    const flow = { nodes, edges };
    localStorage.setItem(storageKey, JSON.stringify(flow));
    alert('Roadmap saved!');
  }, [nodes, edges]);

  const addNode = (type) => {
    const newNode = {
      id: nanoid(),
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: type === 'node1' ? 'Type 1 Node' : type === 'node2' ? 'Type 2 Node' : 'Type 3 Node' },
      type: 'editableNode',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'customEdge' }, eds)),
    [setEdges]
  );

  const onNodeClick = (id, label, info) => {
    setSelectedNode(id);
    setSelectedNodeLabel(label);
    setSelectedNodeInfo(info);
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
      <div style={{ height: '100vh', display: 'flex' }}>
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
            onNodeClick={(_, node) => onNodeClick(node.id, node.data.label, node?.data?.extraInfo)}
            fitView
            defaultZoom={1.5}
            minZoom={0.5}
            maxZoom={2}
          >
            <Controls />
            <Background />
          </ReactFlow>

          {/* Add buttons for adding nodes and saving the roadmap */}
          <div style={{ position: 'absolute', bottom: 4, right: 4 }}>
            <button
              onClick={saveFlow}
              style={{
                border: '2px solid #2196f3',
                padding: '0 8px',
                borderRadius: '5px',
                backgroundColor: '#fff',
                color: '#2196f3',
                cursor: 'pointer',
              }}
            >
              Save
            </button>
          </div>

          {/* Display the details of the selected node */}
          {selectedNode && (
            <div
              style={{
                position: 'absolute',
                bottom: 64,
                right: 16,
                backgroundColor: 'rgba(255,255,255,.7)',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0px 4px 6px rgba(0,0,0,.1)',
                maxWidth: '300px',
                wordWrap: 'break-word',
              }}
            >
              <h4>Details</h4>
              <p><strong>{selectedNodeLabel}</strong></p>
              <p><strong>{selectedNodeInfo}</strong></p>
              <p><strong>ID:</strong> {selectedNode}</p>
              <p><strong>Type:</strong> {nodes.find((node) => node.id === selectedNode)?.type}</p>
              <p><strong>Position:</strong> X:{nodes.find((node) => node.id === selectedNode)?.position?.x}, Y:{nodes.find((node) => node.id === selectedNode)?.position?.y}</p>
              <p><strong>Created:</strong> {new Date().toLocaleString()}</p>

              {nodes.find((node) => node.id === selectedNode)?.data?.extraInfo && (
                <p><strong>Extra Info:</strong> {nodes.find((node) => node.id === selectedNode)?.data.extraInfo}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default ReactRoadmap;