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
        maxWidth: '360px',
        wordWrap: 'break-word',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4 style={{ margin: '0', flexGrow: 1 }}>Details</h4>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            backgroundColor:'transparent',
            border:'none',
            cursor:'pointer',
            color:'#007bff',
            fontSize:'20px' // Make the icon larger
          }}
        >
          {isExpanded ? <FaChevronDown /> : <FaChevronLeft />}
        </button>
      </div>
      {isExpanded && (
        <>
          <div style={{ marginBottom: '5px' }}>
            <strong>Label:</strong> {nodeData.data.label}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong>Info:</strong> {nodeData.data.extraInfo}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong>ID:</strong> {nodeData.id}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong>Type:</strong> {nodeData.type}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong>Position:</strong> X: {nodeData.position.x}, Y: {nodeData.position.y}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong>Created:</strong> {new Date().toLocaleString()}
          </div>

          {nodeData.data.extraInfo && (
            <div style={{ marginBottom: '5px' }}>
              <strong>Extra Info:</strong> {nodeData.data.extraInfo}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NodeDetails;