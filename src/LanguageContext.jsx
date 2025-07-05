import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LanguageContext = createContext({
  lang: "EN",
  setLang: () => {}
});

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLangState] = useState("EN");

  // On mount & whenever the URL changes, sync context.lang from the first path segment
  useEffect(() => {
    const seg = location.pathname.split("/")[1]?.toUpperCase();
    if (seg === "KA" || seg === "EN") {
      setLangState(seg);
    }
  }, [location.pathname]);

  // wrap setLang so it rewrites the URL to the same sub-path under the new prefix
  const setLang = (newLang) => {
    if (newLang === lang) return;
    const parts = location.pathname.split("/").slice(2);
    const remainder = parts.length ? "/" + parts.join("/") : "";
    const newPath = `/${newLang.toLowerCase()}${remainder}${location.search}${location.hash}`;
    setLangState(newLang);
    navigate(newPath, { replace: true });
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
