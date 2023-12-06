import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { convertTime } from "../../utils/utils";
import { useOutletContext } from "react-router-dom";

import Loader from "../../components/Loader";
import LockFormButton from "../../components/buttons/LockFormButton";

import useLoadPage from "../../customHooks/useLoadPage";
import useToggle from "../../customHooks/useToggle";

const AdminProfile = () => {
  const { updateUser } = useAuth();
  const { data, params } = useOutletContext();
  //state for locking form
  const [lockForm, setLockForm] = useToggle(true);
  const [formData, setFormData] = useState(null);

  //page loading states
  const { loading, status, error, setLoading, setStatus, setError } =
    useLoadPage();

  useEffect(() => {
    if (data[0]?.profileInfo) {
      setFormData(data[0].profileInfo);
      setLoading(false);
    }
  }, [data]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("submitting");
    await updateUser(params.id, formData)
      .then((cb) => console.log("snackbar completed"))
      .catch((error) => {
        console.log(error.message);
        setError(`error : ${error.message} `);
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
    return (
      <span className="loader">
        <Loader />
      </span>
    );
  }

  return (
    <div className="profile-container card-padding card-color">
      <img src={formData.picture} alt="profile picture" />
      {error && (
        <div className="alert">
          <h3 className="login-error">{error}</h3>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <label className="input-label">
          Name
          <input
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Name"
            value={formData.name}
            id="name"
            disabled={lockForm}
          />
        </label>

        <label className="input-label">
          Surname
          <input
            name="surname"
            onChange={handleChange}
            type="text"
            placeholder="Surname"
            value={formData.surname}
            id="surname"
            disabled={lockForm}
          />
        </label>

        {/* <label className="input-label">
          Email
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            value={currentUser?.email}
            id="email"
            disabled
          />
        </label> */}

        <label className="input-label">
          Profile creation date
          <input
            name="timeStamp"
            onChange={handleChange}
            type="string"
            placeholder="Date"
            value={convertTime(formData.timeStamp)}
            id="timestamp"
            disabled
          />
        </label>

        <label className="input-label">
          Gsm
          <input
            name="gsm"
            onChange={handleChange}
            type="tel"
            placeholder="Gsm"
            value={formData.gsm}
            id="gsm"
            disabled={lockForm}
          />
        </label>

        <label className="input-label">
          Birthday
          <input
            name="birthday"
            onChange={handleChange}
            type="date"
            placeholder="Birthday"
            value={formData.birthday}
            id="birthday"
            disabled={lockForm}
          />
        </label>

        <label className="input-label">
          Total month
          <input
            name="totalMonth"
            onChange={handleChange}
            type="number"
            placeholder="Total month"
            value={formData.totalMonth}
            id="totalmonth"
            disabled
          />
        </label>

        <span className="button-container">
          <LockFormButton lockForm={lockForm} setLockForm={setLockForm} />
          <button disabled={status === "submitting"}>
            {status === "submitting" ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </div>
  );
};

export default AdminProfile;
