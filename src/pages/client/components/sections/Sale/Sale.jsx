import ContractService from "../../../../../services/ContractService";
import SaleService from "../../../../../services/SaleService";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import "./Sale.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sale = ({ clientId, onSaleSuccess }) => {
  const contractService = useMemo(() => new ContractService(), []);
  const saleService = useMemo(() => new SaleService(), []);
  const [activeTab, setActiveTab] = useState("Contracts");
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const [committedSearchTerm, setCommittedSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = useCallback(() => {
    if (inputSearchTerm !== committedSearchTerm) {
      setCommittedSearchTerm(inputSearchTerm);
      setPage(0);
      setHasMore(true);
      setCommittedSearchTerm(inputSearchTerm);
    }
  }, [inputSearchTerm, committedSearchTerm]);

  const serviceMap = useMemo(
    () => ({
      Contracts: contractService,
      Products: false,
      Services: false,
    }),
    [contractService]
  );

  const fetchEntities = useCallback(
    async (pageToLoad, name) => {
      const service = serviceMap[activeTab];
      if (!service) return;
      if (pageToLoad > 0 && !hasMore) return;
      setIsLoading(true);
      try {
        const dataGeneral = await service.findByName(pageToLoad, name);
        const newContent = dataGeneral.content || [];
        const isLastPage = dataGeneral.last;
        setEntities((prev) =>
          pageToLoad === 0 ? newContent : [...prev, ...newContent]
        );
        setHasMore(!isLastPage);
      } catch (error) {
        console.error(
          `Erro ao carregar página ${pageToLoad} de ${activeTab}:`,
          error
        );
        toast.error(`Falha ao carregar dados. Verifique o console.`, {
          toastId: "load-error",
        });
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [activeTab, serviceMap]
  );

  useEffect(() => {
    setEntities([]);
    setPage(0);
    setHasMore(true);
    setSelectedEntity(null);
    fetchEntities(0, committedSearchTerm);
  }, [activeTab, committedSearchTerm, fetchEntities]);

  useEffect(() => {
    if (page > 0) {
      fetchEntities(page, committedSearchTerm);
    }
  }, [page, fetchEntities, committedSearchTerm]);

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (!currentRef || !serviceMap[activeTab]) return;
    const handleScroll = () => {
      const isBottom =
        currentRef.scrollHeight -
          currentRef.scrollTop -
          currentRef.clientHeight <
        100;
      if (isBottom && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    currentRef.addEventListener("scroll", handleScroll);
    return () => {
      currentRef.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore, activeTab, serviceMap]);

  const displayEntities = entities;

  const handleSell = useCallback(async () => {
    if (!selectedEntity) {
      toast.warn("Selecione um item para realizar a venda.");
      return;
    }
    const saleData = {
      clientId: clientId,
      contractId: null,
      totalAmount: selectedEntity.totalValue,
    };
    switch (activeTab) {
      case "Contracts":
        saleData.contractId = selectedEntity.id;
        break;
      default:
        console.warn(`Aba ativa desconhecida: ${activeTab}`);
        toast.error("Tipo de entidade não reconhecido para a venda.");
        return;
    }
    const payload = Object.fromEntries(
      Object.entries(saleData).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );
    try {
      const saleResult = await saleService.create(payload);
      if (saleResult && saleResult.id && onSaleSuccess) {
        onSaleSuccess(saleResult.id);
        toast.success(
          `Venda de ${selectedEntity.name} realizada para o Cliente (ID): ${saleResult.client.id}!`
        );
      } else {
        toast.error("Falha ao obter ID da venda para prosseguir.");
      }
      setSelectedEntity(null);
    } catch (error) {
      toast.error("Falha na venda. Verifique a conexão ou os dados.");
    }
  }, [selectedEntity, clientId, activeTab, saleService, onSaleSuccess]);

  const handleSelectEntity = (entity) => {
    if (selectedEntity && selectedEntity.id === entity.id) {
      setSelectedEntity(null);
    } else {
      setSelectedEntity(entity);
    }
  };

  const TabButton = ({ tab, name }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`tab-button ${activeTab === tab ? "active" : ""}`}
    >
      {name}
    </button>
  );

  let emptyMessage;
  if (isLoading && entities.length === 0) {
    emptyMessage = (
      <div className="empty-message">Carregando {activeTab}...</div>
    );
  } else if (!serviceMap[activeTab]) {
    emptyMessage = (
      <div className="empty-message">A aba {activeTab} está desativada.</div>
    );
  } else if (displayEntities.length === 0 && !isLoading && !hasMore) {
    emptyMessage = (
      <div className="empty-message">
        Nenhum resultado encontrado para "{committedSearchTerm}".
      </div>
    );
  }

  return (
    <div className="sale-container">
      <div className="tab-bar">
        <TabButton tab="Contracts" name="Contratos" />
        <TabButton tab="Products" name="Produtos" />
        <TabButton tab="Services" name="Serviços" />
      </div>

      <div className="sale-content">
        <div className="actions-bar">
          <input
            type="text"
            placeholder={`Buscar ${activeTab} por nome...`}
            value={inputSearchTerm}
            onChange={(e) => setInputSearchTerm(e.target.value)}
            disabled={!serviceMap[activeTab]}
            className="search-input"
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            disabled={!serviceMap[activeTab] || isLoading}
            className="search-button"
            title="Pesquisar"
          >
            <i className="bi bi-search"></i>
          </button>
        </div>

        <div ref={scrollRef} className="entity-list-container">
          {displayEntities.length === 0 && !isLoading ? (
            emptyMessage
          ) : (
            <>
              <div className="entity-list-header">
                <span>ID</span>
                <span>Nome</span>
                <span>Preço</span>
              </div>

              {displayEntities.map((entity) => (
                <div
                  key={`${activeTab}-${entity.id}`}
                  className={`entity-item 
                        ${
                          selectedEntity && selectedEntity.id === entity.id
                            ? "selected"
                            : ""
                        }`}
                  onClick={() => handleSelectEntity(entity)}
                >
                  <span>{entity.id}</span>
                  <span>{entity.name}</span>
                  <span>
                    R$ {entity.totalValue.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>

        <button
          onClick={handleSell}
          disabled={!selectedEntity || isLoading}
          className="sell-button"
        >
          Realizar Venda
        </button>
      </div>
    </div>
  );
};

export default Sale;
