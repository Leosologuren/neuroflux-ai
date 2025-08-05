// src/components/AutoFlowGenerator.tsx

import React, { useState } from "react";
import { useFlow } from "@/lib/store/useFlow";
import { FlowCanvas } from "@/components/canvas/FlowCanvas";
import { generateFlowFromText } from "@/lib/ai/generate-flow";

export default function AutoFlowGenerator() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const { setNodes, setEdges } = useFlow();

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const { nodes, edges } = await generateFlowFromText(inputText);
      setNodes(nodes);
      setEdges(edges);
    } catch (error) {
      console.error("Erro ao gerar o fluxo:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">NeuroFlux AI</h1>
      <p className="text-sm text-gray-500">
        Descreva abaixo o seu processo e gere automaticamente o fluxograma BPMN:
      </p>
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows={3}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Exemplo: O cliente faz um pedido..."
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Gerando..." : "Gerar Fluxo"}
      </button>

      <div className="h-[600px] border rounded-md">
        <FlowCanvas />
      </div>
    </div>
  );
}
