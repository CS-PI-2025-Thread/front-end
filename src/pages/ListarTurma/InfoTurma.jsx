import React from "react";

function InfoTurma({ turma, onClose }) {
  if (!turma) return null;
  return (
    <div className="turma-modal-overlay" onClick={onClose}>
      <div className="turma-modal-content" onClick={e => e.stopPropagation()}>
        <button className="turma-modal-close" onClick={onClose}>×</button>
        <h2>{turma.turma}</h2>
        <p><strong>Vagas:</strong> {turma.vagas}</p>
        <p><strong>Duração:</strong> {turma.tempo}</p>
        <p><strong>Local:</strong> {turma.local}</p>
        <p><strong>Observações:</strong> {turma.observacoes}</p>
        <p><strong>Cor:</strong> <span className="turma-color-dot" style={{ backgroundColor: turma.cor }} /></p>
      </div>
    </div>
  );
}

export default InfoTurma;