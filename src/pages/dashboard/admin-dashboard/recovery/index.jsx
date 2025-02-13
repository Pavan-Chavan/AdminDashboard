import React from "react";
import DashboardPage from "../../../../components/dashboard/admin-dashboard/recovery";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Admin Recovery | Krushi Maharashtra - अन्नदाता सुखी भव:",
  description: "Krushi Maharashtra - अन्नदाता सुखी भव:",
};

export default function BDAdminRecovery() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
