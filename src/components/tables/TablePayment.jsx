import React from "react";
import { convertTime } from "../../utils/utils";
import GppGoodIcon from "@mui/icons-material/GppGood";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTheme } from "../../context/ThemeContext";

//language
import { useTranslation } from "react-i18next";

const TablePayment = ({ data, index }) => {
  const { t, i18n } = useTranslation();
  //darkmode - lightmode context
  const { theme } = useTheme();
  return (
    <div className="payment-table-container display-f card-color">
      <div className="table-index">{index + 1}</div>
      <div className="date-container display-f align-center card-border">
        <h4>{data.timeStamp && convertTime(data.timeStamp, i18n.language)}</h4>{" "}
        <CalendarMonthIcon />{" "}
      </div>

      <div className="table-container card-border ">
        <div className="table-data display-f ">
          {t("Price")} :
          <div>
            {data.price}
            <CurrencyLiraIcon />
          </div>
        </div>
      </div>
      <div className="table-container card-border">
        <div className="table-data">
          <div>{t("Payment")} :</div>
          {data.isConfirmed ? (
            <div className="confirmed">
              <GppGoodIcon />
              {t("Confirmed")}
            </div>
          ) : (
            <div className="not-confirmed">
              {" "}
              <HourglassTopIcon />
              {t("Pending")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TablePayment;
