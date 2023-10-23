import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// eslint env: { browser: true, es2020: true, node: true },  (add node env  )
// package.json "type": "commonjs",   (require is not defined in ES module scope )
//material ui icons added
