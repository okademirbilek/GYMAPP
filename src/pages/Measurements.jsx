import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import TableMeasurement from "../components/TableMeasurement"
import { waist2 } from "../assets/images/body/imports"

const Measurements = () => {
  const [loading, setLoading] = useState(true)
  const { currentUserData } = useAuth()

  useEffect(() => {
    if (currentUserData) {
      // console.log(currentUserData)
      setLoading(false)
    }
  }, [currentUserData])

  //handle if user refresh the page
  if (loading) {
    return <h2>🌀 Loading...</h2>
  }
  return (
    <div>
      <h2 className="mt-2 ml-2 display-f align-center">
        Measurements <img src={waist2} alt="hip" />
      </h2>
      {currentUserData?.measurements?.map((data) => (
        <TableMeasurement key={data.timeStamp} data={data} />
      ))}
    </div>
  )
}

export default Measurements
