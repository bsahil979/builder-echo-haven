export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <nav className="flex flex-wrap justify-center gap-6 text-xs text-slate-600">
          <a href="#" className="hover:text-emerald-700">Home</a>
          <a href="#marketplace" className="hover:text-emerald-700">Marketplace</a>
          <a href="#weather" className="hover:text-emerald-700">Weather Forecast</a>
          <a href="#guidance" className="hover:text-emerald-700">Crop Guidance</a>
          <a href="#" className="hover:text-emerald-700">Login/Signup</a>
        </nav>
        <p className="mt-6 text-center text-[11px] text-slate-500">© {new Date().getFullYear()} HaritKranti. All rights reserved.</p>
      </div>
    </footer>
  );
}
