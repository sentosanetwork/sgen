// DraggableMenu.js
import React from 'react';

const DraggableMenu = ({ onDrag }) => {
  const components = [
    { id: 'mindNode', label: 'Mind Map Node' },
    { id: 'roadNode', label: 'Road Map Node' },
    { id: 'taskNode', label: 'Task Node' },
    { id: 'decisionNode', label: 'Decision Node' },
    { id: 'noteNode', label: 'Note Node' },
    { id: 'chartNode', label: 'Chart Node' },
    { id: 'subTaskNode', label: 'Subtask Node' },
    { id: 'milestoneNode', label: 'Milestone Node' },
  ];

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '220px' }}>
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

export default DraggableMenu;