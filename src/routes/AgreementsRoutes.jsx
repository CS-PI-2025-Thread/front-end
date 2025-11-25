import { Route, Outlet } from "react-router-dom";
import { LayoutMenu } from "../components/index.jsx";
import Discounts from "../pages/discounts/agreement/AgreementTable.jsx";

const AgreementsRoutes = () => {
  return (
    <Route
      path="/convenio"
      element={
        <LayoutMenu>
          <Outlet />
        </LayoutMenu>
      }
    >
      <Route index element={<Discounts />} />
    </Route>
  );
};

export default AgreementsRoutes;
