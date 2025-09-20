export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} HaritKranti. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-emerald-700">Privacy</a>
          <a href="#" className="hover:text-emerald-700">Terms</a>
          <a href="#" className="hover:text-emerald-700">Contact</a>
        </div>
      </div>
    </footer>
  );
}
