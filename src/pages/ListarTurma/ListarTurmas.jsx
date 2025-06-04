import React, { useState } from "react";
import Formulario from "../turma/index";
import InfoTurma from "./InfoTurma";
import Table from "../../components/Table/Table";
import GenericContextProvider from "../../contexts/GenericContext";
import EyeIcon from "../../assets/olho.png";
import "./ListarTurmas.scss";

function ListarTurmas() {
  const [modoFormulario, setModoFormulario] = useState(false);
  const [turmaParaEditar, setTurmaParaEditar] = useState(null);

  // Modal de formulário
  const handleNovaTurma = () => {
    setTurmaParaEditar(null);
    setModoFormulario(true);
  };
  const handleEditar = (turma) => {
    setTurmaParaEditar(turma);
    setModoFormulario(true);
  };
  const handleFecharFormulario = () => {
    setModoFormulario(false);
    setTurmaParaEditar(null);
  };

  return (
    <GenericContextProvider lSName="turmas">
      <Table
        headerComponent={({ search, setSearch }) => (
          <>
            <input
              className="field-search"
              type="text"
              placeholder="Buscar turma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-icon-table" onClick={handleNovaTurma}>
              Nova Turma
              <i className="bi bi-plus"></i>
            </button>
          </>
        )}
        headerCells={["", "Nome", "Duração", "Local", ""]}
        getRowProps={({ element, setSelectedId }) => ({
          onClick: () => setSelectedId(element.id),
          style: { cursor: "pointer" },
        })}
        visualize={({ selectedId, setSelectedId }) =>
          selectedId && (
            <InfoTurma
              turmaId={selectedId}
              onClose={() => setSelectedId(null)}
            />
          )
        }
      >
        {(turma) => (
          <>
            <td>
              <span
                className="turma-color-dot"
                style={{ backgroundColor: turma.cor }}
              ></span>
            </td>
            <td>{turma.turma}</td>
            <td>{turma.tempo}</td>
            <td>{turma.local}</td>
            <td className="turma-actions">
              <button
                className="turma-btn-edit"
                title="Editar"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditar(turma);
                }}
              >
                <span role="img" aria-label="Editar">
                  ✏️
                </span>
              </button>
              <button
                className="turma-btn-view"
                title="Visualizar"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(turma.id);
                }}
              >
                <img
                  src={EyeIcon}
                  alt="Visualizar"
                  style={{ width: 20, height: 20 }}
                />
              </button>
            </td>
          </>
        )}
      </Table>

      {modoFormulario && (
        <div className="turma-modal-overlay" onClick={handleFecharFormulario}>
          <div
            className="turma-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="turma-modal-close"
              onClick={handleFecharFormulario}
            >
              ×
            </button>
            <Formulario
              turmaEditando={turmaParaEditar}
              aoSalvar={handleFecharFormulario}
              aoCancelar={handleFecharFormulario}
            />
          </div>
        </div>
      )}
    </GenericContextProvider>
  );
}

export default ListarTurmas;