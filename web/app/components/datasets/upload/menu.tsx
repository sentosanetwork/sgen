// DraggableMenu.js
import React from 'react';

const DraggableMenu = ({ onDrag }) => {
  const components = [
    { id: 'node1', label: 'Node Type 1' },
    { id: 'node2', label: 'Node Type 2' },
    { id: 'node3', label: 'Node Type 3' },
  ];

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '200px' }}>
      <h4>Components</h4>
      {components.map((component) => (
        <div
          key={component.id}
          draggable
          onDragStart={(e) => onDrag(e, component)}
          style={{
            padding: '8px',
            marginBottom: '5px',
            backgroundColor: '#f0f0f0',
            cursor: 'grab',
            borderRadius: '4px',
          }}
        >
          {component.label}
        </div>
      ))}
    </div>
  );
};

export default DraggableMenu