import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import { useAuth } from "../context/AuthContext";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { Link } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

////menu
import { Example } from "./menu/Example";
import DarkMode from "./DarkMode/DarkMode";

const navbar = () => {
  const { currentUser, currentUserData } = useAuth();
  const { theme } = useTheme();
  return (
    <>
      <div className={`navbar ${theme} backgroundX`}>
        <div className="wrapper display-f justify-flex-end align-center">
          <div className="items display-f gp-2">
            <div className="item">
              <DarkMode />
            </div>
            <div className="item">
              <LanguageIcon />
              En
            </div>
            {!currentUser && (
              <Link to={"/login"} className="item">
                <ExitToAppOutlinedIcon />
                Sign In
              </Link>
            )}
            <Example />
            <div className="item">
              <Link to={"/profile"} className="item cursor-p">
                <img
                  src={
                    currentUserData?.profileInfo?.picture ||
                    "https://www.w3schools.com/howto/img_avatar.png"
                  }
                  alt="Avatar"
                  className="avatar"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default navbar;
