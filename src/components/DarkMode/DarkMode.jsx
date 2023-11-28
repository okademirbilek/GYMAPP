import React from "react";
import sun from "./Sun.svg";
import moon from "./Moon.svg";
import "./DarkMode.css";
import { useTheme } from "../../context/ThemeContext";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setTheme(type === "checkbox" ? (checked ? "dark" : "light") : value);
  }

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        onChange={handleChange}
        type="checkbox"
        id="darkmode-toggle"
        checked={theme === "dark" ? true : false}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        {theme === "light" ? (
          <img className="sun" src={sun} alt="sun" />
        ) : (
          <img className="moon" src={moon} alt="moon" />
        )}
      </label>
    </div>
  );
};

export default DarkMode;
