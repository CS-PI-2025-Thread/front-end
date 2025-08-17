import { useState, useEffect, useMemo } from "react";
import ClassModal from "../Register/index";
import Table from "../../../components/Table/Table";
import { GenericContextProvider } from "../../../contexts/GenericContext";
import { Button, LayoutMenu } from "../../../components";
import InfoTurma from "../Info/index";
import "./styles.scss";

function ClassTable() {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [idEdit, setIdEdit] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedInfoId, setSelectedInfoId] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("turmas")) || [];
    setClasses(data);
  }, []);

  const handleCadastroSucesso = () => {
    const updatedData = JSON.parse(localStorage.getItem("turmas")) || [];
    setClasses(updatedData);
    setShowModal(false);
    setIdEdit(null);
  };

  const handleOpenEditModal = (id) => {
    setIdEdit(id);
    setShowModal(true);
  };

  const filteredClasses = useMemo(() => {
    if (!search.trim()) return classes;
    const textLower = search.toLowerCase();
    return classes.filter(
      (element) =>
        (element.turma && element.turma.toLowerCase().includes(textLower)) ||
        (element.local && element.local.toLowerCase().includes(textLower)) ||
        (element.observacoes &&
          element.observacoes.toLowerCase().includes(textLower))
    );
  }, [search, classes]);

  return (
    <LayoutMenu>
      <GenericContextProvider lSName="turmas">
        <Table
          data={filteredClasses}
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
                  onClick={() => {
                    setIdEdit(null);
                    setShowModal(true);
                  }}
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
          getRowProps={({ element }) => ({
            onClick: () => {
              setSelectedInfoId(element.id);
              setShowInfoModal(true);
            },
            style: { cursor: "pointer" },
          })}
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
                    handleOpenEditModal(element.id);
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
            id={idEdit}
            onClose={() => setShowModal(false)}
            onSuccess={handleCadastroSucesso}
          />
        )}
        {showInfoModal && (
          <div className="center-modal-overlay">
            <div className="center-modal-content">
              <InfoTurma
                id={selectedInfoId}
                onClose={() => setShowInfoModal(false)}
              />
            </div>
          </div>
        )}
      </GenericContextProvider>
    </LayoutMenu>
  );
}

export default ClassTable;
