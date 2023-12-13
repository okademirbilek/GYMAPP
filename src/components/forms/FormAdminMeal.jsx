import React, { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminContext";
import { convertTime } from "../../utils/utils";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const FormAdminMeal = ({ mealData, uid }) => {
  // console.log(mealData)
  const [lockForm, setLockForm] = useState(true);
  const [formData, setFormData] = useState(null);

  //error
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const { updateMeal } = useAdminAuth();

  useEffect(() => {
    if (mealData) {
      setFormData(mealData);
      setLoading(false);
    }
  }, [mealData]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("submitting");
    await updateMeal(uid, { ...formData, timeStamp: new Date() })
      .then(() => console.log("success"))
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  //handle if user refresh the page
  if (loading) {
    return <h2>🌀 Loading...</h2>;
  }
  return (
    <div className="form-meal">
      <span className="date display-f align-center gp-1">
        <h3>{convertTime(formData?.timeStamp)}</h3>
      </span>
      <form onSubmit={handleSubmit}>
        <label>
          Breakfast
          <textarea
            name="breakfast"
            onChange={handleChange}
            value={formData.breakfast}
            disabled={lockForm}
          />
        </label>
        <label>
          Lunch
          <textarea
            name="launch"
            onChange={handleChange}
            value={formData.launch}
            disabled={lockForm}
          />
        </label>
        <label>
          Dinner
          <textarea
            name="dinner"
            onChange={handleChange}
            value={formData.dinner}
            disabled={lockForm}
          />
        </label>
        <label>
          Snack
          <textarea
            name="snack"
            onChange={handleChange}
            value={formData.snack}
            disabled={lockForm}
          />
        </label>

        <button
          type="button"
          onClick={() => setLockForm((prevFrom) => !prevFrom)}
          className="bg-primary"
        >
          {lockForm ? (
            <>
              <p className="display-f align-center justify-center ">
                <LockIcon />
              </p>
            </>
          ) : (
            <>
              <p className="display-f align-center justify-center ">
                <LockOpenIcon />
              </p>
            </>
          )}
        </button>

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

export default FormAdminMeal;
