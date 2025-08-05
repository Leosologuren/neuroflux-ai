import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  ReactFlowProvider
} from "@xyflow/react";
import "reactflow/dist/style.css";
import { useFlow, useFlowActions } from "@/lib/store/useFlow";

function App() {
  const { nodes, edges, setNodes, setEdges } = useFlow();
  const { addNode, onConnect, deleteNode } = useFlowActions();

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) =>
          setNodes((nds) => nds.map((n) => ({ ...n, selected: false })))
        }
        onEdgesChange={(changes) =>
          setEdges((eds) => eds.map((e) => ({ ...e, selected: false })))
        }
        onConnect={onConnect}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}
