import React, { useEffect } from "react";
import AddVenue from "../../../../components/dashboard/admin-dashboard/add-hotel";

import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";

const metadata = {
  title: "Admin Add Venue | WedEazzy - Your Dream Wedding Partner",
  description: "WedEazzy - Your Dream Wedding Partner",
};
const allowedUser = ["admin", "venue-user"];
export default function AdminAddHotel() {
  const navigate = useNavigate();
  useEffect(()=>{
    if (!allowedUser.includes(localStorage.getItem("role"))) {
      navigate("/");
    }
  })
  return (
    <>
      <MetaComponent meta={metadata} />
      <AddVenue />
    </>
  );
}
