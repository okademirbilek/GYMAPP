import React from "react";

//images
import dmrblkprofile from "../assets/images/dmrblkprofile.png";

//icons
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import NotificationsIcon from "@mui/icons-material/Notifications";

//language
import { withTranslation } from "react-i18next";

const home = ({ t }) => {
  return (
    <div className="home">
      <div className="trainer-data card-padding card-color ">
        <h2>{t("Meet your trainer")}</h2>
        <img src={dmrblkprofile} alt="profile photo" />
        <h3>{t("Personal Trainer")}</h3>
        <h2>Ömercan Demirbilek</h2>
        <span className="social ">
          <a href="https://www.instagram.com/demirblake/" target="_blank">
            <InstagramIcon />
          </a>
          <a href="https://www.instagram.com/demirblake/" target="_blank">
            <YouTubeIcon />
          </a>
          <a href="https://www.instagram.com/demirblake/" target="_blank">
            <TwitterIcon />
          </a>
        </span>
      </div>
      {/* <div className="members card-padding display-f fd-c">
        <h2>Stronger! and healthier!</h2>
        <SlickSlider />
      </div> */}
      <div className="alerts card-padding card-color">
        <NotificationsIcon /> <p>{t("There is no announcement")}</p>
      </div>
    </div>
  );
};

export default withTranslation()(home);
