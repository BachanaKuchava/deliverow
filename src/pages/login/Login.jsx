import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LanguageContext } from "../../LanguageContext";
import "./login.scss";

const STATIC_T = {
  KA: {
    logintitle: "ავტორიზაცია",
    email: "ელ.ფოსტა",
    phone: "ტელეფონი",
    loginpassword: "პაროლი",
    loginremember: "დამიმახსოვრე",
    loginforget: "დაგავიწყდა პაროლი ?",
    loginrequire: "გთხოვთ მიუთითოთ ელფოსტა ან ტელეფონი.",
    dont_have: "არ გაქვს ანგარიში?",
    signup: "დარეგისტრირდი",
    login: "შესვლა",
    signingin: "შესვლა",
    already_title: "ოპა! უკვე ხარ ავტორიზებული ამ ბრაუზერში",
    already_body: "ამ ბრაუზერში უკვე აქტიურია ანგარიში. გადადით Deliverowapp.ge-ზე ან შეცვალეთ ანგარიში.",
    continue_btn: "გადადი Deliverowapp.ge-ზე",
    switch_btn: "ანგარიშის შეცვლა",
    continue_as: "შესულია როგორც",
    // NEW
    contact_help: "დამატებითი ინფორმაციისთვის დაგვიკავშირდით",
  },
  EN: {
    logintitle: "Sign in",
    email: "Email",
    phone: "Phone",
    loginpassword: "Password",
    loginremember: "Remember me",
    loginforget: "Forgot password?",
    loginrequire: "Please enter email or phone.",
    dont_have: "Don't have an account?",
    signup: "Sign up",
    login: "Log in",
    signingin: "Signing in",
    already_title: "Oops! You’re already logged in on this browser",
    already_body: "An account is already active in this browser. Go to Deliverowapp.ge or switch accounts.",
    continue_btn: "Open Deliverowapp.ge",
    switch_btn: "Switch account",
    continue_as: "Currently logged in as",
    // NEW
    contact_help: "For more information, contact us",
  },
};

export default function Login() {
  const { lang } = useContext(LanguageContext);
  const L = (lang || "KA").toUpperCase() === "KA" ? "KA" : "EN";
  const [t, setT] = useState({});
  const tt = (k, fb) => (t[k] ?? STATIC_T[L][k] ?? fb ?? "");

  // form
  const [email, setEmail]       = useState("");
  const [dialCode, setDialCode] = useState("+995");
  const [phone, setPhone]       = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState({});
  const [visible, setVisible]   = useState(false);

  // guards
  const [submitting, setSubmitting] = useState(false);
  const [checkingSession, setCheckingSession] = useState(false);

  // popup/session
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionIdentity, setSessionIdentity]   = useState(null);
  const [sessionActive, setSessionActive]       = useState(false);

  // keep latest sessionActive in interceptors
  const sessionActiveRef = useRef(false);
  useEffect(() => { sessionActiveRef.current = sessionActive; }, [sessionActive]);

  // slide-in
  useEffect(() => {
    const tid = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(tid);
  }, []);

  // i18n
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

  // ---- HARD GATE: axios interceptor to CANCEL any /api/login while session exists ----
  useEffect(() => {
    const reqId = axios.interceptors.request.use((config) => {
      try {
        const url = (config?.url || "").toString();
        if (url.endsWith("/api/login") && sessionActiveRef.current) {
          return Promise.reject(new axios.Cancel("blocked: already logged in"));
        }
      } catch {}
      return config;
    });
    return () => axios.interceptors.request.eject(reqId);
  }, []);

  // central /check
  const hasUser = (d) => !!(d && (d.id != null || d.email || d.username || d.phone || d.fullname || d.name));
  const safeCheckSession = async () => {
    try {
      const res = await axios.get("http://deliverowapp.ge/api/check", {
        withCredentials: true,
        headers: { Accept: "application/json" },
        validateStatus: () => true,
      });
      const d = res?.data;
      if (res.status === 200 && hasUser(d)) {
        const who = d.email || d.phone || d.username || d.fullname || d.name || null;
        return { loggedIn: true, who };
      }
    } catch {}
    return { loggedIn: false, who: null };
  };

  // check on mount
  useEffect(() => {
    (async () => {
      setCheckingSession(true);
      const { loggedIn, who } = await safeCheckSession();
      setCheckingSession(false);
      if (loggedIn) {
        setSessionActive(true);
        setSessionIdentity(who);
        setShowSessionModal(true);
      }
    })();
  }, []);

  // prevent Enter submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleLoginClick = async () => {
    if (submitting || checkingSession) return;
    setErrors({});

    // pre-check
    setCheckingSession(true);
    const { loggedIn, who } = await safeCheckSession();
    setCheckingSession(false);
    if (loggedIn) {
      setSessionActive(true);
      setSessionIdentity(who);
      setShowSessionModal(true);
      return;
    }

    // validate
    const digitsOnly = phone.replace(/\D/g, "");
    const hasPhone = digitsOnly.length > 0;
    const hasEmail = !!email.trim();
    if (!hasEmail && !hasPhone) {
      setErrors({ form: tt("loginrequire") });
      return;
    }

    // login
    try {
      setSubmitting(true);
      const payload = { password };
      if (hasEmail) payload.email = email.trim();
      if (hasPhone) payload.phone = `${dialCode}${digitsOnly}`;

      const res = await axios.post("https://deliverowapp.ge/api/login", payload);
      const token    = res.data.token;
      const ssoToken = res.data.sso_token || token;
      localStorage.setItem("token", token);

      window.location.href = `https://deliverowapp.ge/admin/sso-login/${ssoToken}`;
    } catch (err) {
      if (axios.isCancel(err)) {
        setSubmitting(false);
        setSessionActive(true);
        setShowSessionModal(true);
        return;
      }
      const resp = err.response?.data;
      if (resp?.errors) setErrors(resp.errors);
      else if (resp?.message) setErrors({ form: resp.message });
      else console.error(err);
      setSubmitting(false);
    }
  };

  const handleContinue = () => { window.location.href = "https://deliverowapp.ge/"; };
  const handleSwitchAccount = async () => {
    try { await axios.post("https://deliverowapp.ge/api/logout", {}, { withCredentials: true }); } catch {}
    localStorage.removeItem("token");
    setSessionActive(false);
    setSessionIdentity(null);
    setShowSessionModal(false);
  };

  const isBlocked = submitting || checkingSession || showSessionModal || sessionActive;

  return (
    <div className={`login-container${visible ? " appear" : ""}`}>
      <form className="login-form" noValidate aria-disabled={isBlocked} onKeyDown={handleKeyDown}>
        <h2 className="login-form__title">{tt("logintitle", "ავტორიზაცია")}</h2>

        {errors.form && <p className="login-form__error">{errors.form}</p>}

        <div className="login-form__group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder=" "
            className="login-form__input"
            disabled={isBlocked}
          />
          <label htmlFor="email" className="login-form__label">{tt("email", "ელ.ფოსტა")}</label>
          {errors.email && <p className="login-form__error">{errors.email[0]}</p>}
        </div>

        {/* PHONE with country code */}
        <div className="login-form__group phone-group has-code">
          <select
            aria-label="Country code"
            className="phone-code-select"
            value={dialCode}
            onChange={(e) => setDialCode(e.target.value)}
            disabled={isBlocked}
          >
            <option value="+995">🇬🇪 +995</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+49">🇩🇪 +49</option>
            <option value="+33">🇫🇷 +33</option>
            <option value="+39">🇮🇹 +39</option>
            <option value="+90">🇹🇷 +90</option>
            <option value="+380">🇺🇦 +380</option>
            <option value="+374">🇦Մ +374</option>
            <option value="+971">🇦🇪 +971</option>
            <option value="+7">🇷🇺 +7</option>
          </select>

          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder=" "
            className="login-form__input phone-with-code"
            inputMode="tel"
            disabled={isBlocked}
          />
          <label htmlFor="phone" className="login-form__label">{tt("phone", "ტელეფონი")}</label>
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
            disabled={isBlocked}
          />
          <label htmlFor="password" className="login-form__label">{tt("loginpassword", "პაროლი")}</label>
          {errors.password && <p className="login-form__error">{errors.password[0]}</p>}
        </div>

        <div className="login-form__actions">
          <div className="login-form__remember">
            <input type="checkbox" id="remember" className="login-form__checkbox" disabled={isBlocked} />
            <label htmlFor="remember" className="login-form__remember-label">{tt("loginremember", "დამიმახსოვრე")}</label>
          </div>
          <a href="#" className="login-form__forgot">{tt("loginforget", "დაგავიწყდა პაროლი ?")}</a>
        </div>

        <div className="login-form__footer">
          {tt("dont_have", "არ გაქვს ანგარიში?")}{" "}
          <Link className="footer-link" to={`/${L}/register`}>{tt("signup", "დარეგისტრირდი")}</Link>
        </div>

        <button
          type="button"
          className={`login-form__btn ${submitting ? "is-loading" : ""}`}
          disabled={isBlocked}
          aria-busy={submitting || checkingSession}
          onClick={handleLoginClick}
        >
          <span className="btn-spinner" aria-hidden="true"></span>
          <span className="btn-label">
            {tt(submitting ? "signingin" : "login", submitting ? "Signing in" : "Log in")}
          </span>
        </button>

        {/* NEW helper line under the button */}
        <p className="login-form__help">{tt("contact_help")}</p>
      </form>

      {showSessionModal && (
        <div className="login-modal__overlay" role="dialog" aria-modal="true">
          <div className="login-modal__card">
            <h3 className="login-modal__title">{tt("already_title")}</h3>
            <p className="login-modal__text">
              {tt("already_body")}{" "}
              {sessionIdentity ? <strong>({tt("continue_as")} {sessionIdentity})</strong> : null}
            </p>
            <div className="login-modal__actions">
              <button type="button" className="login-modal__btn login-modal__btn--primary" onClick={() => (window.location.href = "https://deliverowapp.ge/")}>
                {tt("continue_btn")}
              </button>
              <button type="button" className="login-modal__btn login-modal__btn--ghost" onClick={handleSwitchAccount}>
                {tt("switch_btn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
