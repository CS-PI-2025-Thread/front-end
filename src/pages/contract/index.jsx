import ListContract from "./components/ListContract";
import { Outlet } from "react-router-dom";


export const LayoutContract = () => {
  return (
    <div className="container">
      <div className="list-container">
        <ListContract/>
      </div>

      <div className="client-container">
        <Outlet />
      </div>
    </div>
  );
};

export { default as RegisterContract } from "./Register";
export { default as InfoContract } from "./Info";
