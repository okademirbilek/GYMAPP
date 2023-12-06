import React, { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminContext";
import { convertTime } from "../../utils/utils";

import useLoadPage from "../../customHooks/useLoadPage";

import Loader from "../../components/Loader";

const FormAdminMemberTracking = ({ data, trackingData, uid }) => {
  const [formData, setFormData] = useState(null);
  const { updateTrainingDate } = useAdminAuth();

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
    trackingData.map((item) => {
      if (item.id === data.id) {
        updatedData.push({ ...formData, timeStamp: new Date() });
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
    <div className="form-member-tracking card-color">
      <span className="date display-f align-center gp-1">
        <h3>{convertTime(formData?.timeStamp)}</h3>
      </span>
      <form onSubmit={handleSubmit}>
        <label>
          Confirm Training Trainer
          <input
            name="isConfirmedTrainer"
            onChange={handleChange}
            type="checkbox"
            placeholder="Trainer"
            checked={formData.isConfirmedTrainer}
            id="isConfirmed"
          />
        </label>
        <label>
          Confirm Training Trainer
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
    </div>
  );
};

export default FormAdminMemberTracking;
