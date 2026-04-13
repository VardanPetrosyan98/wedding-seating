import { useMemo, useState } from "react";
import { translations } from "../../../shared/config/i18n";

export const useI18n = () => {
  const [language, setLanguage] = useState("hy");

  const t = useMemo(() => translations[language] || translations.hy, [language]);

  const handleLanguageChange = (nextLanguage) => {
    setLanguage(nextLanguage);
  };

  return { language, t, handleLanguageChange };
};
