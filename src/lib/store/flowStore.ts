import { create } from "zustand";
import { Node, Edge } from "@xyflow/react";

type FlowState = {
  nodes: Node[];
  edges: Edge[];
  setNodes: (updater: (nodes: Node[]) => Node[]) => void;
  setEdges: (updater: (edges: Edge[]) => Edge[]) => void;
};

export const flowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (updater) => set((state) => ({ nodes: updater(state.nodes) })),
  setEdges: (updater) => set((state) => ({ edges: updater(state.edges) })),
}));
