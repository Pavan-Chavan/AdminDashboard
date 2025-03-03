import React, { useEffect } from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";
import TagsTable from "@/components/dashboard/admin-dashboard/tags";

const metadata = {
  title: "Tags | Jio Kheti - अन्नदाता सुखी भव:",
  description: "Jio Kheti - अन्नदाता सुखी भव:",
};

export default function Tags() {
  // const navigate = useNavigate();
  // useEffect(()=>{
  //   if (localStorage.getItem("role") !== "admin") {
  //     navigate("/")
  //   }
  // })
  return (
    <>
      <MetaComponent meta={metadata} />
      <TagsTable />
    </>
  );
}
