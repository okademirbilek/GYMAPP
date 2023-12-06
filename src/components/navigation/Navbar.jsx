import React from "react";
import { Link } from "react-router-dom";

//authentication
import { useAuth } from "../../context/AuthContext";

//theme
import { useTheme } from "../../context/ThemeContext";

//menu
import { Example } from "../menu/Example";
import DarkMode from "../DarkMode/DarkMode";

//language
import { useTranslation } from "react-i18next";

//icons
import LanguageIcon from "@mui/icons-material/Language";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

//language
import { withTranslation } from "react-i18next";

const navbar = ({ t }) => {
  const { currentUser, currentUserData } = useAuth();
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  const handleClick = async (lang) => {
    await i18n.changeLanguage(lang);
  };

  return (
    <>
      <div className={`navbar ${theme} background`}>
        <div className="wrapper display-f justify-flex-end align-center ">
          <div className="items display-f gp-2">
            {currentUser && (
              <div className="item">
                <DarkMode />
              </div>
            )}

            <div
              className="item"
              onClick={() => handleClick(i18n.language === "tr" ? "en" : "tr")}
            >
              <LanguageIcon />
              {i18n.language}
            </div>
            {!currentUser && (
              <Link to={"/login"} className="item">
                <ExitToAppOutlinedIcon />
                {t("Sign In")}
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

export default withTranslation()(navbar);
