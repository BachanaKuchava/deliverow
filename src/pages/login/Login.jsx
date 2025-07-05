import React, { useState, useEffect } from "react";
import "./login.scss";

export default function Login() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`login-container${visible ? " appear" : ""}`}>
      <form className="login-form">
        <h2 className="login-form__title">შეიყვანეთ ანგარიში</h2>

        <div className="login-form__group">
          <input
            type="email"
            id="email"
            required
            placeholder=" "
            className="login-form__input"
          />
          <label htmlFor="email" className="login-form__label">
            ელ.ფოსტა
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
            პაროლი
          </label>
        </div>

        <div className="login-form__actions">
          <div className="login-form__remember">
            <input
              type="checkbox"
              id="remember"
              className="login-form__checkbox"
            />
            <label htmlFor="remember" className="login-form__remember-label">
              დამიმახსოვრე
            </label>
          </div>
          <a href="#" className="login-form__forgot">
            დაგავიწყდა პაროლი ?
          </a>
        </div>

        <button type="submit" className="login-form__btn">
          შესვლა
        </button>
      </form>
    </div>
  );
}
