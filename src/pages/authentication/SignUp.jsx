import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Icon from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

//language
import { withTranslation } from "react-i18next";

function SignUp({ t }) {
  const [inputType, setInputType] = useState("password");
  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  //signup function from useAuth context (email, password)

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const { signup, addDefaultData } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (signUpFormData.password !== signUpFormData.passwordConfirm) {
      return setError("Passwords do not match");
    }

    setStatus("submitting");

    await signup(signUpFormData.email, signUpFormData.password)
      .then((user) => {
        navigate("/", { replace: true });
        //dummy data for new user
        addDefaultData(user.user.uid);
      })
      .catch((error) => {
        setError("Failed to create an account");
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setSignUpFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <div className="glass-container">
        <h1>{t("Sign Up")}</h1>
        <form onSubmit={handleSubmit} className="form">
          <label className="input-label" htmlFor="sign-up-email">
            {t("Email")}
          </label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email address"
            value={signUpFormData.email}
            id="sign-up-email"
            required
          />
          <label className="input-label" htmlFor="sign-up-password">
            {t("Password")}
          </label>
          <div className="input-with-icon">
            <input
              id="sign-up-password"
              name="password"
              onChange={handleChange}
              type={inputType}
              placeholder={t("Password")}
              value={signUpFormData.password}
              minLength={6}
              maxLength={40}
              required
              className="custom-input"
            />
            {inputType === "password" ? (
              <Icon
                icon={eyeOff}
                onClick={() => setInputType("text")}
                className="icon-comp"
                size={25}
                style={{ display: "flex" }}
              />
            ) : (
              <Icon
                icon={eye}
                onClick={() => setInputType("password")}
                className="icon-comp"
                size={25}
                style={{ display: "flex" }}
              />
            )}
          </div>
          <label className="input-label" htmlFor="sign-up-confirm">
            {t("Confirm password")}
          </label>
          <input
            id="sign-up-confirm"
            name="passwordConfirm"
            onChange={handleChange}
            type={inputType}
            placeholder={t("Confirm password")}
            value={signUpFormData.passwordConfirm}
            maxLength={40}
            required
          />
          {error && (
            <div className="alert">
              <h3 className="login-error">{error}</h3>
            </div>
          )}
          <button disabled={status === "submitting"}>
            {status === "submitting" ? t("Signing up...") : t("Sign Up")}
          </button>
        </form>
        <div className="link-div">
          {t("Already have an account?")}{" "}
          <Link className="form-link" to="/login">
            {" "}
            {t("Sign In")}{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withTranslation()(SignUp);
