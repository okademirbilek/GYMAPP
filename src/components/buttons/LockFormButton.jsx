import React from "react";

import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const LockFormButton = ({ lockForm, setLockForm }) => {
  return (
    <button type="button" onClick={() => setLockForm((prevFrom) => !prevFrom)}>
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
  );
};

export default LockFormButton;
