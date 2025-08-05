import React, { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface Node {
  id: string;
  type: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

const FlowViewer: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const fetchFlow = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/generate-bpmn-flow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: 'Crie um processo de vendas com as etapas de prospecção, qualificação, proposta, negociação e fechamento.'
          }),
        });

        const data = await response.json();
        setNodes(data.models);
        setEdges(data.edges);
      } catch (error) {
        console.error('Erro ao buscar fluxo:', error);
      }
    };

    fetchFlow();
  }, []);

  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowViewer;
