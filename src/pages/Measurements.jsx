import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TableMeasurement from "../components/tables/TableMeasurement";
import Loader from "../components/Loader";

//language
import { withTranslation } from "react-i18next";

const Measurements = ({ t }) => {
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
        <h2>{t("Measurements")}</h2>
      </div>
      {currentUserData?.measurements?.map((data) => (
        <TableMeasurement key={data.timeStamp} data={data} />
      ))}
    </>
  );
};

export default withTranslation()(Measurements);
