import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Table.jsx";
import { goRegistration, goView, goEdit } from "../../../utils/navigation.js";
import { useTableLogic } from "../../../hooks/useTableLogic.jsx";
import { Button } from "../../../components/index.jsx";
import EmployeeService from "../../../services/EmployeeService.js";
import "./style.scss";
import { useEffect, useState } from "react";

function EmployeeTable() {
  const navigate = useNavigate();
  const routeName = "funcionario";
  const employeeService = new EmployeeService();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const response = await employeeService.findAll();
        setEmployees(response);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, []);

  const { search, setSearch, elementsToDisplay } = useTableLogic(
    employees,
    "nome"
  );

  return (
    <Table
      data={elementsToDisplay}
      headerComponent={() => (
        <>
          <div className="header-left"></div>
          <div className="header-right">
            <input
              className="field-search"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="bi bi-funnel-fill"></i>
            <Button
              className="btn-icon-table"
              onClick={() => goRegistration(navigate, routeName)}
            >
              Cadastrar Funcionário
              <i className="bi-plus"></i>
            </Button>
          </div>
        </>
      )}
      headerCells={["Nome", "Cargo", "Status", "Turno", ""]}
      getRowProps={({ element }) => ({
        onClick: () => {
          goView(navigate, routeName, element.id);
        },
        style: { cursor: "pointer" },
      })}
    >
      {(element) => (
        <>
          <td className="truncate-text">{element.name}</td>
          <td className="truncate-text">{element.role}</td>
          <td>{element.status}</td>
          <td>
            {element.shift}
          </td>
          <td className="buttons">
            <Button
              className="btn-icon-edit"
              onClick={(e) => {
                e.stopPropagation();
                goEdit(navigate, routeName, element.id);
              }}
              title="Editar"
            >
              <i className="bi bi-pencil-fill bi-cell"></i>
            </Button>
          </td>
        </>
      )}
    </Table>
  );
}

export default EmployeeTable;
