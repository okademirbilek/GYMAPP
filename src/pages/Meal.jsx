import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { convertTime } from "../utils/utils"

import breakfast from "../assets/images/breakfast.png"
import lunch from "../assets/images/lunch.png"
import dinner from "../assets/images/dinner.png"
import snack from "../assets/images/apple.png"

const Meal = () => {
  const [mealData, setMealData] = useState(null)

  const [loading, setLoading] = useState(true)
  const { currentUserData } = useAuth()
  useEffect(() => {
    if (currentUserData) {
      setLoading(false)
      setMealData(currentUserData?.meals)
    }
  }, [currentUserData])

  function makeList(arr) {
    return arr?.split(",").map((item, index) => <li key={index}>{item}</li>)
  }

  //handle if user refresh the page
  if (loading) {
    return <h2>🌀 Loading...</h2>
  }
  return (
    <div>
      <div className="measurement-header">
        <h2 className="mb-3">Meal</h2>
        <div className="meal-table-container">
          <div className="date-container ">
            <h3>
              Date : {mealData?.timeStamp && convertTime(mealData?.timeStamp)}
            </h3>
          </div>
          <div className="wrapper">
            <div className="table-container">
              <span>
                <img src={breakfast} alt="breakfast" />
                <h2>BreakFast</h2>
              </span>
              <div className="table-data ">
                <ul>{makeList(mealData?.breakfast)}</ul>
              </div>
            </div>
            <div className="table-container">
              <span>
                <img src={lunch} alt="lunch" />
                <h2>Lunch</h2>
              </span>
              <div className="table-data">
                <ul>{makeList(mealData?.lunch)}</ul>
              </div>
            </div>
            <div className="table-container">
              <span>
                <img src={dinner} alt="dinner" />
                <h2>Dinner</h2>
              </span>

              <div className="table-data">
                <ul>{makeList(mealData?.dinner)}</ul>
              </div>
            </div>
            <div className="table-container">
              <span>
                <img src={snack} alt="snack" />
                <h2>Snack</h2>
              </span>

              <div className="table-data">
                <ul>{makeList(mealData?.snack)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Meal
