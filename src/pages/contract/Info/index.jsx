import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import "./styles.scss";

const InfoContract = ({ id: propId, onClose }) => {
  const params = useParams();
  const id = propId || params.id;
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    const contracts = JSON.parse(localStorage.getItem("contratos")) || [];
    const foundContract = contracts.find((c) => String(c.id) === id);
    setSelectedContract(foundContract);
  }, [id]);

  return (
    <div className="container-contract-info">
      <button
        className="btn-icon"
        onClick={onClose}
        style={{ marginTop: "1rem" }}
      >
        <i className="bi bi-arrow-left"></i>
        Voltar
      </button>
      {selectedContract ? (
        <>
          <p>
            <strong>Nome:</strong> {" " + selectedContract.name}
          </p>
          <p>
            <strong>Status:</strong> {" " + selectedContract.status}
          </p>
          <p>
            <strong>Template:</strong> {" " + selectedContract.template}
          </p>
          <p>
            <strong>Forma de Parcelamento:</strong>
            {" " + selectedContract.installmentable}
          </p>
          {selectedContract.installmentable === "Parcelável" ? (
            <p>
              <strong>Número de Parcelas:</strong>
              {" " + selectedContract.installments}
            </p>
          ) : (
            ""
          )}
          <p>
            <strong>Valor Total:</strong>{" "}
            {" R$ " +
              Number(selectedContract.totalValue)
                .toFixed(2)
                .replace(".", ",")}{" "}
          </p>
          <p>
            <strong>Vencimento:</strong>
            {" " + selectedContract.expire}
            {selectedContract.typeExpire === "por Seção"
              ? " aulas"
              : selectedContract.typeExpire === "por Tempo"
                ? " meses"
                : ""}
          </p>
          <p>
            <strong>Turmas:</strong>
            {" " + selectedContract.classRoms}
          </p>
          <p>
            <strong>Horário de Entrada:</strong>
            {" " + selectedContract.timeMin + " - " + selectedContract.timeMax}
          </p>
          <p>
            <strong>Dias da Semana:</strong>
            {" " + selectedContract.weekdays}
          </p>
        </>
      ) : (
        "Nenhuma Informação encontrada"
      )}
    </div>
  );
};

export default InfoContract;
