import { Link } from "react-router-dom";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <nav className="flex flex-wrap justify-center gap-6 text-xs text-slate-600">
          <a href="#" className="hover:text-emerald-700">Home</a>
          <Link to="/marketplace" className="hover:text-emerald-700">Marketplace</Link>
          <Link to="/schemes" className="hover:text-emerald-700">Schemes</Link>
          <Link to="/weather" className="hover:text-emerald-700">Weather Forecast</Link>
          <Link to="/guidance" className="hover:text-emerald-700">Crop Guidance</Link>
          <Link to="/recommendations" className="hover:text-emerald-700">Recommendations</Link>
        </nav>
        <p className="mt-6 text-center text-[11px] text-slate-500">© {new Date().getFullYear()} HaritKranti. All rights reserved.</p>
      </div>
    </footer>
  );
}
