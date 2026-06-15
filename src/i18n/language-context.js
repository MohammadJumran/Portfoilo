import { createContext, useContext } from "react";

// Context + hook live here (no component export) so the provider file can be
// fast-refresh friendly.
export const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
});

export const useLang = () => useContext(LanguageContext);
