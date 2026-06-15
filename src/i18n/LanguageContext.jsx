import { useEffect, useState } from "react";
import { LanguageContext } from "@/i18n/language-context";

const STORAGE_KEY = "portfolio-lang";

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "ar" || saved === "en" ? saved : "en";
  });

  // Keep <html lang/dir> and storage in sync so RTL + fonts apply globally.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};
