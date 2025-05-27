import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import { validationSchemaContract } from "../../../utils/validation";
import {
  Button,
  Input,
  Select,
  CheckboxPanel,
  MonetaryInput,
  MultiSelect,
} from "../../../components";
import { useContract } from "../../../contexts/ContractContext";

import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

const RegisterContract = ({ initialData = null, onSubmit: externalSubmit }) => {
  console.log("teste", initialData);

  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(validationSchemaContract),
    defaultValues: initialData || {},
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const { addContract, updateContract } = useContract();

  const installmentable = watch("installmentable");
  const typeExpire = watch("typeExpire");

  useEffect(() => {
    if (installmentable === "aVista") {
      setValue("installments", undefined);
    }
  }, [installmentable, setValue]);

  let expireLabel = "Validade por ";
  let expirePlaceHolder = "";
  if (typeExpire === "por Seções") {
    expireLabel += "Seções";
    expirePlaceHolder += "Aulas";
  } else if (typeExpire === "por Tempo") {
    expireLabel += "Tempo";
    expirePlaceHolder += "Meses";
  }

  const [classRoms, setClassRoms] = useState([]);
  useEffect(() => {
    const classRomsStorage = localStorage.getItem("turmas");
    if (classRomsStorage) {
      setClassRoms(JSON.parse(classRomsStorage));
    }
  }, []);

  const prepareData = (data) => {
    const parsedData = {
      ...data,
      status: data.status || "",
      template: data.template || "",
      installmentable: data.installmentable || "",
      installments: data.installments ? Number(data.installments) : "",
      totalValue: data.totalValue
        ? Number(
            String(data.totalValue)
              .replace("R$ ", "")
              .replace(/\./g, "")
              .replace(",", ".")
          )
        : "",
      expire: data.expire ? Number(data.expire) : "",
      classRoms: Array.isArray(data.classRoms)
        ? data.classRoms
        : data.classRoms
          ? [data.classRoms]
          : [],
      timeMin: data.timeMin || "",
      timeMax: data.timeMax || "",
      weekdays: Array.isArray(data.weekdays) ? data.weekdays : [],
    };
    return parsedData;
  };

  const onSubmit = (data) => {
    const parsedData = prepareData(data);

    if (externalSubmit) {
      externalSubmit(parsedData);
      return;
    }

    if (initialData && initialData.id) {
      updateContract(initialData.id, parsedData);
      toast.success("Contrato atualizado!");
       navigate("/contrato");
    } else {
      addContract(parsedData);
      toast.success("Contrato cadastrado!");
      reset();
      navigate("/contrato");
    }
  };

  return (
    <div className="container-contract-register">
      <Button onClick={() => navigate("/contrato")}>
        <i className="bi bi-arrow-left"></i>
        Voltar
      </Button>
      
      <main className="form">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="block">
              <h3>Dados Gerais do Contrato</h3>
              <Input label="Nome do Contrato" name="name" required />
              <Select label="Status" name="status">
                <option value="Disponível">Disponível</option>
                <option value="Não Disponível">Não Disponível</option>
              </Select>
              <Select label="Template" name="template">
                <option value="">Selecione</option>
                <option value="Template Azul">Template Azul</option>
                <option value="Template Verde">Template Verde</option>
                <option value="Template Amarelo">Template Amarelo</option>
              </Select>
            </div>

            <div className="block">
              <h3>Parcelamento</h3>
              <Select label="Parcelamento" name="installmentable">
                <option value="">Selecione</option>
                <option value="Parcelável">Parcelável</option>
                <option value="à Vista">À vista</option>
              </Select>
              {installmentable === "Parcelável" && (
                <Input
                  label="Nº de parcelas"
                  name="installments"
                  type="number"
                />
              )}
              <MonetaryInput name="totalValue" label="Valor Total" required />
            </div>

            <div className="block">
              <h3>Vencimento</h3>
              <Select label="Tipo de Vencimento" name="typeExpire" required>
                <option value="">Selecione</option>
                <option value="por Seção">Por Seção</option>
                <option value="por Tempo">Por Tempo</option>
              </Select>
              <Input
                label={expireLabel}
                name="expire"
                type="number"
                placeholder={expirePlaceHolder}
                disabled={typeExpire === ""}
                required
              />
            </div>

            <div className="block">
              <h3>Turma</h3>
              <MultiSelect
                name="classRoms"
                label="Turmas"
                options={classRoms}
              />
              <div className="side">
                <Input label="Horário" name="timeMin" type="time" />
                <span className="arrow-time">-</span>
                <Input label="." name="timeMax" type="time" />
              </div>
              <CheckboxPanel
                name="weekdays"
                label="Dias da Semana"
                options={[
                  { value: "domingo", label: "Dom" },
                  { value: "segunda", label: "Seg" },
                  { value: "terca", label: "Ter" },
                  { value: "quarta", label: "Qua" },
                  { value: "quinta", label: "Qui" },
                  { value: "sexta", label: "Sex" },
                  { value: "sabado", label: "Sáb" },
                ]}
              />
            </div>

            <Button>{initialData ? "Atualizar" : "Salvar"}</Button>
          </form>
        </FormProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default RegisterContract;
