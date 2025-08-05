import { useCallback } from "react";
import { useStore } from "zustand";
import { shallow } from "zustand/shallow";
import { nanoid } from "nanoid";
import { Node, Edge, Connection, addEdge, updateEdge } from "@xyflow/react";
import { flowStore } from "./flowStore";

export function useFlow() {
  return useStore(
    flowStore,
    shallow
  );
}

export function useFlowActions() {
  const setNodes = useStore(flowStore, (state) => state.setNodes);
  const setEdges = useStore(flowStore, (state) => state.setEdges);

  const addNode = useCallback((x: number, y: number) => {
    const newNode: Node = {
      id: nanoid(),
      position: { x, y },
      data: { label: `Novo nó` },
      type: "default",
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, [setEdges]);

  const onEdgesUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      setEdges((eds) => updateEdge(oldEdge, newConnection, eds));
    },
    [setEdges]
  );

  const deleteNode = useCallback((id: string) => {
    setNodes((nodes) => nodes.filter((n) => n.id !== id));
    setEdges((edges) => edges.filter((e) => e.source !== id && e.target !== id));
  }, [setNodes, setEdges]);

  const deleteEdge = useCallback((id: string) => {
    setEdges((edges) => edges.filter((e) => e.id !== id));
  }, [setEdges]);

  return {
    addNode,
    onConnect,
    onEdgesUpdate,
    deleteNode,
    deleteEdge,
  };
}
