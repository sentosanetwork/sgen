
const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Phase 1: Foundations' }, type: 'input' },
    { id: '2', position: { x: -150, y: 100 }, data: { label: 'Master HTML, CSS, and JavaScript' }, type: 'default' },
    { id: '3', position: { x: 150, y: 100 }, data: { label: 'Version Control with Git' }, type: 'default' },
    { id: '4', position: { x: -200, y: 200 }, data: { label: 'Learn HTML5 Basics' }, type: 'default' },
    { id: '5', position: { x: -150, y: 200 }, data: { label: 'Learn CSS3 Basics' }, type: 'default' },
    { id: '6', position: { x: -100, y: 200 }, data: { label: 'Master JavaScript ES6+' }, type: 'default' },
    { id: '7', position: { x: 100, y: 200 }, data: { label: 'Git Basics: clone, commit, push' }, type: 'default' },
    { id: '8', position: { x: 150, y: 200 }, data: { label: 'Work with Branching' }, type: 'default' },
    { id: '9', position: { x: 200, y: 200 }, data: { label: 'GitHub/GitLab Collaboration' }, type: 'default' },

    { id: '10', position: { x: 0, y: 300 }, data: { label: 'Phase 2: Mastering React' }, type: 'default' },
    { id: '11', position: { x: -150, y: 400 }, data: { label: 'Core React Concepts' }, type: 'default' },
    { id: '12', position: { x: 150, y: 400 }, data: { label: 'React Hooks' }, type: 'default' },
    { id: '13', position: { x: -200, y: 500 }, data: { label: 'Components, JSX, Props' }, type: 'default' },
    { id: '14', position: { x: -150, y: 500 }, data: { label: 'State & Lifecycle' }, type: 'default' },
    { id: '15', position: { x: -100, y: 500 }, data: { label: 'Event Handling' }, type: 'default' },
    { id: '16', position: { x: 100, y: 500 }, data: { label: 'useState, useEffect' }, type: 'default' },
    { id: '17', position: { x: 150, y: 500 }, data: { label: 'useRef, useMemo, useCallback' }, type: 'default' },
    { id: '18', position: { x: 200, y: 500 }, data: { label: 'Custom Hooks' }, type: 'default' },

    { id: '19', position: { x: 0, y: 600 }, data: { label: 'React Router' }, type: 'default' },
    { id: '20', position: { x: -150, y: 700 }, data: { label: 'React Router Setup' }, type: 'default' },
    { id: '21', position: { x: 0, y: 700 }, data: { label: 'Nested & Protected Routes' }, type: 'default' },

    { id: '22', position: { x: 0, y: 800 }, data: { label: 'Phase 3: Building Real Projects' }, type: 'default' },
    { id: '23', position: { x: -150, y: 900 }, data: { label: 'Create First React App' }, type: 'default' },
    { id: '24', position: { x: 150, y: 900 }, data: { label: 'API Integration' }, type: 'default' },
    { id: '25', position: { x: -200, y: 1000 }, data: { label: 'To-do App' }, type: 'default' },
    { id: '26', position: { x: -150, y: 1000 }, data: { label: 'Weather App' }, type: 'default' },
    { id: '27', position: { x: 100, y: 1000 }, data: { label: 'Fetch Data with Axios' }, type: 'default' },
    { id: '28', position: { x: 150, y: 1000 }, data: { label: 'Handle Loading & Errors' }, type: 'default' },

    { id: '29', position: { x: 0, y: 1100 }, data: { label: 'Phase 4: Performance Optimization' }, type: 'default' },
    { id: '30', position: { x: -150, y: 1200 }, data: { label: 'Performance Optimization Techniques' }, type: 'default' },
    { id: '31', position: { x: 150, y: 1200 }, data: { label: 'React DevTools' }, type: 'default' },

    { id: '32', position: { x: 0, y: 1300 }, data: { label: 'Phase 5: Advanced React Ecosystem' }, type: 'default' },
    { id: '33', position: { x: -150, y: 1400 }, data: { label: 'Server-Side Rendering (SSR)' }, type: 'default' },
    { id: '34', position: { x: 150, y: 1400 }, data: { label: 'GraphQL Integration' }, type: 'default' },

    { id: '35', position: { x: 0, y: 1500 }, data: { label: 'Phase 6: Deployment & DevOps' }, type: 'default' },
    { id: '36', position: { x: -150, y: 1600 }, data: { label: 'CI/CD Pipelines' }, type: 'default' },
    { id: '37', position: { x: 150, y: 1600 }, data: { label: 'Deploying React Apps' }, type: 'output' },
];

const initialEdges = [
    { id: 'e1', source: '1', target: '2' },
    { id: 'e2', source: '1', target: '3' },
    { id: 'e3', source: '2', target: '4' },
    { id: 'e4', source: '2', target: '5' },
    { id: 'e5', source: '2', target: '6' },
    { id: 'e6', source: '3', target: '7' },
    { id: 'e7', source: '3', target: '8' },
    { id: 'e8', source: '3', target: '9' },
    { id: 'e9', source: '10', target: '11' },
    { id: 'e10', source: '10', target: '12' },
    { id: 'e11', source: '11', target: '13' },
    { id: 'e12', source: '11', target: '14' },
    { id: 'e13', source: '11', target: '15' },
    { id: 'e14', source: '12', target: '16' },
    { id: 'e15', source: '12', target: '17' },
    { id: 'e16', source: '12', target: '18' },
    { id: 'e17', source: '19', target: '20' },
    { id: 'e18', source: '19', target: '21' },
    { id: 'e19', source: '22', target: '23' },
    { id: 'e20', source: '22', target: '24' },
    { id: 'e21', source: '23', target: '25' },
    { id: 'e22', source: '23', target: '26' },
    { id: 'e23', source: '24', target: '27' },
    { id: 'e24', source: '24', target: '28' },
    { id: 'e25', source: '29', target: '30' },
    { id: 'e26', source: '29', target: '31' },
    { id: 'e27', source: '32', target: '33' },
    { id: 'e28', source: '32', target: '34' },
    { id: 'e29', source: '35', target: '36' },
    { id: 'e30', source: '35', target: '37' },
];


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

const storageKey = 'react-roadmap-flow';

// Custom node component with editable label
function EditableNode({ id, data, isConnectable }) {
    const [label, setLabel] = useState(data.label);

    const handleLabelChange = (event: any) => {
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

function ReactRoadmap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Load nodes and edges from localStorage on mount
    useEffect(() => {
        const savedFlow = JSON.parse(localStorage.getItem(storageKey));
        if (savedFlow) {
            setNodes(savedFlow.nodes || initialNodes);
            setEdges(savedFlow.edges || initialEdges);
        }
    }, [setNodes, setEdges]);

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
        (params: any) => setEdges((eds) => addEdge(params, eds)),
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
                <div style={{ position: 'absolute', top: 20, left: 100 }}>
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
