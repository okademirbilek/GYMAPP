import React from "react";
import { convertTime } from "../../utils/utils";
import GppGoodIcon from "@mui/icons-material/GppGood";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const TablePayment = ({ data, index }) => {
  return (
    <div className="payment-table-container display-f   card-color">
      <div className="table-index">{index + 1}</div>
      <div className="date-container display-f align-center">
        <h4>{data.timeStamp && convertTime(data.timeStamp)}</h4>{" "}
        <CalendarMonthIcon />{" "}
      </div>

      <div className="table-container">
        <div className="table-data display-f ">
          Price :
          <div>
            {data.price}
            <CurrencyLiraIcon />
          </div>
        </div>
      </div>
      <div className="table-container">
        <div className="table-data">
          <div>Payment :</div>
          {data.isConfirmed ? (
            <div className="confirmed">
              <GppGoodIcon />
              Confirmed
            </div>
          ) : (
            <div className="not-confirmed">
              {" "}
              <HourglassTopIcon />
              Pending
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TablePayment;
