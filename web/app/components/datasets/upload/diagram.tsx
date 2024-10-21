import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

// Props definition
type MermaidDiagramProps = {
  chart: string // Mermaid chart syntax passed as a prop
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize Mermaid when component mounts
    mermaid.initialize({ startOnLoad: true })

    if (chartRef.current) {
      // Generate the diagram in the ref container
      mermaid.contentLoaded()
    }
  }, [chart]) // Re-run the effect if the chart prop changes

  return (
    <div>
      <div className="mermaid" ref={chartRef}>
        {chart}
      </div>
    </div>
  )
}

export default MermaidDiagram
