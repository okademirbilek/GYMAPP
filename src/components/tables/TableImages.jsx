import React from "react";
import { convertTime } from "../../utils/utils";
import arrow from "../../assets/images/downarrow.png";

import useToggle from "../../customHooks/useToggle";

const TableImages = ({ data }) => {
  const [value, toggleValue] = useToggle(false);

  return (
    <div className="images-table-container">
      <div className="date-container display-f align-center">
        <h2>{data.timeStamp && convertTime(data.timeStamp)}</h2>{" "}
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
