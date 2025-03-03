import React, { useEffect } from "react";
import ClaimbusinessTable from "../../../../components/dashboard/admin-dashboard/claim-business";

import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";

const metadata = {
  title: "Claimed Business | Jio Kheti - अन्नदाता सुखी भव:",
  description: "Jio Kheti - अन्नदाता सुखी भव:",
};

export default function ClaimedBusiness() {
  const navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("role") !== "admin") {
      navigate("/")
    }
  })
  return (
    <>
      <MetaComponent meta={metadata} />
      <ClaimbusinessTable />
    </>
  );
}
