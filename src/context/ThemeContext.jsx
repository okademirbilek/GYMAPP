import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => JSON.parse(localStorage.getItem("theme")) || "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext, useTheme };
