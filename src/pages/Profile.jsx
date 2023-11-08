import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { convertTime } from "../utils/utils"

const Profile = () => {
  const { currentUserData, currentUser, updateUser } = useAuth()
  const [lockForm, setLockForm] = useState(true)
  const [formData, setFormData] = useState(null)

  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState(null)

  useEffect(() => {
    if (currentUserData.profileInfo) {
      setFormData(currentUserData.profileInfo)
      setLoading(false)
    }
  }, [currentUserData])

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setStatus("submitting")
    await updateUser(currentUser.uid, formData)
      .then((cb) => console.log("snackbar completed"))
      .catch((error) => {
        console.log(error.message)
        setError(`error : ${error.message} `)
      })
      .finally(() => {
        setStatus("idle")
      })
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  //handle if user refresh the page
  if (loading) {
    return <h2>🌀 Loading...</h2>
  }

  return (
    <div className="profile-container">
      <img className="pt-1 pl-1" src={formData.picture} alt="profile picture" />
      <form onSubmit={handleSubmit} className="form">
        <label className="input-label">
          Name
          <input
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Name"
            value={formData.name}
            id="name"
            disabled={lockForm}
          />
        </label>

        <label className="input-label">
          Surname
          <input
            name="surname"
            onChange={handleChange}
            type="text"
            placeholder="Surname"
            value={formData.surname}
            id="surname"
            disabled={lockForm}
          />
        </label>

        <label className="input-label">
          Email
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            value={currentUser?.email}
            id="email"
            disabled
          />
        </label>

        <label className="input-label">
          Profile creation date
          <input
            name="timeStamp"
            onChange={handleChange}
            type="string"
            placeholder="Date"
            value={formData?.timeStamp && convertTime(formData?.timeStamp)}
            id="timestamp"
            disabled
          />
        </label>

        <label className="input-label">
          Gsm
          <input
            name="gsm"
            onChange={handleChange}
            type="tel"
            placeholder="Gsm"
            value={formData.gsm}
            id="gsm"
            disabled={lockForm}
          />
        </label>

        <label className="input-label">
          Birthday
          <input
            name="birthday"
            onChange={handleChange}
            type="date"
            placeholder="Birthday"
            value={formData.birthday}
            id="birthday"
            disabled={lockForm}
          />
        </label>

        <label className="input-label">
          Total month
          <input
            name="totalMonth"
            onChange={handleChange}
            type="number"
            placeholder="Total month"
            value={formData.totalMonth}
            id="totalmonth"
            disabled
          />
        </label>

        <button
          type="button"
          onClick={() => setLockForm((prevFrom) => !prevFrom)}
        >
          {lockForm ? "unlock" : "lock"}
        </button>

        {error && (
          <div className="alert">
            <h3 className="login-error">{error}</h3>
          </div>
        )}
        <button className="ml-1" disabled={status === "submitting"}>
          {status === "submitting" ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  )
}

export default Profile
