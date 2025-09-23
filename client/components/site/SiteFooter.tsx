import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/I18nProvider";

export default function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <nav className="flex flex-wrap justify-center gap-6 text-xs text-slate-600">
          <Link to="/" className="hover:text-emerald-700">{t("nav.home")}</Link>
          <Link to="/marketplace" className="hover:text-emerald-700">{t("nav.marketplace")}</Link>
          <Link to="/schemes" className="hover:text-emerald-700">{t("nav.schemes")}</Link>
          <Link to="/weather" className="hover:text-emerald-700">{t("nav.weather")}</Link>
          <Link to="/guidance" className="hover:text-emerald-700">{t("nav.guidance")}</Link>
          <Link to="/recommendations" className="hover:text-emerald-700">{t("nav.recommendations")}</Link>
        </nav>
        <p className="mt-6 text-center text-[11px] text-slate-500">© {new Date().getFullYear()} HaritKranti. All rights reserved.</p>
      </div>
    </footer>
  );
}
