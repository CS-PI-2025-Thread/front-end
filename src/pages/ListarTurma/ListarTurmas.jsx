import React, { useEffect, useState } from 'react';
import Formulario from '../turma/index';
import './ListarTurmas.scss';
import EyeIcon from '../../assets/olho.png'

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
    turmasSalvas.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setTurmas(turmasSalvas);
  };

  const turmasFiltradas = turmas.filter(t =>
    t.turma.toLowerCase().includes(busca.toLowerCase())
  );

  const handleVisualizar = (turma) => setTurmaSelecionada(turma);

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

  return (
    <div className="turma-table-container">
      <div className="turma-table-header">
        <input
          className="turma-search-field"
          type="text"
          placeholder="Buscar turma..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
        <button className="turma-btn-add" onClick={handleNovaTurma}>Nova Turma</button>
      </div>

      <div className="turma-table-list">
        <div className="turma-table-row turma-table-head">
          <div></div>
          <div>Nome</div>
          <div>Duração</div>
          <div>Local</div>
          <div>Ações</div>
        </div>
        {turmasFiltradas.map((turma, idx) => (
          <div key={idx} className="turma-table-row">
            <span className="turma-color-dot" style={{ backgroundColor: turma.cor }}></span>
            <span>{turma.turma}</span>
            <span>{turma.tempo}</span>
            <span>{turma.local}</span>
            <span className="turma-actions">
              <button className="turma-btn-edit" onClick={() => handleEditar(turma)} title="Editar">
                <span role="img" aria-label="Editar">✏️</span>
              </button>
              <button className="turma-btn-view" onClick={() => handleVisualizar(turma)} title="Visualizar">
                <img src={EyeIcon} alt="Visualizar" style={{ width: 20, height: 20 }} />
              </button>
            </span>
          </div>
        ))}
      </div>

      
      {modoFormulario && (
        <div className="turma-modal-overlay" onClick={handleFecharFormulario}>
          <div className="turma-modal-content" onClick={e => e.stopPropagation()}>
            <button className="turma-modal-close" onClick={handleFecharFormulario}>×</button>
            <Formulario
              turmaEditando={turmaParaEditar}
              aoSalvar={handleFecharFormulario}
              aoCancelar={handleFecharFormulario}
            />
          </div>
        </div>
      )}

      
      {turmaSelecionada && (
        <div className="turma-modal-overlay" onClick={() => setTurmaSelecionada(null)}>
          <div className="turma-modal-content" onClick={e => e.stopPropagation()}>
            <button className="turma-modal-close" onClick={() => setTurmaSelecionada(null)}>×</button>
            <h2>{turmaSelecionada.turma}</h2>
            <p><strong>Vagas:</strong> {turmaSelecionada.vagas}</p>
            <p><strong>Duração:</strong> {turmaSelecionada.tempo}</p>
            <p><strong>Local:</strong> {turmaSelecionada.local}</p>
            <p><strong>Observações:</strong> {turmaSelecionada.observacoes}</p>
            <p><strong>Cor:</strong> <span className="turma-color-dot" style={{ backgroundColor: turmaSelecionada.cor }} /></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarTurmas;