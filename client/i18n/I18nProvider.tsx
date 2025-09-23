import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DICTS, Lang, LANGS } from "./dict";

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  langs: { code: Lang; label: string }[];
}

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "en");
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  }, []);

  const t = useCallback(
    (key: string) => {
      const dict = DICTS[lang] || DICTS.en;
      return dict[key] ?? DICTS.en[key] ?? key;
    },
    [lang]
  );

  const value = useMemo<Ctx>(() => ({ lang, setLang, t, langs: LANGS }), [lang, setLang, t]);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && saved !== lang) setLang(saved as Lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
