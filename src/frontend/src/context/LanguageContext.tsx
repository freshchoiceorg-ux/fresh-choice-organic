import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "te";

interface LanguageContextValue {
  lang: Lang | null;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: null,
  setLang: () => {},
});

const STORAGE_KEY = "fco-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "te") return stored;
    return null;
  });

  const setLang = (newLang: Lang) => {
    localStorage.setItem(STORAGE_KEY, newLang);
    setLangState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  return useContext(LanguageContext);
}
