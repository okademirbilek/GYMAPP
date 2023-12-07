import React, { useState, useEffect } from "react";
import { convertTime } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

import useLoadPage from "../../customHooks/useLoadPage";

//framer motion
import { motion } from "framer-motion";

import Loader from "../../components/Loader";
//language
import { useTranslation } from "react-i18next";

//snackbar
import { callSnackBar } from "../../utils/utils";
//toggle
import useToggle from "../../customHooks/useToggle";

//framer motion animation variant
const container = {
  hidden: { opacity: 1, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
  },
  exit: {
    opacity: 0,
    scaleY: 0,
  },
};

// const wrapperDiv = {

// };

const FormMemberTracking = ({ allData, data, uid, index }) => {
  const [formData, setFormData] = useState(null);
  const { updateTrainingDate } = useAuth();
  //language
  const { t, i18n } = useTranslation();
  //toggle for opening div
  const [value, toggleValue] = useToggle(false);

  //page loading states
  const { loading, status, error, setLoading, setStatus, setError } =
    useLoadPage();

  useEffect(() => {
    if (data) {
      setFormData(data);
      setLoading(false);
    }
  }, [data]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("submitting");
    let updatedData = [];
    allData.map((item) => {
      if (item.id === data.id) {
        updatedData.push(formData);
      } else {
        updatedData.push(item);
      }
    });

    await updateTrainingDate(uid, updatedData)
      .then(() => callSnackBar())
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  //handle if user refresh the page
  if (loading) {
    return (
      <span className="loader">
        <Loader />
      </span>
    );
  }

  return (
    <motion.div className="member-tracking-table card-padding card-color">
      <div className="table-index">{index + 1}</div>
      <span
        className="date display-f align-center gp-1 cursor-p"
        onClick={() => toggleValue((prev) => !prev)}
      >
        <h4>
          {t("Date")} : {convertTime(data?.timeStamp, i18n.language)}{" "}
        </h4>
        {value ? <ArrowCircleUpIcon /> : <ExpandCircleDownIcon />}
      </span>

      {value && (
        <motion.div
          className="table-wrap"
          variants={container}
          initial="hidden"
          animate={value && "visible"}
          exit={value === false && "exit"}
        >
          <div className="table-container">
            <div className="table-data display-f ">
              {t("Trainer approved")}
              {formData.isConfirmedTrainer && (
                <div className="display-f align-center ">
                  <VerifiedUserIcon />
                  {t("Yes")}
                </div>
              )}
            </div>
          </div>
          {data.isConfirmedMember ? (
            <div className="table-container">
              <div className="table-data display-f ">
                {t("Member approved")}
                <div>
                  <div className="display-f align-center">
                    <HowToRegIcon />
                    {t("Yes")}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                {t("Confirm Payment Member")}
                <input
                  name="isConfirmedMember"
                  onChange={handleChange}
                  type="checkbox"
                  placeholder="Member"
                  checked={formData.isConfirmedMember}
                  id="isConfirmed"
                />
              </label>
              {error && (
                <div className="alert">
                  <h3 className="login-error">{error}</h3>
                </div>
              )}
              <button
                type="sumbit"
                className="bg-primary"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Saving..." : "Save"}
              </button>
            </form>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FormMemberTracking;
