import React, { useState, useEffect } from "react"
import { useAdminAuth } from "../../context/AdminContext"
import { convertTime } from "../../utils/utils"

const FormMeasurement = ({ data, measurementData, uid }) => {
  const [lockForm, setLockForm] = useState(true)
  const [formData, setFormData] = useState(null)

  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)

  const { updateMeasurement } = useAdminAuth()

  useEffect(() => {
    if (data) {
      setFormData(data)
      setLoading(false)
    }
  }, [data])

  function handleSubmit(e) {
    e.preventDefault()
    let updatedData = []
    measurementData.map((item) => {
      if (item.id === data.id) {
        updatedData.push({ ...formData, timeStamp: new Date() })
      } else {
        updatedData.push(item)
      }
    })
    updateMeasurement(uid, updatedData)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // function convertTime(timestamp) {
  //   if (timestamp) {
  //     const date = new Date(timestamp.seconds * 1000).toDateString()
  //     // console.log(date)
  //     return date
  //   }
  // }

  //handle if user refresh the page
  if (loading) {
    return <h2>🌀 Loading...</h2>
  }

  return (
    <>
      <div>FormMeasurement date:{convertTime(formData?.timeStamp)}</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="arm"
          onChange={handleChange}
          type="number"
          placeholder="Arm"
          value={formData.arm}
          id="arm"
          disabled={lockForm}
        />
        <input
          name="biceps"
          onChange={handleChange}
          type="number"
          placeholder="biceps"
          value={formData.biceps}
          id="biceps"
          disabled={lockForm}
        />
        <input
          name="chest"
          onChange={handleChange}
          type="number"
          placeholder="chest"
          value={formData.chest}
          id="chest"
          disabled={lockForm}
        />
        <input
          name="fat"
          onChange={handleChange}
          type="number"
          placeholder="fat"
          value={formData.fat}
          id="fat"
          disabled={lockForm}
        />
        <input
          name="hip"
          onChange={handleChange}
          type="number"
          placeholder="hip"
          value={formData.hip}
          id="hip"
          disabled={lockForm}
        />
        <input
          name="iliaccrest"
          onChange={handleChange}
          type="number"
          placeholder="iliaccrest"
          value={formData.iliaccrest}
          id="iliaccrest"
          disabled={lockForm}
        />
        <input
          name="leg"
          onChange={handleChange}
          type="number"
          placeholder="leg"
          value={formData.leg}
          id="leg"
          disabled={lockForm}
        />
        <input
          name="shoulder"
          onChange={handleChange}
          type="number"
          placeholder="shoulder"
          value={formData.shoulder}
          id="shoulder"
          disabled={lockForm}
        />
        <input
          name="subscapular"
          onChange={handleChange}
          type="number"
          placeholder="subscapular"
          value={formData.subscapular}
          id="subscapular"
          disabled={lockForm}
        />
        <input
          name="triceps"
          onChange={handleChange}
          type="number"
          placeholder="triceps"
          value={formData.triceps}
          id="triceps"
          disabled={lockForm}
        />
        <input
          name="waist"
          onChange={handleChange}
          type="number"
          placeholder="waist"
          value={formData.waist}
          id="waist"
          disabled={lockForm}
        />
        <input
          name="weight"
          onChange={handleChange}
          type="number"
          placeholder="weight"
          value={formData.weight}
          id="weight"
          disabled={lockForm}
        />

        <button
          type="button"
          onClick={() => setLockForm((prevFrom) => !prevFrom)}
          className="bg-primary"
        >
          {lockForm ? "unlock" : "lock"}
        </button>

        {error && (
          <div className="alert">
            <h3 className="login-error">{error}</h3>
          </div>
        )}
        <button className="bg-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Saving..." : "Save"}
        </button>
      </form>
    </>
  )
}

export default FormMeasurement
