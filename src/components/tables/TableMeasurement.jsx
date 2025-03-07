import React from "react";
import { convertTime } from "../../utils/utils";

import {
  arm,
  biceps,
  chest,
  fat,
  hip,
  leg,
  shoulder,
  subs,
  triceps,
  waist,
  weight,
  pelvis,
} from "../../assets/images/body/imports";

import arrow from "../../assets/images/downarrow.png";

import useToggle from "../../customHooks/useToggle";

import { motion } from "framer-motion";

import { useTheme } from "../../context/ThemeContext";

import { useTranslation } from "react-i18next";

//framer motion animation variant
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

const TableMeasurement = ({ data }) => {
  const [value, toggleValue] = useToggle(false);
  const { theme } = useTheme();
  //language
  const { t, i18n } = useTranslation();
  return (
    <div className="measurement-table-container card-padding card-color">
      <div className="date-container display-f align-center">
        <h3>{data.timeStamp && convertTime(data.timeStamp, i18n.language)}</h3>{" "}
        <button onClick={() => toggleValue((prev) => !prev)}>
          <img src={arrow} alt="down arrow" className="arrow ml-1" />
        </button>
      </div>
      {value ? (
        <motion.div
          className={`flex-container display-f ${theme}`}
          variants={container}
          initial="hidden"
          animate={value && "visible"}
          exit={value === false && "exit"}
        >
          <div className="table-container card-border">
            <img src={arm} alt="arm" className="m-icon" />
            <div className="table-data">
              <div>{t("Arm")}</div>
              <div>{data.arm}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={biceps} alt="biceps" className="m-icon" />
            <div className="table-data">
              <div>{t("Biceps")}</div>
              <div>{data.biceps}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={chest} alt="chest" className="m-icon" />
            <div className="table-data">
              <div>{t("Chest")}</div>
              <div>{data.chest}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={fat} alt="fat" className="m-icon" />
            <div className="table-data">
              <div>{t("Fat")}</div>
              <div>{data.fat}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={hip} alt="hip" className="hip m-icon" />
            <div className="table-data">
              <div>{t("Hip")}</div>
              <div>{data.hip}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={leg} alt="leg" className="m-icon" />
            <div className="table-data">
              <div>{t("Leg")}</div>
              <div>{data.leg}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={pelvis} alt="pelvis" className="m-icon" />
            <div className="table-data">
              <div>{t("Illia crest")}</div>
              <div>{data.iliaccrest}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={shoulder} alt="shoulder" className="m-icon" />
            <div className="table-data">
              <div>{t("Shoulder")}</div>
              <div>{data.shoulder}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={subs} alt="subscapular" className="m-icon" />
            <div className="table-data">
              <div>{t("Subscapular")}</div>
              <div>{data.subscapular}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={triceps} alt="triceps" className="m-icon" />
            <div className="table-data">
              <div>{t("Triceps")}</div>
              <div>{data.triceps}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={waist} alt="waist" className="waist m-icon" />
            <div className="table-data">
              <div>{t("Waist")}</div>
              <div>{data.waist}</div>
            </div>
          </div>
          <div className="table-container card-border">
            <img src={weight} alt="weight" className="m-icon" />
            <div className="table-data">
              <div>{t("Weight")}</div>
              <div>{data.weight}</div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default TableMeasurement;
