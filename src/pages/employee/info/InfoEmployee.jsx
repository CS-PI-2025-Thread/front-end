import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components";
import { useGenericContext } from "../../../contexts/GenericContext";
import EmployeeService from "../../../services/EmployeeService.js";
import { formatCPF, formatRG, formatContact } from "../../../utils/helpers.js";
import "./style.scss";

const InfoEmployee = () => {
  const { id } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const { getStorageObjectById } = useGenericContext();
  const employeeService = new EmployeeService();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeData = await employeeService.findById(id);
        setSelectedEmployee(employeeData);
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };

    fetchEmployee();
  }, [id, employeeService]);

  return (
    <div className="container-employee-info">
      <Button onClick={() => navigate("/funcionario")}>
        <i className="bi bi-arrow-left"></i>
        Voltar
      </Button>
      {selectedEmployee ? (
        <div className="info-grid">
          <div className="column-personal">
            <h2>Dados Pessoais</h2>
            <p>
              <strong>Nome:</strong> {" " + selectedEmployee.name}
            </p>
            <p>
              <strong>Data de Nascimento:</strong>{" "}
              {selectedEmployee && selectedEmployee.birthDate
                ? " " + selectedEmployee.birthDate
                : " - "}
            </p>
            <p>
              <strong>Sexo:</strong>
              {" " + selectedEmployee.gender}
            </p>
            <p>
              <strong>CPF:</strong>
              {" " + formatCPF(selectedEmployee.cpf)}
            </p>
            <p>
              <strong>RG:</strong>
              {selectedEmployee && selectedEmployee.rg
                ? " " + formatRG(selectedEmployee.rg)
                : " - "}
            </p>
            <p>
              <strong>Endereço:</strong>{" "}
              {selectedEmployee &&
              [
                selectedEmployee.address,
                selectedEmployee.number,
                selectedEmployee.complement,
                selectedEmployee.neighborhood,
                selectedEmployee.city,
                selectedEmployee.state,
              ]
                .filter(Boolean)
                .join(", ").length > 0
                ? [
                    selectedEmployee.address,
                    selectedEmployee.number,
                    selectedEmployee.complement,
                    selectedEmployee.neighborhood,
                    selectedEmployee.city,
                    selectedEmployee.state,
                  ]
                    .filter(Boolean)
                    .join(", ")
                : " - "}
            </p>
            <p>
              <strong>Estado Civil:</strong>
              {selectedEmployee && selectedEmployee.maritalStatus
                ? " " + selectedEmployee.maritalStatus
                : " - "}
            </p>
          </div>

          <div className="column-professional">
            <h2>Dados Profissionais</h2>
            <p className="break-word-container">
              <strong>Email:</strong> {" " + selectedEmployee.email}
            </p>
            <p>
              <strong>Contato:</strong>
              {selectedEmployee && selectedEmployee.cellphone
                ? " " + formatContact(selectedEmployee.cellphone)
                : " - "}
            </p>
            <p>
              <strong>Registro Profissional:</strong>
              {" " + selectedEmployee.professionalRegister}
            </p>
            <p>
              <strong>Cargo:</strong>
              {" " + selectedEmployee.role}
            </p>
            <p>
              <strong>Status:</strong>
              {selectedEmployee && selectedEmployee.status
                ? " " + selectedEmployee.status
                : " - "}
            </p>
            <p>
              <strong>Dias da Semana: </strong>
              {selectedEmployee && selectedEmployee.weekDays
                ? selectedEmployee.weekDays.join(", ")
                : " - "}
            </p>
            <p>
              <strong>Turno: </strong>
              {selectedEmployee && selectedEmployee.shift
                ? selectedEmployee.shift
                : " - "}
            </p>
            <p>
              <strong>Início: </strong>
              {"" +selectedEmployee.timeMin}
            </p>
            <p>
              <strong>Final: </strong>
              {"" +selectedEmployee.timeMax}
            </p>
          </div>
        </div>
      ) : (
        "Nenhuma Informação encontrada"
      )}
    </div>
  );
};

export default InfoEmployee;
