import React, { useEffect } from "react";

import MetaComponent from "@/components/common/MetaComponent";
import { useNavigate } from "react-router-dom";
import BlogCommentsList from "@/components/dashboard/admin-dashboard/blog-comment";

const metadata = {
  title: "Users | Jio Kheti - अन्नदाता सुखी भव:",
  description: "Jio Kheti - अन्नदाता सुखी भव:",
};
const allowedUser = ["admin"];

export default function BlogComments() {
  // const navigate = useNavigate();
  // useEffect(()=>{
  //   if (!allowedUser.includes(localStorage.getItem("role"))) {
  //     navigate("/");
  //   }
  // })
  return (
    <>
      <MetaComponent meta={metadata} />
      <BlogCommentsList />
    </>
  );
}
