import React, { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminContext";
import { useOutletContext } from "react-router-dom";

import FormAdminMemberTracking from "../../components/forms/FormAdminMemberTracking";

import Loader from "../../components/Loader";

const AdminMemberTracking = () => {
  const [memberTrackingData, setMemberTrackingData] = useState(null);
  const { data, params } = useOutletContext();
  const { addNewTrainingDate } = useAdminAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const dataArr = data[0]?.trainingDates?.map((item, index) => (
        <FormAdminMemberTracking
          key={index}
          data={item}
          uid={params.id}
          trackingData={data[0].trainingDates}
        />
      ));
      setMemberTrackingData(dataArr);
      setLoading(false);
    }
  }, [data]);

  //handle if user refresh the page
  if (loading) {
    return (
      <span className="loader">
        <Loader />
      </span>
    );
  }

  return (
    <div className="member-tracking ">
      <h2>Member Tracking</h2>
      {memberTrackingData}
      <button
        onClick={() => addNewTrainingDate(params.id)}
        className="add-training-dates-btn p-1 br-sm"
      >
        +Add new Training Date
      </button>
    </div>
  );
};

export default AdminMemberTracking;
