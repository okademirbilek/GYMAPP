import React, { useState, useEffect } from "react"
import { useAdminAuth } from "../../context/AdminContext"
import { convertTime } from "../../utils/utils"

import {
  arm,
  biceps,
  chest,
  fat,
  hip,
  leg,
  shoulder,
  subs,
  triceps,
  waist,
  weight,
  pelvis,
} from "../../assets/images/body/imports.js"

import arrow from "../../assets/images/downarrow.png"

import useToggle from "../../customHooks/useToggle"

import { motion } from "framer-motion"

import LockIcon from "@mui/icons-material/Lock"
import LockOpenIcon from "@mui/icons-material/LockOpen"

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
}

const FormMeasurement = ({ data, measurementData, uid }) => {
  const [lockForm, setLockForm] = useState(true)
  const [formData, setFormData] = useState(null)

  //toggle
  const [value, toggleValue] = useToggle(false)

  //error
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

  async function handleSubmit(e) {
    e.preventDefault()
    let updatedData = []
    setError("")
    setStatus("submitting")
    measurementData.map((item) => {
      if (item.id === data.id) {
        updatedData.push({ ...formData, timeStamp: new Date() })
      } else {
        updatedData.push(item)
      }
    })

    await updateMeasurement(uid, updatedData)
      .then(() => console.log("success"))
      .catch((error) => {
        setError(error)
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
    <>
      <div className="form-measurement">
        <span className="date display-f align-center gp-1">
          <h3>{convertTime(formData?.timeStamp)}</h3>
          <button onClick={() => toggleValue((prev) => !prev)}>
            <img src={arrow} alt="down arrow" className="arrow " />
          </button>
        </span>

        {value && (
          <motion.form
            className="flex-container "
            variants={container}
            initial="hidden"
            animate={value && "visible"}
            exit={value === false && "exit"}
            onSubmit={handleSubmit}
          >
            <label>
              <img src={arm} alt="arm" />
              Arm
              <input
                name="arm"
                onChange={handleChange}
                type="number"
                placeholder="Arm"
                value={formData.arm}
                id="arm"
                disabled={lockForm}
              />
            </label>

            <label>
              <img src={biceps} alt="biceps" />
              Biceps
              <input
                name="biceps"
                onChange={handleChange}
                type="number"
                placeholder="biceps"
                value={formData.biceps}
                id="biceps"
                disabled={lockForm}
              />
            </label>
            <label>
              <img src={chest} alt="chest" />
              Chest
              <input
                name="chest"
                onChange={handleChange}
                type="number"
                placeholder="chest"
                value={formData.chest}
                id="chest"
                disabled={lockForm}
              />
            </label>
            <label>
              <img src={fat} alt="fat" />
              Fat
              <input
                name="fat"
                onChange={handleChange}
                type="number"
                placeholder="fat"
                value={formData.fat}
                id="fat"
                disabled={lockForm}
              />
            </label>
            <label>
              <img src={hip} alt="hip" className="hip" />
              Hip
              <input
                name="hip"
                onChange={handleChange}
                type="number"
                placeholder="hip"
                value={formData.hip}
                id="hip"
                disabled={lockForm}
              />
            </label>
            <label>
              <img src={leg} alt="leg" />
              Leg
              <input
                name="leg"
                onChange={handleChange}
                type="number"
                placeholder="leg"
                value={formData.leg}
                id="leg"
                disabled={lockForm}
              />
            </label>
            <label>
              <img src={pelvis} className="pelvis" alt="pelvis" />
              Iliaccrest
              <input
                name="iliaccrest"
                onChange={handleChange}
                type="number"
                placeholder="iliaccrest"
                value={formData.iliaccrest}
                id="iliaccrest"
                disabled={lockForm}
              />
            </label>

            <label>
              <img src={shoulder} alt="shoulder" />
              Shoulder
              <input
                name="shoulder"
                onChange={handleChange}
                type="number"
                placeholder="shoulder"
                value={formData.shoulder}
                id="shoulder"
                disabled={lockForm}
              />
            </label>

            <label>
              <img src={subs} alt="subscapular" />
              Subscapular
              <input
                name="subscapular"
                onChange={handleChange}
                type="number"
                placeholder="subscapular"
                value={formData.subscapular}
                id="subscapular"
                disabled={lockForm}
              />
            </label>
            <label>
              <img src={triceps} alt="triceps" />
              Triceps
              <input
                name="triceps"
                onChange={handleChange}
                type="number"
                placeholder="triceps"
                value={formData.triceps}
                id="triceps"
                disabled={lockForm}
              />
            </label>
            <label>
              <img src={waist} alt="waist" className="waist" />
              Waist
              <input
                name="waist"
                onChange={handleChange}
                type="number"
                placeholder="waist"
                value={formData.waist}
                id="waist"
                disabled={lockForm}
              />
            </label>
            <label>
              <img src={weight} alt="weight" />
              Weight
              <input
                name="weight"
                onChange={handleChange}
                type="number"
                placeholder="weight"
                value={formData.weight}
                id="weight"
                disabled={lockForm}
              />
            </label>

            <button
              type="button"
              onClick={() => setLockForm((prevFrom) => !prevFrom)}
              className="bg-primary"
            >
              {lockForm ? (
                <>
                  <p className="display-f align-center justify-center ">
                    <LockIcon />
                  </p>
                </>
              ) : (
                <>
                  <p className="display-f align-center justify-center ">
                    <LockOpenIcon />
                  </p>
                </>
              )}
            </button>

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
          </motion.form>
        )}
      </div>
    </>
  )
}

export default FormMeasurement
