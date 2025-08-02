import { Route } from "react-router-dom";
import ClassTable from "../pages/class/components/ClassTable";
import Class from "../pages/class/Register/index.jsx";

const ClassRoutes = () => {
    return (
        <Route path="/turma">
          <Route index element={<ClassTable />} />
        </Route>
    );
}

export default ClassRoutes;