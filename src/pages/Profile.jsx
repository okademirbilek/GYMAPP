import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { convertTime } from "../utils/utils";

import Loader from "../components/Loader";

import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

import { callSnackBar } from "../utils/utils";

import { useTheme } from "../context/ThemeContext";

import LockFormButton from "../components/buttons/LockFormButton";

import useLoadPage from "../customHooks/useLoadPage";

import useToggle from "../customHooks/useToggle";

const Profile = () => {
  const { currentUserData, currentUser, updateUser, uploadFile } = useAuth();
  const [formData, setFormData] = useState(null);
  //state for locking form
  const [lockForm, setLockForm] = useToggle(true);
  //state for image input
  const [file, setFile] = useState(null);
  //percentage for image upload
  const [per, setPerc] = useState(null);
  //darkmode - lightmode context
  const { theme } = useTheme();
  //page loading states
  const { loading, status, error, setLoading, setStatus, setError } =
    useLoadPage();

  useEffect(() => {
    if (currentUserData?.profileInfo) {
      setFormData(currentUserData.profileInfo);
      setLoading(false);
    }
  }, [currentUserData]);

  //track of uploading image to storage
  useEffect(() => {
    //checking if the data type is image or not
    if (file) {
      file.type.startsWith("image/")
        ? uploadFile(
            `${currentUser?.uid}/profileimg`,
            file,
            setFormData,
            setPerc,
            setError
          )
        : setError("Unaccepted data type");
    }
  }, [file]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("submitting");
    setLoading(true);
    await updateUser(currentUser.uid, formData)
      .then(() => callSnackBar())
      .catch((error) => {
        console.log(error.message);
        setError(`error : ${error.message} `);
      })
      .finally(() => {
        setStatus("idle");
        setLoading(false);
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
      <h2>Profile</h2>
      <img
        src={
          file !== null
            ? file
              ? URL.createObjectURL(file)
              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            : formData.picture
        }
        alt="user profile image"
      />
      {error && (
        <div className="alert">
          <h3 className="login-error">{error}</h3>
        </div>
      )}
      <form onSubmit={handleSubmit} className={`form ${theme}`}>
        <label className="input-label">
          <span className="display-f gp-1 mb-1">
            Upload image <DriveFolderUploadIcon />
          </span>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name="file"
            className="display-n"
            accept="image/*"
          />
        </label>

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

        <label className="input-label">
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
        </label>

        <label className="input-label">
          Profile creation date
          <input
            name="timeStamp"
            onChange={handleChange}
            type="string"
            placeholder="Date"
            value={formData?.timeStamp && convertTime(formData?.timeStamp)}
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
        <div className="button-container">
          <LockFormButton lockForm={lockForm} setLockForm={setLockForm} />
          <button
            disabled={status === "submitting" || (per !== null && per < 100)}
          >
            {status === "submitting" ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
