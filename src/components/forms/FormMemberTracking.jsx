import React, { useState, useEffect } from "react";
import { convertTime } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import useLoadPage from "../../customHooks/useLoadPage";

import Loader from "../../components/Loader";

const FormMemberTracking = ({ allData, data, uid, index }) => {
  const [formData, setFormData] = useState(null);
  const { updateTrainingDate } = useAuth();

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
      .then(() => console.log("success"))
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
    <div className="member-tracking-table card-padding card-color">
      <div className="table-index">{index + 1}</div>
      <span className="date display-f align-center gp-1">
        <h4>Date: {convertTime(data?.timeStamp)}</h4>
      </span>
      <div className="table-container">
        <div className="table-data display-f ">
          Trainer approved
          {formData.isConfirmedTrainer && (
            <div className="display-f align-center ">
              <VerifiedUserIcon />
              Yes
            </div>
          )}
        </div>
      </div>
      {data.isConfirmedMember ? (
        <div className="table-container">
          <div className="table-data display-f ">
            Member approved
            <div>
              <div className="display-f align-center">
                <HowToRegIcon />
                Yes
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Confirm Payment Trainer
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
    </div>
  );
};

export default FormMemberTracking;
