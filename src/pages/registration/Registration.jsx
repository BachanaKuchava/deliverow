import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../../LanguageContext";
import "./stylesReg.scss";
import { Link } from "react-router-dom";

export default function Registration() {
  const { lang } = useContext(LanguageContext);

  const [t, setT] = useState({});
  const [visible, setVisible] = useState(false);

  // form
  const [name, setName]                 = useState("");
  const [lastname, setLastname]         = useState("");
  const [username, setUsername]         = useState("");
  const [email, setEmail]               = useState("");
  const [phone, setPhone]               = useState("");
  const [password, setPassword]         = useState("");
  const [password2, setPassword2]       = useState("");
  const [errors, setErrors]             = useState({});
  const [submitting, setSubmitting]     = useState(false);

  // slide-in
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(id);
  }, []);

  // translations
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

    // minimal client-side checks
    if (!name.trim() || !lastname.trim() || !phone.trim() || !password) {
      setErrors({ form: t.requiredfields || "შეავსეთ სავალდებულო ველები." });
      return;
    }
    if (password !== password2) {
      setErrors({ password: [t.password_mismatch || "პაროლები არ ემთხვევა."] });
      return;
    }

    const payload = {
      name: name.trim(),
      lastname: lastname.trim(),
      phone: phone.trim(),
      password,
      password_confirmation: password2,
    };
    if (username.trim()) payload.username = username.trim();
    if (email.trim()) payload.email = email.trim();

    try {
      setSubmitting(true);
      await axios.post("https://deliverowapp.ge/api/register", payload);
      // success → go to login
      const base = `/${lang}`;
      window.location.href = `${base}/login`;
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors) setErrors(resp.errors);
      else if (resp?.message) setErrors({ form: resp.message });
      else console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`registration-container${visible ? " appear" : ""}`}>
      <form className="reg-form" onSubmit={handleSubmit} noValidate>
        <h2 className="reg-form__title">
          {t.registertitle || "რეგისტრაცია"}
        </h2>

        {errors.form && <p className="reg-form__error">{errors.form}</p>}

        <div className="reg-form__row">
          <div className="reg-form__group">
            <input
              id="name"
              className="reg-form__input"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name" className="reg-form__label">
              {t.name || "სახელი *"}
            </label>
            {errors.name && <p className="reg-form__error">{errors.name[0]}</p>}
          </div>

          <div className="reg-form__group">
            <input
              id="lastname"
              className="reg-form__input"
              placeholder=" "
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <label htmlFor="lastname" className="reg-form__label">
              {t.lastname || "გვარი *"}
            </label>
            {errors.lastname && (
              <p className="reg-form__error">{errors.lastname[0]}</p>
            )}
          </div>
        </div>

        <div className="reg-form__group">
          <input
            id="username"
            className="reg-form__input"
            placeholder=" "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username" className="reg-form__label">
            {t.username || "მომხმარებლის სახელი (არასავალდებულო)"}
          </label>
          {errors.username && (
            <p className="reg-form__error">{errors.username[0]}</p>
          )}
        </div>

        <div className="reg-form__group">
          <input
            type="email"
            id="email"
            className="reg-form__input"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email" className="reg-form__label">
            {t.email || "ელ.ფოსტა (არასავალდებულო)"}
          </label>
          {errors.email && <p className="reg-form__error">{errors.email[0]}</p>}
        </div>

        <div className="reg-form__group">
          <input
            id="phone"
            className="reg-form__input"
            placeholder=" "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="phone" className="reg-form__label">
            {t.phone || "ტელეფონი *"}
          </label>
          {errors.phone && <p className="reg-form__error">{errors.phone[0]}</p>}
        </div>

        <div className="reg-form__row">
          <div className="reg-form__group">
            <input
              type="password"
              id="password"
              className="reg-form__input"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" className="reg-form__label">
              {t.loginpassword || "პაროლი *"}
            </label>
            {errors.password && (
              <p className="reg-form__error">{errors.password[0]}</p>
            )}
          </div>

          <div className="reg-form__group">
            <input
              type="password"
              id="password2"
              className="reg-form__input"
              placeholder=" "
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <label htmlFor="password2" className="reg-form__label">
              {t.password_confirm || "გაიმეორე პაროლი *"}
            </label>
            {errors.password_confirmation && (
              <p className="reg-form__error">
                {errors.password_confirmation[0]}
              </p>
            )}
          </div>
        </div>

      <div className="reg-form__footer">
  {lang === "KA" ? (
    <>
      უკვე გაქვს ანგარიში?{" "}
      <Link className="footer-link" to={`/${lang}/login`}>
        შედი აქ
      </Link>
    </>
  ) : (
    <>
      Already have an account?{" "}
      <Link className="footer-link" to={`/${lang}/login`}>
        Log in
      </Link>
    </>
  )}
</div>


        <button type="submit" className="reg-form__btn" disabled={submitting}>
          {submitting ? (t.loading || "იგზავნება...") : (t.register || "რეგისტრაცია")}
        </button>
      </form>
    </div>
  );
}
