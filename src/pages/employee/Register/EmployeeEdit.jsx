import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Registeremployee from ".";
import EmployeeService from "../../../services/EmployeeService";

const EmployeeEdit = () => {
    const { id } = useParams();
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const employeeService = new EmployeeService();

    useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await employeeService.findById(id);
        setEmployeeData(data);
      } catch (error) {
        console.error("Erro ao buscar funcionario:", error);
        setEmployeeData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

    if (loading) return <p>Carregando funcionário...</p>;
    if (!employeeData) return <p>Funcionário não encontrado.</p>;

    return <Registeremployee initialData={employeeData} />;
};

export default EmployeeEdit;
