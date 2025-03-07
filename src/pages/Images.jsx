import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TableImages from "../components/tables/TableImages";

import Loader from "../components/Loader";

//language
import { withTranslation } from "react-i18next";

const Images = ({ t }) => {
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
    <div>
      <div className="images-header  display-f align-center gp-1">
        <h2>{t("Images")}</h2>
      </div>
      {currentUserData?.images
        ?.sort((a, b) => b.timeStamp.seconds - a.timeStamp.seconds)
        .map((data, index) => (
          <TableImages key={data.timeStamp} data={data} index={index} />
        ))}
    </div>
  );
};

export default withTranslation()(Images);
