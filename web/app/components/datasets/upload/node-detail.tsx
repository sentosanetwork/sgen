// NodeDetails.js
import React, { useState } from 'react';
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa'; // Importing icons

const NodeDetails = ({ selectedNode, nodes }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!selectedNode) return null;

  const nodeData = nodes.find((node) => node.id === selectedNode);

  return (
    <div
      style={{
        position: 'absolute',
        top: '64px',
        right: '16px',
        backgroundColor: '#ffffff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0,0,0,.2)',
        maxWidth: '300px',
        wordWrap: 'break-word',
      }}
    >
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            marginLeft:'10px',
            backgroundColor:'transparent',
            border:'none',
            cursor:'pointer',
            color:'#007bff',
            fontSize:'20px' // Make the icon larger
          }}
        >
          {isExpanded ? <FaChevronDown /> : <FaChevronLeft />}
        </button>
      {isExpanded && (
        <>
          <p style={{ marginBottom: '5px' }}><strong>Label:</strong> {nodeData.data.label}</p>
          <p style={{ marginBottom: '5px' }}><strong>Info:</strong> {nodeData.data.extraInfo}</p>
          <p style={{ marginBottom: '5px' }}><strong>ID:</strong> {nodeData.id}</p>
          <p style={{ marginBottom: '5px' }}><strong>Type:</strong> {nodeData.type}</p>
          <p style={{ marginBottom: '5px' }}><strong>Position:</strong> X:{nodeData.position.x}, Y:{nodeData.position.y}</p>
          <p style={{ marginBottom: '5px' }}><strong>Created:</strong> {new Date().toLocaleString()}</p>

          {nodeData.data.extraInfo && (
            <p style={{ marginBottom: '5px' }}><strong>Extra Info:</strong> {nodeData.data.extraInfo}</p>
          )}
        </>
      )}
    </div>
  );
};

export default NodeDetails;
