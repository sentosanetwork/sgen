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

      mermaid.init(undefined, document.querySelector('#mermaid'))

      // Example: Event listeners for nodes
      document.getElementById('node-StartMobileApp').addEventListener('click', () => {
        alert('Start Mobile App Development clicked!')
      })

      document.getElementById('node-Beginner').addEventListener('click', () => {
        alert('Phase 1: Beginner clicked!')
      })
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
