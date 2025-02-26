import React, { useEffect } from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";
import SubcategoryTable from "@/components/dashboard/admin-dashboard/subcategory";

const metadata = {
  title: "Tags | Krushi Maharashtra - अन्नदाता सुखी भव:",
  description: "Krushi Maharashtra - अन्नदाता सुखी भव:",
};

export default function SubCategory() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <SubcategoryTable />
    </>
  );
}
