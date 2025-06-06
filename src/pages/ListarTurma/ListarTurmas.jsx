import React from "react";
import { useNavigate } from "react-router-dom";
import Table, { goRegistration, goEdit } from "../../components/Table/Table";
import GenericContextProvider from "../../contexts/GenericContext";
import InfoTurma from "./InfoTurma";
import EyeIcon from "../../assets/olho.png";
import "./ListarTurmas.scss";

function ListarTurmas() {
  const navigate = useNavigate();
  const routeName = "turma"; // rota para o formulário de cadastro

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
            <button
              className="btn-icon-table"
              onClick={() => goRegistration(navigate, routeName)}
            >
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
              turma='../'
              onClose={() => setSelectedId(null)}
            />
          )
        }
      >
        {(element) => (
          <>
            <td>
              <span
                className="turma-color-dot"
                style={{ backgroundColor: element.cor }}
              ></span>
            </td>
            <td>{element.turma}</td>
            <td>{element.tempo}</td>
            <td>{element.local}</td>
            <td className="turma-actions">
              <button
                className="turma-btn-edit"
                title="Editar"
                onClick={(e) => {
                  e.stopPropagation();
                  goEdit(navigate, routeName, element.id);
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
                  setSelectedId(element.id);
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
    </GenericContextProvider>
  );
}

export default ListarTurmas;