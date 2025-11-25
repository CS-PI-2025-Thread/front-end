import { useState } from "react";
import PromotionTable from "./promotion/PromotionTable";
import AgreementTable from "./agreement/AgreementTable";

const Discounts = () => {
  const [activeMode, setActiveMode] = useState("Promotion");

  const renderTable = () => {
    if (activeMode === "Promotion") {
      return (
        <PromotionTable activeMode={activeMode} setActiveMode={setActiveMode} />
      );
    }
    if (activeMode === "Agreement") {
      return (
        <AgreementTable activeMode={activeMode} setActiveMode={setActiveMode} />
      );
    }
    return null;
  };

  return <div className="discounts-wrapper">{renderTable()}</div>;
};

export default Discounts;
