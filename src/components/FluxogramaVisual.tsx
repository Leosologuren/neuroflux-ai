import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FluxogramaVisual from './FluxogramaVisual';

export default function AutoFlowGenerator() {
  const [descricao, setDescricao] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  const gerarFluxo = async () => {
    setCarregando(true);
    setResultado(null);

    try {
      const resposta = await fetch('http://localhost:8000/gerar_fluxo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao }),
      });

      const dados = await resposta.json();
      setResultado(dados);
    } catch (erro) {
      console.error('Erro ao gerar fluxo:', erro);
      alert('Ocorreu um erro ao gerar o fluxo. Verifique o backend.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Gerador Automático de Fluxo</h1>

      <div className="space-y-4 mb-6">
        <Label htmlFor="descricao">Descreva o processo:</Label>
        <Input
          id="descricao"
          placeholder="Ex: Processo de contratação de funcionário"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Button onClick={gerarFluxo} disabled={carregando}>
          {carregando ? 'Gerando...' : 'Gerar Fluxo'}
        </Button>
      </div>

      {resultado && resultado.nodes && resultado.edges && (
        <FluxogramaVisual nodes={resultado.nodes} edges={resultado.edges} />
      )}
    </div>
  );
}

