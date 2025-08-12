import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LanguageContext } from "../../LanguageContext";
import "./stylesReg.scss";

const STATIC_T = {
  KA: {
    registertitle: "რეგისტრაცია",
    name: "სახელი",
    lastname: "გვარი",
    username_opt: "მომხმარებლის სახელი (არასავალდებულო)",
    email: "ელ.ფოსტა",
    phone: "ტელეფონი",
    loginpassword: "პაროლი",
    password_confirm: "გაიმეორე პაროლი",
    requiredfields: "შეავსეთ სავალდებულო ველები.",
    password_mismatch: "პაროლები არ ემთხვევა.",
    already_have: "უკვე გაქვს ანგარიში?",
    login_here: "შედი აქ",
    register: "რეგისტრაცია",
    loading: "იგზავნება...",
    // field-specific errors
    name_required: "სახელის ველი სავალდებულოა.",
    lastname_required: "გვარის ველი სავალდებულოა.",
    email_required: "ელ.ფოსტა სავალდებულოა.",
    email_invalid: "ელ.ფოსტა არასწორია.",
    phone_required: "ტელეფონი სავალდებულოა.",
    password_required: "პაროლი სავალდებულოა.",
    password2_required: "დაადასტურე პაროლი.",
    // helper (under button)
    contact_help: "დამატებითი ინფორმაციისთვის დაგვიკავშირდით",
  },
  EN: {
    registertitle: "Sign up",
    name: "First name",
    lastname: "Last name",
    username_opt: "Username (optional)",
    email: "Email",
    phone: "Phone",
    loginpassword: "Password",
    password_confirm: "Confirm password",
    requiredfields: "Please fill the required fields.",
    password_mismatch: "Passwords do not match.",
    already_have: "Already have an account?",
    login_here: "Log in",
    register: "Register",
    loading: "Sending...",
    // field-specific errors
    name_required: "First name is required.",
    lastname_required: "Last name is required.",
    email_required: "Email is required.",
    email_invalid: "Email is not valid.",
    phone_required: "Phone is required.",
    password_required: "Password is required.",
    password2_required: "Please confirm your password.",
    // helper (under button)
    contact_help: "For more information, contact us",
  },
};

export default function Registration() {
  const { lang } = useContext(LanguageContext);
  const L = (lang || "KA").toUpperCase() === "KA" ? "KA" : "EN";
  const tt = (k, fb) => (t[k] ?? STATIC_T[L][k] ?? fb ?? "");

  const [t, setT] = useState({});
  const [visible, setVisible] = useState(false);

  // form
  const [name, setName]           = useState("");
  const [lastname, setLastname]   = useState("");
  const [username, setUsername]   = useState("");
  const [email, setEmail]         = useState("");
  const [dialCode, setDialCode]   = useState("+995");
  const [phone, setPhone]         = useState("");
  const [password, setPassword]   = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors]       = useState({});
  const [submitting, setSubmitting] = useState(false);

  // slide-in
  useEffect(() => {
    const id = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(id);
  }, []);

  // translations
  useEffect(() => {
    let mounted = true;
    axios
      .get(`https://deliverowapp.ge/api/${L.toLowerCase()}/translations`)
      .then((res) => {
        if (!mounted) return;
        const map = {};
        res.data.forEach(({ alias, value }) => (map[alias] = value));
        setT(map);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, [L]);

  const isValidEmail = (val) => /^\S+@\S+\.\S+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneDigits = phone.replace(/\D/g, "");
    const newErrors = {};

    if (!name.trim()) newErrors.name = [tt("name_required")];
    if (!lastname.trim()) newErrors.lastname = [tt("lastname_required")];
    if (!email.trim()) newErrors.email = [tt("email_required")];
    else if (!isValidEmail(email.trim())) newErrors.email = [tt("email_invalid")];
    if (phoneDigits.length === 0) newErrors.phone = [tt("phone_required")];
    if (!password) newErrors.password = [tt("password_required")];
    if (!password2) newErrors.password_confirmation = [tt("password2_required")];
    if (password && password2 && password !== password2) {
      newErrors.password_confirmation = [tt("password_mismatch")];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const payload = {
      name: name.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      phone: `${dialCode}${phoneDigits}`,
      password,
      password_confirmation: password2,
    };
    if (username.trim()) payload.username = username.trim();

    try {
      setSubmitting(true);
      await axios.post("https://deliverowapp.ge/api/register", payload);
      const base = `/${L}`;
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
        <h2 className="reg-form__title">{tt("registertitle", "რეგისტრაცია")}</h2>

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
              {tt("name", "სახელი")} <span className="req">*</span>
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
              {tt("lastname", "გვარი")} <span className="req">*</span>
            </label>
            {errors.lastname && <p className="reg-form__error">{errors.lastname[0]}</p>}
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
            {tt("username_opt", "მომხმარებლის სახელი (არასავალდებულო)")}
          </label>
          {errors.username && <p className="reg-form__error">{errors.username[0]}</p>}
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
            {tt("email", "ელ.ფოსტა")} <span className="req">*</span>
          </label>
          {errors.email && <p className="reg-form__error">{errors.email[0]}</p>}
        </div>

        {/* PHONE with country code */}
        <div className="reg-form__group phone-group has-code">
          <select
            aria-label="Country code"
            className="phone-code-select"
            value={dialCode}
            onChange={(e) => setDialCode(e.target.value)}
          >
            <option value="+995">🇬🇪 +995</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+49">🇩🇪 +49</option>
            <option value="+33">🇫🇷 +33</option>
            <option value="+39">🇮🇹 +39</option>
            <option value="+90">🇹🇷 +90</option>
            <option value="+380">🇺🇦 +380</option>
            <option value="+374">🇦🇲 +374</option>
            <option value="+971">🇦🇪 +971</option>
            <option value="+7">🇷🇺 +7</option>
          </select>

          <input
            id="phone"
            className="reg-form__input phone-with-code"
            placeholder=" "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            inputMode="tel"
          />
          <label htmlFor="phone" className="reg-form__label">
            {tt("phone", "ტელეფონი")} <span className="req">*</span>
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
              {tt("loginpassword", "პაროლი")} <span className="req">*</span>
            </label>
            {errors.password && <p className="reg-form__error">{errors.password[0]}</p>}
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
              {tt("password_confirm", "გაიმეორე პაროლი")} <span className="req">*</span>
            </label>
            {errors.password_confirmation && (
              <p className="reg-form__error">{errors.password_confirmation[0]}</p>
            )}
          </div>
        </div>

        <div className="reg-form__footer">
          {tt("already_have", "უკვე გაქვს ანგარიში?")}{" "}
          <Link className="footer-link" to={`/${L}/login`}>
            {tt("login_here", "შედი აქ")}
          </Link>
        </div>

        {/* BUTTON with spinner (same pattern as Login) */}
        <button
          type="submit"
          className={`reg-form__btn ${submitting ? "is-loading" : ""}`}
          disabled={submitting}
          aria-busy={submitting}
        >
          <span className="btn-spinner" aria-hidden="true"></span>
          <span className="btn-label">
            {submitting ? tt("loading", "Sending...") : tt("register", "Register")}
          </span>
        </button>

        {/* helper line under button */}
        <p className="reg-form__help">{tt("contact_help")}</p>
      </form>
    </div>
  );
}
