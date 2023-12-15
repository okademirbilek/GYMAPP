import React from "react";
import { convertTime } from "../../utils/utils";
import arrow from "../../assets/images/downarrow.png";

import useToggle from "../../customHooks/useToggle";

import { useTranslation } from "react-i18next";

const TableImages = ({ data }) => {
  const [value, toggleValue] = useToggle(false);
  //language
  const { t, i18n } = useTranslation();

  return (
    <div className="images-table-container card-padding card-color">
      <div className="date-container display-f align-center">
        <h3>{data.timeStamp && convertTime(data.timeStamp, i18n.language)}</h3>{" "}
        <button onClick={() => toggleValue((prev) => !prev)}>
          <img src={arrow} alt="down arrow" className="arrow ml-1" />
        </button>
      </div>
      {value && (
        <div className="flex-images">
          <img src={data.img1} alt="profile image1" />
          <img src={data.img2} alt="profile image2" />
          <img src={data.img3} alt="profile image3" />
        </div>
      )}
    </div>
  );
};

export default TableImages;
