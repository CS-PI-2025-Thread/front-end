import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RegisterContract from ".";
import { useContract } from "../../../contexts/ContractContext";

const EditContract = () => {
  const { id } = useParams();
  const { getContractById, contracts } = useContract();
  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contracts.length === 0) {
        return;
      }
    const found = getContractById(id);
    setContractData(found);
    setLoading(false);
  }, [id, getContractById, contracts]);

  if (loading) return <p>Carregando contrato...</p>;
  if (!contractData) return <p>Contrado não encontrado.</p>;

  return <RegisterContract initialData={contractData} />;
};

export default EditContract;
