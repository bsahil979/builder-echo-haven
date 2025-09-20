import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-[calc(100vh-64px-160px)] bg-white">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top actions */}
        <div className="flex items-center justify-end gap-3 mb-4">
          <Link to="/login" className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700">Login</Link>
          <button onClick={() => setMode("signup")} className="inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Sign Up</button>
        </div>

        <h1 className="text-2xl md:text-[28px] font-semibold text-slate-900">Connecting Farmers to Growth</h1>

        {/* Tabs */}
        <div className="mt-4 border-b border-slate-200">
          <nav className="flex gap-6 text-sm">
            <button
              className={`-mb-px border-b-2 px-1 pb-3 ${mode === "login" ? "border-emerald-600 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700"}`}
              onClick={() => setMode("login")}
              aria-current={mode === "login" ? "page" : undefined}
            >
              Login
            </button>
            <button
              className={`-mb-px border-b-2 px-1 pb-3 ${mode === "signup" ? "border-emerald-600 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700"}`}
              onClick={() => setMode("signup")}
            >
              Signup
            </button>
          </nav>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-5 max-w-xl">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email / Phone Number</label>
            <input
              type="text"
              placeholder="Enter your email or phone number"
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
              Remember Me
            </label>
            <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Forgot Password?</a>
          </div>

          <button type="submit" className="inline-flex items-center rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700">
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px w-full bg-slate-200" />
          <span className="text-xs text-slate-500">Or continue with</span>
          <div className="h-px w-full bg-slate-200" />
        </div>

        {/* Social */}
        <div className="flex flex-wrap gap-4">
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="-ml-1"><path d="M21.35 11.1H12v2.8h5.3c-.23 1.46-1.6 4.3-5.3 4.3a6 6 0 1 1 0-12c1.7 0 2.84.72 3.5 1.34l2.38-2.3C16.67 3.4 14.6 2.5 12 2.5 6.98 2.5 2.9 6.58 2.9 11.6s4.08 9.1 9.1 9.1c5.26 0 8.72-3.7 8.72-8.92 0-.6-.07-1.06-.17-1.68Z" fill="#4285F4"/></svg>
            Continue with Google
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden className="-ml-1"><path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.97c0-2.37 1.41-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.63l-.42 2.9h-2.21V22c4.78-.75 8.44-4.9 8.44-9.93Z"/></svg>
            Continue with Facebook
          </button>
        </div>

        <p className="mt-8 text-xs text-slate-500">By signing up, you agree to our <a className="underline hover:no-underline" href="#">Terms</a> & <a className="underline hover:no-underline" href="#">Privacy Policy</a>.</p>
      </div>
    </div>
  );
}
