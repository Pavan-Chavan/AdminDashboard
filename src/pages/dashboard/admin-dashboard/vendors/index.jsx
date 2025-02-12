import React, { useEffect } from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";
import VendorTable from "@/components/dashboard/admin-dashboard/vendors";

const metadata = {
  title: "Vendors | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};
const allowedUser = ["admin", "vendor-user"];

export default function Vendors() {
  const navigate = useNavigate();
  useEffect(()=>{
    if (!allowedUser.includes(localStorage.getItem("role"))) {
      navigate("/")
    }
  })
  return (
    <>
      <MetaComponent meta={metadata} />
      <VendorTable />
    </>
  );
}
