// src/pages/login/Login.jsx

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../../LanguageContext";
import "./login.scss";

export default function Login() {
  const { lang } = useContext(LanguageContext);

  // form state
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState({});
  const [visible, setVisible]   = useState(false);
  const [t, setT]               = useState({});

  // slide‑in animation
  useEffect(() => {
    const tid = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(tid);
  }, []);

  // load translations
  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://deliverowapp.ge/api/${lang.toLowerCase()}/translations`)
      .then((res) => {
        if (!mounted) return;
        const map = {};
        res.data.forEach(({ alias, value }) => (map[alias] = value));
        setT(map);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // enforce one of email or phone
    if (!email.trim() && !phone.trim()) {
      setErrors({ form: t.loginrequire || "Please enter email or phone." });
      return;
    }

    try {
      const payload = { password };
      if (email.trim()) payload.email = email.trim();
      if (phone.trim()) payload.phone = phone.trim();
      const res = await axios.post("https://deliverowapp.ge/api/login", payload);

      // store tokens
      const token = res.data.token;
      const ssoToken = res.data.sso_token || token;
      localStorage.setItem("token", token);
      // redirect to SSO login
      window.location.href = `https://deliverowapp.ge/admin/sso-login/${ssoToken}`;
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors) {
        setErrors(resp.errors);
      } else if (resp?.message) {
        setErrors({ form: resp.message });
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className={`login-container${visible ? " appear" : ""}`}>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">
          {t.logintitle || "შეიყვანეთ ანგარიში"}
        </h2>

        {errors.form && <p className="login-form__error">{errors.form}</p>}

        <div className="login-form__group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder=" "
            className="login-form__input"
          />
          <label htmlFor="email" className="login-form__label">
            {t.email || "ელ.ფოსტა"}
          </label>
          {errors.email && <p className="login-form__error">{errors.email[0]}</p>}
        </div>

        <div className="login-form__group">
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder=" "
            className="login-form__input"
          />
          <label htmlFor="phone" className="login-form__label">
            {t.phone || "ტელეფონი"}
          </label>
          {errors.phone && <p className="login-form__error">{errors.phone[0]}</p>}
        </div>

        <div className="login-form__group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder=" "
            className="login-form__input"
          />
          <label htmlFor="password" className="login-form__label">
            {t.loginpassword || "პაროლი"}
          </label>
          {errors.password && <p className="login-form__error">{errors.password[0]}</p>}
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