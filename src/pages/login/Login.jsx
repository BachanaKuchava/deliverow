// src/pages/login/Login.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../../LanguageContext";
import "./login.scss";

export default function Login() {
  const { lang } = useContext(LanguageContext);
  const [visible, setVisible] = useState(false);
  const [t, setT] = useState({});

  // slide-in animation trigger
  useEffect(() => {
    const tid = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(tid);
  }, []);

  // fetch translations on lang change
  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/translations`)
      .then((res) => {
        if (!mounted) return;
        const map = {};
        res.data.forEach(({ alias, value }) => {
          map[alias] = value;
        });
        setT(map);
      })
      .catch((err) => console.error("Login translations failed:", err));
    return () => {
      mounted = false;
    };
  }, [lang]);

  return (
    <div className={`login-container${visible ? " appear" : ""}`}>
      <form className="login-form">
        <h2 className="login-form__title">
          {t.logintitle || "შეიყვანეთ ანგარიში"}
        </h2>

        <div className="login-form__group">
          <input
            type="email"
            id="email"
            required
            placeholder=" "
            className="login-form__input"
          />
          <label htmlFor="email" className="login-form__label">
            {t.email || "ელ.ფოსტა"}
          </label>
        </div>

        <div className="login-form__group">
          <input
            type="password"
            id="password"
            required
            placeholder=" "
            className="login-form__input"
          />
          <label htmlFor="password" className="login-form__label">
            {t.loginpassword || "პაროლი"}
          </label>
        </div>

        <div className="login-form__actions">
          <div className="login-form__remember">
            <input
              type="checkbox"
              id="remember"
              className="login-form__checkbox"
            />
            <label
              htmlFor="remember"
              className="login-form__remember-label"
            >
              {t.loginremember || "დამიმახსოვრე"}
            </label>
          </div>
          <a href="#" className="login-form__forgot">
            {t.loginforget || "დაგავიწყდა პაროლი ?"}
          </a>
        </div>

        <button type="submit" className="login-form__btn">
          {t.login || "შესვლა"}
        </button>
      </form>
    </div>
  );
}
