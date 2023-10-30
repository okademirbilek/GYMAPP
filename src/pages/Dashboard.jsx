import React, { useState, useEffect } from "react"
import Table from "../components/Table"
import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
  const { userData } = useAuth()
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
