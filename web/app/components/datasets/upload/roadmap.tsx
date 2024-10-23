import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Handle,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { nanoid } from 'nanoid'
import CustomEdge from './edges'; // Import your custom edge component
import EditableNode from './nodes'; // Import your custom edge component

function ReactRoadmap({ initialNodes, initialEdges }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedNodeLabel, setSelectedNodeLabel] = useState('');
  const [selectedNodeInfo, setSelectedNodeInfo] = useState('');

  const storageKey = 'react-roadmap-flow';

  // Memoize nodeTypes and edgeTypes so they don't get recreated on every render
  const nodeTypes = useMemo(() => ({ editableNode: EditableNode }), []);
  const edgeTypes = useMemo(() => ({ customEdge: CustomEdge }), []); // Add custom edge type

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
      data: { label: 'New Node' },
      type: 'editableNode', // Use the custom node type for editable label
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Handle edge creation
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'customEdge' }, eds)), // Use custom edge type here
    [setEdges]
  );

  // Handle node click to display its details
  const onNodeClick = (id, label, info) => {
    setSelectedNode(id);
    setSelectedNodeLabel(label);
    setSelectedNodeInfo(info);
  };

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes} // Memoized nodeTypes
          edgeTypes={edgeTypes} // Use the custom edge type here
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
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
            onClick={addNode}
            style={{
              border: '2px solid #4caf50',
              padding: '0 8px',
              borderRadius: '5px',
              backgroundColor: '#fff',
              color: '#4caf50',
              cursor: 'pointer',
            }}
          >
            Add
          </button>
          <button
            onClick={saveFlow}
            style={{
              marginLeft: 8,
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
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              maxWidth: '300px',
              wordWrap: 'break-word',
            }}
          >
            <h4>Details</h4>
            <p>
              <strong>{selectedNodeLabel}</strong>
            </p>
            <p>
              <strong>{selectedNodeInfo}</strong>
            </p>
            <p>
              <strong>ID:</strong> {selectedNode}
            </p>
            <p>
              <strong>Type:</strong>{' '}
              {nodes.find((node) => node.id === selectedNode)?.type}
            </p>
            <p>
              <strong>Position:</strong> X:{' '}
              {nodes.find((node) => node.id === selectedNode)?.position?.x}, Y:{' '}
              {nodes.find((node) => node.id === selectedNode)?.position?.y}
            </p>
            <p>
              <strong>Created:</strong> {new Date().toLocaleString()}
            </p>

            {nodes.find((node) => node.id === selectedNode)?.data?.extraInfo && (
              <p>
                <strong>Extra Info:</strong>{' '}
                {nodes.find((node) => node.id === selectedNode)?.data.extraInfo}
              </p>
            )}
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
}

export default ReactRoadmap;