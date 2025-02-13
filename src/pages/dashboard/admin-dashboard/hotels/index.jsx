import React from "react";
import DashboardPage from "../../../../components/dashboard/admin-dashboard/hotels";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Admin Hotels | Krushi Maharashtra - अन्नदाता सुखी भव:",
  description: "Krushi Maharashtra - अन्नदाता सुखी भव:",
};

export default function BVAdminHotel() {
  return (
    <><br></br>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
