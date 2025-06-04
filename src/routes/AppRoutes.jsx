import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Info, Layout } from "../pages/client";
import EditClient from "../pages/client/Register/EditClient";
import ContractTable from "../pages/contract/components/ContractTable";
import InfoContract from "../pages/contract/Info";
import EditContract from "../pages/contract/Register/EditContract";
import RegisterContract from "../pages/contract/Register";
import Turma from "../pages/turma";
import ListarTurmas from "../pages/ListarTurma/ListarTurmas";

// Aqui você pode adicionar as rotas do seu projeto
// Você também pode adicionar rotas aninhadas e, se quiser, até dividir elas em arquivos diferentes
// Exemplo: clientRoutes.js, adminRoutes.js, etc. Ai faz a importação e exporta tudo aqui
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cliente" element={<Layout />}>
          <Route index element={<Register />} />
          <Route path=":id" element={<Info />} />
          <Route path=":id/editar" element={<EditClient />} />
        </Route>
        <Route path="/contrato">
          <Route index element={<ContractTable />} />
          <Route path="novo" element={<RegisterContract />} />
          <Route path=":id" element={<InfoContract />} />
          <Route path=":id/editar" element={<EditContract />} />
        </Route>
        <Route path="/listarturma" element={<ListarTurmas />} />
        <Route path="/turma" element={<Turma />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
