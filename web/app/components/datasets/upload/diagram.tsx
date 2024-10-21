import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

// Props definition
type MermaidDiagramProps = {
  chart: string // Mermaid chart syntax passed as a prop
  onNodeClick?: (nodeId: string) => void // Callback when a node is clicked
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, onNodeClick }) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize Mermaid when component mounts
    mermaid.initialize({
      startOnLoad: true,
      securityLevel: 'loose', // Allow event binding
      callback: (id) => {
        if (onNodeClick)
          onNodeClick(id) // Call the onNodeClick function with the node ID
      },
    })

    if (chartRef.current) {
      // Generate the diagram in the ref container
      mermaid.contentLoaded()
    }
  }, [chart, onNodeClick]) // Re-run the effect if the chart or onNodeClick prop changes

  useEffect(() => {
    // Bind click event to nodes after the chart renders
    const chartElement = chartRef.current
    if (chartElement) {
      // Handle node clicks using Mermaid's click function
      chartElement.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement
        if (target.tagName === 'rect' || target.tagName === 'text') {
          const nodeId = target.closest('.node')?.id
          if (nodeId && onNodeClick)
            onNodeClick(nodeId)
        }
      })
    }
  }, [onNodeClick])

  return (
    <div>
      <div className="mermaid" ref={chartRef}>
        {chart}
      </div>
    </div>
  )
}

export default MermaidDiagram
