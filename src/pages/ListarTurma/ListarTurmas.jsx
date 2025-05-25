import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import './ListarTurmas.scss'
import Formulario from '../turma';


function ListarTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [mostrarCadastro, setMostrarCadastro] = useState(false);

  useEffect(() => {
    const turmasSalvas = JSON.parse(localStorage.getItem('turmas')) || [];
    setTurmas(turmasSalvas);
  }, [mostrarCadastro]); // recarrega quando o modal é fechado

  return (
    <div className="listar-container">
      <div className="header">
        <input type="text" placeholder="Busca" className="busca" />
        <button className="btn-add" onClick={() => setMostrarCadastro(true)}>+</button>
      </div>

      <div className="tabela">
        <div className="linha cabecalho">
          <span>Nome</span>
          <span>Modalidade</span>
          <span>Local</span>
          <span>Vagas</span>
          <span>Duração</span>
          <span></span>
        </div>

        {turmas.map((turma, index) => (
          <div key={index} className="linha">
            <span className="color-bullet" style={{ backgroundColor: turma.cor }}></span>
            <span>{turma.turma}</span>
            <span>-</span> {/* Modalidade (não está sendo cadastrada ainda) */}
            <span>{turma.local}</span>
            <span>{turma.vagas}</span>
            <span>{turma.tempo}</span>
            <span><button>✏️</button></span>
          </div>
        ))}
      </div>

      {mostrarCadastro && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setMostrarCadastro(false)}>X</button>
            <Formulario />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarTurmas;
