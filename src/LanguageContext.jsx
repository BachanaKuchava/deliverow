import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const LanguageContext = createContext({
  lang: "KA",          // ← default to KA
  setLang: () => {}
});

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLangState] = useState("KA");   // ← initial state KA

  // Sync context.lang from the first path segment if it’s a valid code
  useEffect(() => {
    const seg = location.pathname.split("/")[1]?.toUpperCase();
    if (seg === "KA" || seg === "EN") {
      setLangState(seg);
    }
  }, [location.pathname]);

  // Switch language AND keep the current sub-path
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
