import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useParams } from "react-router-dom"

const UserDetail = () => {
  //signup function from useAuth context (email, password)
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)
  const params = useParams()
  const { userData } = useAuth()

  const data = userData.filter((user) => user.id === params.id)

  // function handleSubmit(e) {
  //   e.preventDefault()
  //   // addMeasurement(measurementData)
  // }

  // function handleChange(e) {
  //   const { name, value } = e.target
  //   setMeasurementData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }))
  // }
  return (
    <div className="p-2">
      <Link to="/dashboard" className="bg-primary p-1 br-lg cursor-p">
        Back to Users page
      </Link>
    </div>
  )
}

export default UserDetail
