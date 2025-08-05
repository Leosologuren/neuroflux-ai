from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# Permitir requisições do frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class FlowRequest(BaseModel):
    description: str

@app.post("/generate-bpmn-flow")
def generate_bpmn_flow(req: FlowRequest):
    description = req.description

    # Exemplo simples fixo (substitua isso depois pela IA ou parser real)
    nodes = [
        { "id": "1", "type": "start", "data": { "label": "Início" }, "position": { "x": 100, "y": 100 } },
        { "id": "2", "type": "task", "data": { "label": "Receber pedido" }, "position": { "x": 300, "y": 100 } },
    ]
    edges = [
        { "id": "e1-2", "source": "1", "target": "2", "type": "default" }
    ]

    return { "nodes": nodes, "edges": edges }
