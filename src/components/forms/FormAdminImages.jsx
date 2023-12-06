import React, { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminContext";
import { convertTime } from "../../utils/utils";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useToggle from "../../customHooks/useToggle";
import arrow from "../../assets/images/downarrow.png";

import useLoadPage from "../../customHooks/useLoadPage";

import Loader from "../../components/Loader";

const FormAdminImages = ({ data, imagesData, uid }) => {
  const [formData, setFormData] = useState(null);
  const { updateImages } = useAdminAuth();

  //state for image
  const [file, setFile] = useState([]);

  //percentage for image upload
  const [per, setPerc] = useState(null);

  //page loading states
  const { loading, status, error, setLoading, setStatus, setError } =
    useLoadPage();

  //toggle
  const [value, toggleValue] = useToggle(false);

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
    imagesData.map((item) => {
      if (item.id === data.id) {
        updatedData.push({ ...formData, timeStamp: new Date() });
      } else {
        updatedData.push(item);
      }
    });

    await updateImages(uid, updatedData)
      .then(() => console.log("success"))
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const selectedImages = e.target.files;
    setFile([...file, ...selectedImages]);
  }

  //track of uploading image to storage
  function uploadFile() {
    const date = new Date().getTime();
    file.forEach((image, index) => {
      const storageRef = ref(storage, `${uid}/${date}/img${index + 1}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
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
            // console.log(downloadURL);
            setFormData((prev) => ({
              ...prev,
              [`img${index + 1}`]: downloadURL,
            }));
          });
        }
      );
    });
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
    <div className="form-images card-color">
      <span className="date display-f align-center gp-1">
        <h3>{convertTime(formData?.timeStamp)}</h3>
        <button onClick={() => toggleValue((prev) => !prev)}>
          <img src={arrow} alt="down arrow" className="arrow" />
        </button>
      </span>
      {error && (
        <div className="alert">
          <h3 className="login-error">{error}</h3>
        </div>
      )}

      {value ? (
        <>
          <div className="flex-images">
            <img
              src={
                file.length > 0
                  ? file
                    ? URL.createObjectURL(file[0])
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  : formData?.img1
              }
              alt="profile"
            />
            <img
              src={
                file.length > 0
                  ? file
                    ? URL.createObjectURL(file[1])
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  : formData?.img2
              }
              alt="profile"
            />
            <img
              src={
                file.length > 0
                  ? file
                    ? URL.createObjectURL(file[2])
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  : formData?.img3
              }
              alt="profile"
            />
          </div>

          <form onSubmit={handleSubmit} className="form">
            <label className="input-label">
              <span className="display-f gp-1 mb-1">
                Upload Image <DriveFolderUploadIcon />
              </span>
              <input
                onChange={handleChange}
                type="file"
                name="file"
                multiple
                // className="display-n"
                accept="image/*"
              />
            </label>
            <button
              type="button"
              onClick={() => uploadFile()}
              disabled={status === "submitting" || (per !== null && per < 100)}
            >
              Upload to database
            </button>
            <button
              disabled={status === "submitting" || (per !== null && per < 100)}
            >
              {status === "submitting" ? "Saving..." : "Save"}
            </button>
          </form>
        </>
      ) : null}
    </div>
  );
};

export default FormAdminImages;
