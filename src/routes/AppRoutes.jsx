import { BrowserRouter, Routes } from "react-router-dom";
import CheckoutRoutes from "./CheckoutRoutes";
import ClientRoutes from "./ClientRoutes";
import ContractRoutes from "./ContractRoutes";
import ClassRoutes from "./ClassRoutes";
import LoginRoutes from "./LoginRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import DiscountRoutes from "./DiscountRoutes";
import AgreementRoutes from "./AgreementsRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ClientRoutes()}
        {ContractRoutes()}
        {CheckoutRoutes()}
        {ClassRoutes()}
        {LoginRoutes()}
        {EmployeeRoutes()}
        {DiscountRoutes()}
        {AgreementRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
