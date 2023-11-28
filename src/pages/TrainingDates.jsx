import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import FormMemberTracking from "../components/forms/FormMemberTracking";

import Loader from "../components/Loader";

const TrainingDates = () => {
  const [loading, setLoading] = useState(true);
  const { currentUserData } = useAuth();

  useEffect(() => {
    if (currentUserData.trainingDates) {
      setLoading(false);
    }
  }, [currentUserData]);

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
      <div className="payment-header  display-f align-center gp-1">
        <h2>Training Dates</h2>
        {/* <img src={payment} alt="payment card" /> */}
      </div>
      {currentUserData?.trainingDates?.map((data, index) => (
        <FormMemberTracking
          key={data.timeStamp}
          data={data}
          allData={currentUserData?.trainingDates}
          index={index}
          uid={currentUserData.uid}
        />
      ))}
    </div>
  );
};

export default TrainingDates;
