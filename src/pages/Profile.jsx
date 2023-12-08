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

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

//language
import { withTranslation } from "react-i18next";

const Profile = ({ t, i18n }) => {
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
  // useEffect(() => {
  //   //checking if the data type is image or not
  //   if (file) {
  //     file.type.startsWith("image/")
  //       ? uploadFile(
  //           `${currentUser?.uid}/profileimg`,
  //           file,
  //           setFormData,
  //           setPerc,
  //           setError
  //         )
  //       : setError("Unaccepted data type");
  //   }
  // }, [file]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("submitting");
    setLoading(true);
    if (file) {
      if (file.type.startsWith("image/")) {
        // const name = "profile" + currentUser?.uid;
        const storageRef = ref(storage, `${currentUser?.uid}/profileimg`);
        // const storageRef = ref(storage, `${currentUser?.uid}/profileimg`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPerc(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
            setError(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(downloadURL);
              // setFormData((prev) => ({ ...prev, picture: downloadURL }));
              // console.log(formData);
              updateUser(currentUser.uid, { ...formData, picture: downloadURL })
                .then(() => {
                  // console.log("zz", formData);
                  console.log("data gitti");
                  return callSnackBar();
                })
                .catch((error) => {
                  console.log(error.message);
                  setError(`error : ${error.message} `);
                })
                .finally(() => {
                  setStatus("idle");
                  setLoading(false);
                  setFile(null);
                });
            });
          }
        );
      } else {
        setError("Unaccepted data type");
      }
    } else {
      await updateUser(currentUser.uid, formData)
        .then(() => {
          console.log("data gitti2");
          return callSnackBar();
        })
        .catch((error) => {
          console.log(error.message);
          setError(`error : ${error.message} `);
        })
        .finally(() => {
          setStatus("idle");
          setLoading(false);
        });
    }
    // console.log(formData);
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
      <h2>{t("Profile")}</h2>
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
            {t("Upload image")} <DriveFolderUploadIcon />
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
          {t("Name")}
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
          {t("Surname")}
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
          {t("Email")}
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
          {t("Profile creation date")}
          <input
            name="timeStamp"
            onChange={handleChange}
            type="string"
            placeholder="Date"
            value={
              formData?.timeStamp &&
              convertTime(formData?.timeStamp, i18n.language)
            }
            id="timestamp"
            disabled
          />
        </label>

        <label className="input-label">
          {t("Gsm")}
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
          {t("Birthday")}
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
          {t("Total month")}
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

export default withTranslation()(Profile);
