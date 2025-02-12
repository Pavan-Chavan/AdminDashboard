import React from "react";
import DashboardPage from "../../../../components/dashboard/admin-dashboard/hotels";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Admin Hotels | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};

export default function BVAdminHotel() {
  return (
    <><br></br>
      <MetaComponent meta={metadata} />
      <DashboardPage />
    </>
  );
}
