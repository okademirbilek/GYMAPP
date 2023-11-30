import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { useAdminAuth } from "../../context/AdminContext";
import { useTheme } from "../../context/ThemeContext";

const Dashboard = () => {
  const { userData } = useAdminAuth();
  const { theme } = useTheme();
  return (
    <div className="dashboard">
      <div className={`listContainer ${theme} card-color card-padding `}>
        <div className="listTitle">Members</div>
        <Table data={userData} />
      </div>
    </div>
  );
};

export default Dashboard;
