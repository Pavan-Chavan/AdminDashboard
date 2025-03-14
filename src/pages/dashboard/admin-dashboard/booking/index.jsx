import React from "react";
import DashboardPage from "../../../../components/dashboard/admin-dashboard/booking";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Admin History | Jio Kheti - अन्नदाता सुखी भव:",
  description: "Jio Kheti - अन्नदाता सुखी भव:",
};

export default function AdminBooking() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
