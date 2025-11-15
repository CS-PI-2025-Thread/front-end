import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fetchAddressByCEP } from "../../../services/viaCep";
import { toast } from "react-toastify";
import { employeeValidationSchema } from "../../../schemas/employeeSchema";
import {
  MaskedInput,
  Button,
  Input,
  Select,
  CheckboxPanel,
} from "../../../components";
import {
  toInternationalFormat,
  toBrazilianFormat,
} from "../../../utils/convertDate";
import EmployeeService from "../../../services/EmployeeService";
import "./style.scss";
import "react-toastify/dist/ReactToastify.css";

const RegisterEmployee = ({ initialData = null, onSubmit: externalSubmit }) => {
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(employeeValidationSchema),
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const { handleSubmit, setValue, watch, reset } = methods;
  const employeeService = new EmployeeService();

  const employee = watch();
  const [editableFields, setEditableFields] = useState({
    address: true,
    district: true,
    city: true,
    state: true,
  });

  useEffect(() => {
    if (initialData) {
      const transformedData = {
        ...initialData,
        birthDate: toInternationalFormat(initialData.birthDate),
      };
      reset(transformedData);
    }
  }, [initialData, reset]);

  const mapWeekDays = (selectedDays) => {
    const allDays = {
      domingo: "sunday",
      segunda: "monday",
      terca: "tuesday",
      quarta: "wednesday",
      quinta: "thursday",
      sexta: "friday",
      sabado: "saturday",
    };

    const result = {};

    Object.entries(allDays).forEach(([pt, en]) => {
      result[en] = selectedDays?.includes(pt) || false;
    });

    return result;
  };
  const prepareData = (data) => {
    const parsedData = {
      ...data,
      name: data.name || "",
      email: data.email || "",
      password: data.password || "",
      birthDate: data.birthDate,
      gender: data.gender || null,
      maritalStatus: data.maritalStatus || null,
      cpf: data.cpf || "",
      rg: data.rg || "",
      professionalRegister: data.professionalRegister || "",
      guardianPhone: data.guardianPhone || "",
      cellphone: data.cellphone || "",
      role: data.role || null,
      status: data.status || null,
      cep: data.cep || "",
      address: data.address || "",
      district: data.district || "",
      city: data.city || "",
      state: data.state || "",
      number: data.number || "",
      complement: data.complement || "",
      shift: data.shift || null,
      timeMin: data.timeMin || "",
      timeMax: data.timeMax || "",
      weekdays: mapWeekDays(data.weekdays),
    };
    return parsedData;
  };

  const onSubmit = (data) => {
    const parsedData = prepareData(data);
    console.log("Dados enviados:", parsedData);
    if (externalSubmit) {
      externalSubmit(parsedData);
      return;
    }

    if (initialData && initialData.id) {
      employeeService.update(initialData.id, parsedData);
      toast.success("Funcionário atualizado!");
    } else {
      employeeService.create(parsedData);
      toast.success("Funcionário cadastrado!");
      reset();
    }
  };

  const searchAddress = async () => {
    const cep = employee.cep?.replace(/\D/g, "");
    if (cep?.length === 8) {
      const data = await fetchAddressByCEP(cep);
      if (data) {
        setValue("address", data.logradouro || "");
        setValue("district", data.bairro || "");
        setValue("city", data.localidade || "");
        setValue("state", data.uf || "");
        setEditableFields({
          address: false,
          district: false,
          city: false,
          state: false,
        });
      } else {
        setEditableFields({
          address: true,
          district: true,
          city: true,
          state: true,
        });
      }
    }
  };

  return (
    <div className="container-employee-register">
      <Button onClick={() => navigate("/funcionario")}>
        <i className="bi bi-arrow-left"></i>
        Voltar
      </Button>

      <main className="form">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="block">
              <h3>Dados Gerais do Funcionário</h3>
              <Input
                label="Nome Completo"
                name="name"
                required
                className="full-width"
              />
              <div className="row">
                <Input label="Email" name="email" type="email" required />
                <Input label="Senha" name="password" type="password" required />
              </div>

              <div className="row">
                <Input
                  label="Data de Nascimento"
                  name="birthDate"
                  type="birthDate"
                  required
                />
                <Select label="Sexo" name="gender" required>
                  <option value="">Selecione</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMININO">Feminino</option>
                </Select>
                <Select label="Estado Civil" name="maritalStatus">
                  <option value="">Selecione</option>
                  <option value="SOLTEIRO">Solteiro</option>
                  <option value="CASADO">Casado</option>
                  <option value="DIVORCIADO">Divorciado</option>
                  <option value="VIÚVO">Viúvo</option>
                </Select>
              </div>
              <div className="row">
                <MaskedInput
                  label="CPF"
                  name="cpf"
                  mask="000.000.000-00"
                  required
                />

                <Input label="RG" name="rg" />
                <Input
                  label="Registro Profissional"
                  name="professionalRegister"
                  required
                />
              </div>

              <div className="row">
                <MaskedInput
                  label="Telefone"
                  name="guardianPhone"
                  mask="(00) 00000-0000"
                />
                <MaskedInput
                  label="Celular"
                  name="cellphone"
                  mask="(00) 00000-0000"
                />
                <Select label="Cargo" name="role" required>
                  <option value="">Selecione</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="PROFESSOR">Professor</option>
                  <option value="PERSONAL_TRAINER">Personal Trainer</option>
                  <option value="RECEPCIONISTA">Recepcionista</option>
                </Select>
                <Select label="Status" name="status" required>
                  <option value="ATIVO">Ativo</option>
                  <option value="CANCELADO">Cancelado</option>
                </Select>
              </div>
            </div>
            <div className="block">
              <h3>Endereço</h3>
              <div className="row">
                <MaskedInput
                  label="CEP"
                  name="cep"
                  mask="00000-000"
                  onBlur={searchAddress}
                />
                <Input
                  label="Endereço"
                  name="address"
                  disabled={!editableFields.address}
                />
                <Input
                  label="Bairro"
                  name="district"
                  disabled={!editableFields.district}
                />
                <Input
                  label="Cidade"
                  name="city"
                  disabled={!editableFields.city}
                />
                <Input
                  label="UF"
                  name="state"
                  disabled={!editableFields.state}
                />
                <Input label="Número" name="number" />
                <Input label="Complemento" name="complement" />
              </div>
            </div>

            <div className="block">
              <h3>Jornada</h3>
              <div className="row">
                <Select label="Turno" name="shift" required>
                  <option value="">Selecione</option>
                  <option value="MANHA">Manhã</option>
                  <option value="TARDE">Tarde</option>
                  <option value="NOITE">Noite</option>
                </Select>
                <Input
                  label="Horário de Entrada"
                  name="timeMin"
                  type="time"
                  required
                />
                <Input
                  label="Horário de Saída"
                  name="timeMax"
                  type="time"
                  required
                />
              </div>
              <CheckboxPanel
                name="weekdays"
                label="Dias da Semana"
                required
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
      </main>
    </div>
  );
};

export default RegisterEmployee;
