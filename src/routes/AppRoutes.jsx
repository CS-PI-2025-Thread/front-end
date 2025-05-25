import React from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { Register, Info, Layout } from "../pages/client";
import RegisterContract from "../pages/contract/Register";
import EditClient from "../pages/client/Register/EditClient";
import EditContract from "../pages/contract/Register/EditContract";
import { LayoutContract } from "../pages/contract";
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
        <Route path="/contrato" element={<LayoutContract   />}>
          <Route index element={<RegisterContract />} />
          <Route path=":id/editar" element={<EditContract />} />
        </Route> 
        <Route path="/listarturma" element={<ListarTurmas/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
