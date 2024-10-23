// DraggableMenu.js
import React, { useState } from 'react';
import { FaHeading, FaListUl, FaParagraph, FaTag, FaFoursquare, FaRegHandPointer, FaCheckSquare, FaLink, FaChartLine, FaTasks, FaChevronDown, FaChevronRight } from 'react-icons/fa'; // Importing icons

const DraggableMenu = ({ onDrag }) => {
  const [isExpanded, setIsExpanded] = useState(true); // State to manage expansion

  const components = [
    { id: 'title', label: 'H1 Title', icon: <FaHeading /> },
    { id: 'topic', label: 'Topic', icon: <FaListUl /> },
    { id: 'subTopic', label: 'Sub Topic', icon: <FaListUl /> },
    { id: 'paragraph', label: 'Paragraph', icon: <FaParagraph /> },
    { id: 'label', label: 'Label', icon: <FaTag /> },
    { id: 'button', label: 'Button', icon: <FaRegHandPointer /> },
    { id: 'legend', label: 'Legend', icon: <FaChartLine /> },
    { id: 'todo', label: 'Todo', icon: <FaTasks /> },
    { id: 'checklist', label: 'Checklist', icon: <FaCheckSquare /> },
    { id: 'linkGroup', label: 'Link Group', icon: <FaLink /> },
    { id: 'verticalLine', label: 'Vertical Line', icon: <div style={{ width: '2px', height: '20px', backgroundColor: '#000' }}></div> }, // Custom vertical line
    { id: 'resourceButton', label: 'Resource Button', icon: <FaRegHandPointer /> },
    { id: 'section', label: 'Section', icon: <FaFoursquare /> },
  ];

  return (
    <div style={{ padding: '10px', borderRadius: '5px', width: isExpanded ? '240px' : '60px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor:'#fff' }}>
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
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        </button>
      {isExpanded && components.map((component) => (
        <div
          key={component.id}
          draggable
          onDragStart={(e) => onDrag(e, component)}
          style={{
            display:'flex',
            alignItems:'center',
            padding:'8px',
            marginBottom:'5px',
            backgroundColor:'#f9f9f9',
            cursor:'grab',
            borderRadius:'4px',
            border:'1px solid #ddd',
            transition:'background-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
        >
          <span style={{ marginRight:'8px' }}>{component.icon}</span>
          <span>{component.label}</span>
        </div>
      ))}
    </div>
  );
};

export default DraggableMenu;