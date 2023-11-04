import React, { useState, useEffect } from "react"
import Table from "../components/Table"
import { useAdminAuth } from "../context/AdminContext"

const Dashboard = () => {
  const { userData } = useAdminAuth()
  return (
    <div className="dashboard">
      <div className="listContainer">
        <div className="listTitle">Members</div>
        <Table data={userData} />
      </div>
    </div>
  )
}

export default Dashboard
