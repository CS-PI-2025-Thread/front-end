import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ClassModal from "../Register/index";
import Table from "../../../components/Table/Table";
import { goEdit } from "../../../components/Table/Table";
import { GenericContextProvider } from "../../../contexts/GenericContext";
import { Button, LayoutMenu } from "../../../components";
import InfoTurma from "../Info/index";
import "./styles.scss";

function ClassTable() {
  const navigate = useNavigate();
  const routeName = "turma";
  const [turmas, setTurmas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("turmas")) || [];
    setTurmas(dados);
  }, []);

  const handleCadastroSucesso = () => {
    const dadosAtualizados = JSON.parse(localStorage.getItem("turmas")) || [];
    setTurmas(dadosAtualizados);
    setShowModal(false);
  };

const turmasFiltradas = useMemo(() => {
    if (!search.trim()) return turmas;
    const textoLower = search.toLowerCase();
    return turmas.filter((turma) =>
      (turma.turma && turma.turma.toLowerCase().includes(textoLower)) ||
      (turma.local && turma.local.toLowerCase().includes(textoLower)) ||
      (turma.observacoes && turma.observacoes.toLowerCase().includes(textoLower))
    );
  }, [search, turmas]);

  return (
    <LayoutMenu>
      <GenericContextProvider lSName="turmas">
        <Table
          data={turmasFiltradas}
          headerComponent={() => (
            <>
              <div className="header-left"></div>
              <div className="header-right">
                <input
                  className="field-search"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="bi bi-funnel-fill"></i>
                <Button
                  className="btn-icon-table"
                  onClick={() => setShowModal(true)}
                >
                  Criar Turma
                  <i className="bi-plus"></i>
                </Button>
              </div>
            </>
          )}
          headerCells={[
            "Turma",
            "Quantidade de Vagas",
            "Duração (minutos)",
            "Local da aula",
            "Observações",
            "Cor",
            "",
          ]}
          getRowProps={({ element, setSelectedId }) => ({
            onClick: () => {
              setSelectedId(element.id);
            },
            style: { cursor: "pointer" },
          })}
          visualize={({ selectedId, setSelectedId }) =>
            selectedId !== null && (
              <div className="center-modal-overlay">
                <div className="center-modal-content">
                  <InfoTurma
                    id={selectedId}
                    onClose={() => setSelectedId(null)}
                  />
                </div>
              </div>
            )
          }
        >
          {(element) => (
            <>
              <td style={{ textAlign: "center" }}>{element.turma || "-"}</td>
              <td>{element.vagas || "-"}</td>
              <td>{element.tempo || "-"}</td>
              <td>{element.local || "-"}</td>
              <td>{element.observacoes || "-"}</td>
              <td>
                {element.cor ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: element.cor,
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                ) : (
                  "-"
                )}
              </td>
              <td className="buttons">
                <Button
                  className="btn-icon-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    goEdit(navigate, routeName, element.id);
                  }}
                  title="Editar"
                >
                  <i className="bi bi-pencil-fill bi-cell"></i>
                </Button>
              </td>
            </>
          )}
        </Table>

        {showModal && (
          <ClassModal
            onClose={() => setShowModal(false)}
            onSuccess={handleCadastroSucesso}
          />
        )}
      </GenericContextProvider>
    </LayoutMenu>
  );
}

export default ClassTable;
