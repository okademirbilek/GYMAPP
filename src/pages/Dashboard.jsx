import React from "react"
import Table from "../components/Table"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="listContainer">
        <div className="listTitle">Members</div>
        <Table />
      </div>
    </div>
  )
}

export default Dashboard
