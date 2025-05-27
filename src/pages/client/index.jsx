import ListClient from "./components/ListClient";
import { Outlet } from "react-router-dom";

// Cria aqui mesmo porque é algo simples para controlar o roteamento
export const Layout = () => {
  return (
    <div className="container">
      <div className="list-container">
        <ListClient />
      </div>

      <div className="client-container">
        <Outlet />
      </div>
    </div>
  );
};

export { default as Register } from "./Register";
export { default as Info } from "./Info";
