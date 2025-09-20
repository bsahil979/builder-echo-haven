import { Link } from "react-router-dom";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-slate-900 text-base font-semibold tracking-wide">HaritKranti</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-700">
          <a href="#weather" className="hover:text-emerald-700 transition-colors">Weather</a>
          <a href="#schemes" className="hover:text-emerald-700 transition-colors">Schemes</a>
          <Link to="/marketplace" className="hover:text-emerald-700 transition-colors">Marketplace</Link>
          <a href="#guidance" className="hover:text-emerald-700 transition-colors">Guidance</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden sm:inline-flex text-slate-700 hover:text-emerald-700 text-sm font-medium">Sign in</Link>
          <Link to="/marketplace" className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Get Started</Link>
        </div>
      </div>
    </header>
  );
}
