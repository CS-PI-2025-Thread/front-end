import { Route, Outlet } from "react-router-dom";
import { LayoutMenu } from "../components/index.jsx";
import Discounts from "../pages/discounts/Discounts.jsx";

const DiscountsRoutes = () => {
  return (
    <Route
      path="/promocao"
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

export default DiscountsRoutes;
