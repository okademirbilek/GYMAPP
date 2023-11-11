import React, { useState, useEffect } from "react"
import { useAdminAuth } from "../../context/AdminContext"
import { convertTime } from "../../utils/utils"
import useToggle from "../../customHooks/useToggle"

const FormPayment = ({ data, paymentData, uid }) => {
  const [formData, setFormData] = useState(null)
  const { updatePayment } = useAdminAuth()

  //toggle
  const [value, toggleValue] = useToggle(false)

  //error
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)

  useEffect(() => {
    if (data) {
      setFormData(data)
      setLoading(false)
    }
  }, [data])

  async function handleSubmit(e) {
    e.preventDefault()
    let updatedData = []
    paymentData.map((item) => {
      if (item.id === data.id) {
        updatedData.push({ ...formData, timeStamp: new Date() })
      } else {
        updatedData.push(item)
      }
    })
    setError("")
    setStatus("submitting")
    await updatePayment(uid, updatedData)
      .then(() => console.log("success"))
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setStatus("idle")
      })
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }
  //handle if user refresh the page
  if (loading) {
    return <h2>🌀 Loading...</h2>
  }

  return (
    <div className="form-payment">
      <span className="date display-f align-center gp-1">
        <h3>{convertTime(formData?.timeStamp)}</h3>
      </span>
      <form onSubmit={handleSubmit}>
        <label>
          Price
          <input
            name="price"
            onChange={handleChange}
            type="number"
            // placeholder="Price"
            value={formData.price}
            id="price"
          />{" "}
          TL
        </label>
        <label>
          Confirm Payment
          <input
            name="isConfirmed"
            onChange={handleChange}
            type="checkbox"
            placeholder="Confirm Payment"
            checked={formData.isConfirmed}
            id="isConfirmed"
          />
        </label>
        {error && (
          <div className="alert">
            <h3 className="login-error">{error}</h3>
          </div>
        )}
        <button
          type="sumbit"
          className="bg-primary"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  )
}

export default FormPayment
