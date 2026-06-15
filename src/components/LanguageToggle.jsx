import { Languages } from "lucide-react";
import { useLang } from "@/i18n/language-context";
import { useT } from "@/i18n/translations";

/**
 * Language switch button. Shows the code of the language it will switch TO:
 * "AR" while the site is in English, "EN" while it's in Arabic.
 */
export const LanguageToggle = ({ className = "" }) => {
  const { lang, toggle } = useLang();
  const t = useT();
  const target = lang === "en" ? "AR" : "EN";

  return (
    <button
      onClick={toggle}
      aria-label={t.toggle.switchTo}
      title={t.toggle.switchTo}
      className={`inline-flex items-center gap-2 rounded-full glass px-3.5 py-2 text-foreground hover:text-primary hover:bg-primary/10 transition-all ${className}`}
    >
      <Languages className="w-4 h-4" />
      <span className="font-mono text-sm font-bold tracking-widest">
        {target}
      </span>
    </button>
  );
};
