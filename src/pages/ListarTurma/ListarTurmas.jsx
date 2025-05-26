import React, { useEffect, useState } from 'react';
import Formulario from '../turma/index';
import './ListarTurmas.scss';

function ListarTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [busca, setBusca] = useState('');
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [modoFormulario, setModoFormulario] = useState(false);
  const [turmaParaEditar, setTurmaParaEditar] = useState(null);

  useEffect(() => {
    carregarTurmas();
  }, []);

  const carregarTurmas = () => {
    const turmasSalvas = JSON.parse(localStorage.getItem('turmas')) || [];
    setTurmas(turmasSalvas);
  };

  const handleVisualizar = (turma) => {
    setTurmaSelecionada(turma);
  };

  const handleEditar = (turma) => {
    setTurmaParaEditar(turma);
    setModoFormulario(true);
  };

  const handleNovaTurma = () => {
    setTurmaParaEditar(null);
    setModoFormulario(true);
  };

  const handleFecharFormulario = () => {
    setModoFormulario(false);
    setTurmaParaEditar(null);
    carregarTurmas();
  };

  const turmasFiltradas = turmas.filter(t =>
    t.turma.toLowerCase().includes(busca.toLowerCase())
  );

  if (modoFormulario) {
    return (
      <Formulario
        turmaEditando={turmaParaEditar}
        aoSalvar={handleFecharFormulario}
        aoCancelar={handleFecharFormulario}
      />
    );
  }

  return (
    <div className="listar-container">
      <div className="header">
        <input
          className="busca"
          type="text"
          placeholder="Buscar turma..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ width: '300px' }}
        />
        <button className="btn-add" onClick={handleNovaTurma}>+</button>
      </div>

      <div className="tabela">
        <div className="linha cabecalho">
          <div></div>
          <div>Nome</div>
          <div>Duração</div>
          <div>Local</div>
          <div>Editar</div>
          <div>Visualizar</div>
        </div>
        {turmasFiltradas.map((turma, idx) => (
          <div key={idx} className="linha">
            <span className="color-bullet" style={{ backgroundColor: turma.cor }}></span>
            <span>{turma.turma}</span>
            <span>{turma.tempo}</span>
            <span>{turma.local}</span>
            <button onClick={() => handleEditar(turma)}>✏️</button>
            <button onClick={() => handleVisualizar(turma)}>👁️</button>
          </div>
        ))}
      </div>

      {turmaSelecionada && (
        <div className="modal" onClick={() => setTurmaSelecionada(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setTurmaSelecionada(null)}>×</button>
            <h2>{turmaSelecionada.turma}</h2>
            <p><strong>Vagas:</strong> {turmaSelecionada.vagas}</p>
            <p><strong>Duração:</strong> {turmaSelecionada.tempo}</p>
            <p><strong>Local:</strong> {turmaSelecionada.local}</p>
            <p><strong>Observações:</strong> {turmaSelecionada.observacoes}</p>
            <p><strong>Cor:</strong> <span className="color-bullet" style={{ backgroundColor: turmaSelecionada.cor }} /></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarTurmas;
