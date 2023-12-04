import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// eslint env: { browser: true, es2020: true, node: true },  (add node env  )
// package.json "type": "commonjs",   (require is not defined in ES module scope )
//material ui icons added
//firebase added
//react icons kit added maybe find another icons from mui
//cloud storage upload onsnapshot
//data type input accept file.type.startWith("image/")
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
