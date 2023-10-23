import React from "react"
import Sidebar from "../components/Sidebar"

const home = () => {
  return (
    <div className="home display-f">
      <Sidebar />
      <div className="homeContainer flex-6">Container</div>
    </div>
  )
}

export default home
