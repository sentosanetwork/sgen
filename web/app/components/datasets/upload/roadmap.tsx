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

// Custom node component with editable label and yellow background
function EditableNode({ id, data, isConnectable }) {
  const [label, setLabel] = useState(data.label)

  const handleLabelChange = (event) => {
    setLabel(event.target.value)
    data.label = event.target.value // Update the node's data with the new label
  }

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#d4b000', // Darker yellow background for all nodes
        border: '2px solid #ddd', // Thicker border for visual impact
        cursor: 'pointer',
        width: '200px', // Set width to make the node bigger
        textAlign: 'center', // Center the text
        fontSize: '18px', // Increased font size for better readability
      }}
    >
      <Handle type="target" position="top" isConnectable={isConnectable} />
      <input
        type="text"
        value={label}
        onChange={handleLabelChange}
        style={{
          width: '100%',
          border: 'none',
          backgroundColor: 'transparent',
          textAlign: 'center',
          fontSize: '18px', // Increased font size for the input as well
        }}
      />
      <Handle type="source" position="bottom" isConnectable={isConnectable} />
    </div>
  )
}

function ReactRoadmap({ initialNodes, initialEdges }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedNodeLabel, setSelectedNodeLabel] = useState('')
  const [selectedNodeInfo, setSelectedNodeInfo] = useState('')

  const storageKey = 'react-roadmap-flow'

  // Memoize nodeTypes so it doesn't get recreated on every render
  const nodeTypes = useMemo(() => ({ editableNode: EditableNode }), [])

  // Load nodes and edges from localStorage on mount
  useEffect(() => {
    const savedFlow = JSON.parse(localStorage.getItem(storageKey))
    if (savedFlow) {
      setNodes(savedFlow.nodes || initialNodes)
      setEdges(savedFlow.edges || initialEdges)
    }
  }, [initialNodes, initialEdges, setNodes, setEdges])

  // Save nodes and edges to localStorage
  const saveFlow = useCallback(() => {
    const flow = { nodes, edges }
    localStorage.setItem(storageKey, JSON.stringify(flow))
    alert('Roadmap saved!')
  }, [nodes, edges])

  // Handle adding new nodes
  const addNode = () => {
    const newNode = {
      id: nanoid(),
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: 'New Node' },
      type: 'editableNode', // Use the custom node type for editable label
    }
    setNodes(nds => [...nds, newNode])
  }

  // Handle edge creation
  const onConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    [setEdges],
  )

  // Handle node click to display its details
  const onNodeClick = (id, label, info) => {
    setSelectedNode(id)
    setSelectedNodeLabel(label)
    setSelectedNodeInfo(info)
  }

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh' }}> {/* Keep default React Flow background */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes} // Memoized nodeTypes
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => onNodeClick(node.id, node.data.label, node?.data?.extraInfo)} // Pass the node click handler
          fitView
          defaultZoom={1.5} // Set the default zoom level (1.5x zoom for example)
          minZoom={0.5} // Optional: Limit the minimum zoom level
          maxZoom={2} // Optional: Limit the maximum zoom level
        >
          <Controls />
          <Background />
        </ReactFlow>

        {/* Add buttons for adding nodes and saving the roadmap */}
        <div style={{ position: 'absolute', bottom: 4, right: 4 }}>
          <button
            onClick={addNode}
            style={{
              border: '2px solid #4caf50', // Green solid border
              padding: '0 8px', // Padding for button
              borderRadius: '5px', // Rounded corners
              backgroundColor: '#fff', // White background
              color: '#4caf50', // Green text
              cursor: 'pointer', // Pointer cursor for hover effect
            }}
          >
          Add
          </button>
          <button
            onClick={saveFlow}
            style={{
              marginLeft: 8,
              border: '2px solid #2196f3', // Blue solid border
              padding: '0 8px', // Padding for button
              borderRadius: '5px', // Rounded corners
              backgroundColor: '#fff', // White background
              color: '#2196f3', // Blue text
              cursor: 'pointer', // Pointer cursor for hover effect
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
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // White background with 70% opacity
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
              maxWidth: '300px', // Constrain the width
              wordWrap: 'break-word', // Ensure long text doesn't overflow
            }}
          >
            <h4>Details</h4>
            <p><strong>{selectedNodeLabel}</strong></p>
            <p><strong>{selectedNodeInfo}</strong></p>
            <p><strong>ID:</strong> {selectedNode}</p>
            {/* Add additional node information here */}
            <p><strong>Type:</strong> {nodes.find(node => node.id === selectedNode)?.type}</p>
            <p><strong>Position:</strong> X: {nodes.find(node => node.id === selectedNode)?.position?.x}, Y: {nodes.find(node => node.id === selectedNode)?.position?.y}</p>
            <p><strong>Created:</strong> {new Date().toLocaleString()}</p>

            {/* You can also render custom data if available in node data */}
            {nodes.find(node => node.id === selectedNode)?.data?.extraInfo && (
              <p><strong>Extra Info:</strong> {nodes.find(node => node.id === selectedNode)?.data.extraInfo}</p>
            )}
          </div>
        )}

      </div>
    </ReactFlowProvider>
  )
}

export default ReactRoadmap
