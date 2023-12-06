import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { convertTime } from "../utils/utils";

import Loader from "../components/Loader";

import breakfast from "../assets/images/breakfast.png";
import lunch from "../assets/images/lunch.png";
import dinner from "../assets/images/dinner.png";
import snack from "../assets/images/apple.png";

//language
import { withTranslation } from "react-i18next";

const Meal = ({ t }) => {
  const [mealData, setMealData] = useState(null);

  const [loading, setLoading] = useState(true);
  const { currentUserData } = useAuth();
  useEffect(() => {
    if (currentUserData) {
      setLoading(false);
      setMealData(currentUserData?.meals);
    }
  }, [currentUserData]);

  //list comes with comma seperated
  function makeList(arr) {
    return arr?.split(",").map((item, index) => <li key={index}>{item}</li>);
  }

  //handle if user refresh the page
  if (loading) {
    return (
      <span className="loader">
        <Loader />
      </span>
    );
  }
  return (
    <div>
      <div className="measurement-header">
        <h2>Meal</h2>
        <div className="meal-table-container card-color ">
          <div className="date-container ">
            <h3>{mealData?.timeStamp && convertTime(mealData?.timeStamp)}</h3>
          </div>
          <div className="wrapper">
            <div className="table-container">
              <span>
                <img src={breakfast} alt="breakfast" />
                <h2>{t("Breakfast")}</h2>
              </span>
              <div className="table-data ">
                <ul>{makeList(mealData?.breakfast)}</ul>
              </div>
            </div>
            <div className="table-container">
              <span>
                <img src={lunch} alt="lunch" />
                <h2>{t("Lunch")}</h2>
              </span>
              <div className="table-data">
                <ul>{makeList(mealData?.lunch)}</ul>
              </div>
            </div>
            <div className="table-container">
              <span>
                <img src={dinner} alt="dinner" />
                <h2>{t("Dinner")}</h2>
              </span>

              <div className="table-data">
                <ul>{makeList(mealData?.dinner)}</ul>
              </div>
            </div>
            <div className="table-container">
              <span>
                <img src={snack} alt="snack" />
                <h2>{t("Snack")}</h2>
              </span>

              <div className="table-data">
                <ul>{makeList(mealData?.snack)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Meal);
