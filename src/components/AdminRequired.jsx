import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Loader from "./Loader";

const AdminRequired = () => {
  const { currentUserData } = useAuth();

  if (currentUserData?.isAdmin) {
    return <Outlet />;
  }

  return (
    <span className="loader">
      <Loader />
    </span>
  );
};

export default AdminRequired;
