import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { goRegistration, goEdit } from "../../../components/Table/Table";
import GenericContextProvider from "../../../contexts/GenericContext";
import InfoContract from "../Info/index";

import "../../../components/Table/styles.scss";

function Example() {
  const navigate = useNavigate();
  const routeName = "contrato";

  return (
    <GenericContextProvider lSName="contratos">
      <Table
        headerComponent={({ search, setSearch }) => (
          <>
            <input
              className="field-search"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="bi bi-funnel-fill"></i>
            <button
              className="btn-icon-table"
              onClick={() => goRegistration(navigate, routeName)}
            >
              Criar Contrato
              <i className="bi-plus"></i>
            </button>
          </>
        )}
        headerCells={[
          "Nome",
          "Valor Total",
          "Tipo de Vencimento",
          "Vencimento",
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
            <div className="modal-overlay">
              <div className="modal-content">
                <InfoContract
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
            <td>{element.name}</td>
            <td>
              {"R$ " + Number(element.totalValue).toFixed(2).replace(".", ",")}
            </td>
            <td>{element.typeExpire}</td>
            <td>
              {element.expire}
              {element.typeExpire === "por Seção"
                ? " aulas"
                : element.typeExpire === "por Tempo"
                ? " meses"
                : ""}
            </td>
            <td>
              <button
                className="btn-icon-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  goEdit(navigate, routeName, element.id);
                }}
                title="Editar"
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
            </td>
          </>
        )}
      </Table>
    </GenericContextProvider>
  );
}

export default Example;
