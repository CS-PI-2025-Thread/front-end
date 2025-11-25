import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components";
import "./infoClient.scss";
import ClientService from "../../../services/ClientService";
import { Data, Sale, Payment } from "../components/sections";

const TABS_CONFIG = {
  Status: () => <div>- Status -</div>,
  Data: Data,
  Sale: Sale,
  Payment: Payment,
  Contract: () => <div>- Contrato -</div>,
  ClassRoom: () => <div>- Turma -</div>,
  Training: () => <div>- Treino -</div>,
  Evaluation: () => <div>- Avaliação -</div>,
};

const Info = () => {
  const { id } = useParams();
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState("Data");
  const [lastSaleIds, setLastSaleIds] = useState(null);
  const clientService = new ClientService();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const clients = await clientService.findById(id);
        setSelectedClient(clients);
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        setSelectedClient(null);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  const handleSaleSuccess = useCallback(
    (saleId) => {
      setLastSaleIds({ clientId: id, saleId });
      setActiveTab("Payment");
    },
    [id]
  );

  const handleBackFromPayment = useCallback(() => {
    setLastSaleIds(null);
    setActiveTab("Sale");
  }, []);

  const renderContent = () => {
    if (lastSaleIds?.saleId && lastSaleIds?.clientId) {
      return (
        <Payment
          clientId={lastSaleIds.clientId}
          saleId={lastSaleIds.saleId}
          onBack={handleBackFromPayment}
        />
      );
    }

    const ComponentToRender = TABS_CONFIG[activeTab];
    if (ComponentToRender) {
      if (activeTab === "Sale") {
        return <Sale clientId={id} onSaleSuccess={handleSaleSuccess} />;
      }
      return <ComponentToRender clientId={id} />;
    }
    return <div>Selecione uma aba.</div>;
  };

  const TAB_DISPLAY_NAMES = {
    Data: "Dados",
    Status: "Status",
    Sale: "Venda",
    Payment: "Pagamento",
    Contract: "Contrato",
    ClassRoom: "Turma",
    Training: "Treino",
    Evaluation: "Avaliação",
  };

  return (
    <div className="container">
      <div className="client-container">
        <div className="client-side">
          {selectedClient?.photo ? (
            <img src={selectedClient.photo} alt="Foto" className="photo-user" />
          ) : (
            <i className="bi bi-person-fill photo-user"></i>
          )}

          <p className="client-name">
            {selectedClient ? selectedClient.name : "Nome"}
          </p>
          <Button>Anexos</Button>
        </div>

        <div className="client-content">
          <div className="tabs">
            {Object.keys(TABS_CONFIG).map((tabName) => (
              <Button
                key={tabName}
                className={`btn menu-btn ${
                  activeTab === tabName ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab(tabName);
                  setLastSaleIds(null);
                }}
              >
                {TAB_DISPLAY_NAMES[tabName]}
              </Button>
            ))}
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Info;
