import React, { useState, useEffect } from "react"
import FormMeasurement from "../../components/forms/FormMeasurement"
import { useAdminAuth } from "../../context/AdminContext"
import { useOutletContext } from "react-router-dom"

const AdminMeasurement = () => {
  const [measurementData, setMeasurementData] = useState(null)

  const { addNewMeasurement } = useAdminAuth()
  const { data, params } = useOutletContext()

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
  }, [data])
  return (
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
  )
}

export default AdminMeasurement
