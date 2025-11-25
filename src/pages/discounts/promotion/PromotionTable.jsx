import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "../../../components";
import Table from "../../../components/Table/Table";
import PromotionService from "../../../services/PromotionService";
import "../discountsTables.scss";

function PromotionTable({ activeMode, setActiveMode }) {
  const [showModal, setShowModal] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedInfoId, setSelectedInfoId] = useState(null);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const [data, setData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const promotionService = useMemo(() => new PromotionService(), []);

  const fetchPromotions = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await promotionService.findByName(
        currentPage,
        query,
        size
      );
      setData(response.content || []);
      setTotalElements(response.totalElements || 0);
    } catch (error) {
      console.error("Erro ao carregar promoções:", error);
      setData([]);
      setTotalElements(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, size, query, promotionService]);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  const handleSearch = () => {
    setQuery(search);
    setCurrentPage(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCadastroSucesso = () => {
    setShowModal(false);
    setIdEdit(null);
    fetchPromotions();
  };

  const handleOpenEditModal = (id) => {
    setIdEdit(id);
    setShowModal(true);
  };

  const tableHeaders = ["Nome", "Descrição", "Tipo", "Valor", "Aplicado", ""];

  const renderTableData = (element) => (
    <>
      <td className="truncate-text" style={{ textAlign: "center" }}>
        {element.name || "-"}
      </td>
      <td className="truncate-text">{element.description || "-"}</td>
      <td>
        {element.discountType === "PERCENTAGE"
          ? "Porcentagem"
          : element.discountType === "ABSOLUTE"
          ? "Absoluto"
          : "-"}
      </td>
      <td>
        {element.discountType === "PERCENTAGE"
          ? `${element.value}%`
          : element.discountType === "ABSOLUTE"
          ? `R$ ${element.value.toFixed(2)}`
          : "-"}
      </td>
      <td>{element.timesApplied || "-"}</td>

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
  );

  return (
    <>
      <Table
        data={data}
        loading={isLoading}
        headerComponent={() => (
          <>
            <div className="header-left">
              <Button
                className={`btn-mode ${
                  activeMode === "Promotion" ? "active" : ""
                }`}
                onClick={() => setActiveMode("Promotion")}
              >
                Promoções
              </Button>
              <Button
                className={`btn-mode ${
                  activeMode === "Agreement" ? "active" : ""
                }`}
                onClick={() => setActiveMode("Agreement")}
              >
                Convênios
              </Button>
            </div>
            <div className="header-right">
              <input
                className="field-search"
                placeholder="Buscar por Nome..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
              <i className="bi bi-funnel-fill" onClick={handleSearch}></i>
              <Button
                className="btn-icon-table"
                onClick={() => {
                  setIdEdit(null);
                  setShowModal(true);
                }}
              >
                Novo +
              </Button>
            </div>
          </>
        )}
        headerCells={tableHeaders}
        getRowProps={({ element }) => ({
          onClick: () => {
            setSelectedInfoId(element.id);
            setShowInfoModal(true);
          },
          style: { cursor: "pointer" },
        })}
      >
        {renderTableData}
      </Table>
    </>
  );
}

export default PromotionTable;
