import React, { useEffect } from "react";
import ClaimbusinessTable from "../../../../components/dashboard/admin-dashboard/claim-business";

import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";

const metadata = {
  title: "Claimed Business | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
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
