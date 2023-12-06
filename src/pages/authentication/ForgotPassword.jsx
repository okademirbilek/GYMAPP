import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

//language
import { withTranslation } from "react-i18next";

function ForgotPassword({ t }) {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { resetPassword } = useAuth();

  // const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setStatus("submitting");
    await resetPassword(loginFormData.email)
      .then((user) => {
        setMessage("Check your inbox for further instructions");
      })
      .catch((error) => {
        setError("Failed to reset password : Email not found");
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <div className="glass-container">
        <h1>{t("Reset password")}</h1>
        <form onSubmit={handleSubmit} className="form">
          <label className="input-label" htmlFor="reset-email">
            {t("Email")}
          </label>
          <input
            id="reset-email"
            name="email"
            onChange={handleChange}
            type="email"
            placeholder={t("Email")}
            value={loginFormData.email}
            required
          />
          {error && (
            <div className="alert">
              <h3 className="login-error">{error}</h3>
            </div>
          )}
          <button disabled={status === "submitting"}>
            {status === "submitting" ? t("waiting...") : t("Reset password")}
          </button>
          {message && <h3>{message}</h3>}
        </form>
        <div className="link-div">
          <Link className="form-link" to="/login">
            {t("Sign In")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withTranslation()(ForgotPassword);
