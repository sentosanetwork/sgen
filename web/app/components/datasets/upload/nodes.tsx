import React, { useState } from 'react'
import {
  Handle,
} from 'reactflow'
import 'reactflow/dist/style.css'

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
  
  export default EditableNode;
