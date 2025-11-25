import { useState, useMemo, useEffect } from "react";
import SaleService from "../../../../../services/SaleService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = ({ clientId, saleId }) => {
  const saleService = useMemo(() => new SaleService(), []);
  const [fetchedSale, setFetchedSale] = useState(null);

  useEffect(() => {
    if (saleId && clientId) {
      const fetchSaleAndValidate = async () => {
        setFetchedSale(null);
        try {
          const sale = await saleService.findById(saleId);
          if (sale) {
            if (sale.client.id == clientId) {
              setFetchedSale(sale);
              console.log("Venda e Cliente Validados:", sale);
            } else {
              toast.error("Erro de validação do cliente.");
            }
          } else {
            toast.error("Venda não encontrada.");
          }
        } catch (error) {
          console.error("Erro ao buscar venda:", error);
          toast.error("Erro de comunicação.");
        }
      };
      fetchSaleAndValidate();
    }
  }, [saleId, clientId, saleService]);

  return (
    <>
      <div>- Pagamento -</div>
    </>
  );
};

export default Payment;
