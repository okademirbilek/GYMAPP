import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAdminAuth } from "../context/AdminContext"
import { useParams } from "react-router-dom"
import FormMeasurement from "../components/FormMeasurement"

const UserDetail = () => {
  const [measurementData, setMeasurementData] = useState(null)
  const params = useParams()
  const { userData, addNewMeasurement } = useAdminAuth()

  const data = userData.filter((user) => user.id === params.id)
  useEffect(() => {
    if (data) {
      const dataArr = data[0]?.measurements?.map((item, index) => (
        <FormMeasurement
          key={index}
          data={item}
          uid={params.id}
          measurementData={data[0].measurements}
        />
      ))
      setMeasurementData(dataArr)
    }
  }, [userData])

  return (
    <div className="user-detail-container p-2">
      <Link to="/dashboard" className="bg-primary p-1 br-lg cursor-p">
        Back to Users page
      </Link>
      <div className="profile">
        <h2>Profile</h2>
      </div>
      <div className="payment">
        <h2>Payment</h2>
      </div>
      <div className="measurement">
        <h2>Measurement</h2>
        {measurementData}
        <button
          onClick={() => addNewMeasurement(params.id)}
          className="bg-primary p-1 br-sm"
        >
          +Add new Measurement
        </button>
      </div>
    </div>
  )
}

export default UserDetail
