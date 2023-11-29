import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TableMeasurement from "../components/tables/TableMeasurement";
import { waist2 } from "../assets/images/body/imports";
import Loader from "../components/Loader";

const Measurements = () => {
  const [loading, setLoading] = useState(true);
  const { currentUserData } = useAuth();

  useEffect(() => {
    if (currentUserData) {
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
    <>
      <div className="measurement-header  display-f align-center">
        <h2>Measurements</h2>
        {/* <img src={waist2} alt="hip" /> */}
      </div>
      {currentUserData?.measurements?.map((data) => (
        <TableMeasurement key={data.timeStamp} data={data} />
      ))}
    </>
  );
};

export default Measurements;
