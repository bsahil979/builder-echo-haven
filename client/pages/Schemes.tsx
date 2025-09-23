import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Scheme = {
  id: string;
  title: string;
  level: "central" | "state";
  state?: string;
  department: string;
  summary: string;
  benefits: string[];
  eligibility: string;
  lastUpdated: string; // ISO
  source: string;
};

const SCHEMES: Scheme[] = [
  {
    id: "pm-kisan",
    title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    level: "central",
    department: "Ministry of Agriculture & Farmers Welfare",
    summary:
      "Income support of ₹6,000/year to all landholding farmer families, paid in three equal installments.",
    benefits: ["₹2,000 every 4 months", "Direct Benefit Transfer"],
    eligibility: "All landholding farmer families, subject to exclusions notified by Government.",
    lastUpdated: "2025-01-10",
    source: "https://pmkisan.gov.in/",
  },
  {
    id: "pmfby",
    title: "PMFBY – Pradhan Mantri Fasal Bima Yojana",
    level: "central",
    department: "Crop Insurance",
    summary:
      "Crop insurance with affordable premium and full coverage against natural calamities, pests & diseases.",
    benefits: ["Low farmer premium", "Wide risk coverage", "Technology-driven assessment"],
    eligibility: "All farmers growing notified crops in notified areas, including sharecroppers/tenants.",
    lastUpdated: "2025-02-14",
    source: "https://pmfby.gov.in/",
  },
  {
    id: "maha-shetkari",
    title: "Maharashtra – Namo Shetkari Mahasanman Nidhi",
    level: "state",
    state: "Maharashtra",
    department: "State Agriculture",
    summary: "Additional income support of ₹6,000/year to PM-KISAN beneficiaries in Maharashtra.",
    benefits: ["₹6,000/year (state)", "Direct Benefit Transfer"],
    eligibility: "PM-KISAN registered farmers of Maharashtra.",
    lastUpdated: "2025-01-28",
    source: "https://sjsa.maharashtra.gov.in/",
  },
  {
    id: "up-kisan-udaan",
    title: "Uttar Pradesh – Kisan Udaan Subsidy",
    level: "state",
    state: "Uttar Pradesh",
    department: "UP Agriculture",
    summary: "Subsidy on seeds and modern agri-equipment for small and marginal farmers.",
    benefits: ["40–60% subsidy on equipment", "Seed subsidy for notified crops"],
    eligibility: "Small/marginal farmers with valid Kisan registration in UP.",
    lastUpdated: "2025-02-01",
    source: "https://upagripardarshi.gov.in/",
  },
  {
    id: "soil-health",
    title: "Soil Health Card Scheme",
    level: "central",
    department: "Department of Agriculture & Farmers Welfare",
    summary: "Periodic soil testing and crop-wise nutrient recommendations for better yields.",
    benefits: ["Free soil testing", "Fertilizer recommendations"],
    eligibility: "All farmers via state/krishi vigyan kendras.",
    lastUpdated: "2024-12-20",
    source: "https://soilhealth.dac.gov.in/",
  },
];

const STATES = [
  "All",
  "Maharashtra",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Gujarat",
  "Rajasthan",
  "Tamil Nadu",
  "Karnataka",
  "Bihar",
  "West Bengal",
];

export default function Schemes() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"central" | "state" | "all">("all");
  const [state, setState] = useState("All");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return SCHEMES.filter((s) => {
      const matchesTab = tab === "all" ? true : s.level === tab;
      const matchesState =
        tab === "state" || state !== "All" ? (state === "All" ? true : s.state === state) : true;
      const matchesQ = term
        ? (s.title + s.summary + s.department + (s.state ?? "")).toLowerCase().includes(term)
        : true;
      return matchesTab && matchesState && matchesQ;
    }).sort((a, b) => (a.lastUpdated < b.lastUpdated ? 1 : -1));
  }, [q, tab, state]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Latest Farmer Schemes</h1>
            <p className="text-xs text-slate-600 mt-1">Central and State programs with benefits, eligibility and official links.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTab("all")} className={`rounded-md border px-3 py-2 text-xs font-semibold ${tab === "all" ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-200"}`}>All</button>
            <button onClick={() => setTab("central")} className={`rounded-md border px-3 py-2 text-xs font-semibold ${tab === "central" ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-200"}`}>Central</button>
            <button onClick={() => setTab("state")} className={`rounded-md border px-3 py-2 text-xs font-semibold ${tab === "state" ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-200"}`}>State</button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search scheme, department, state" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-10 py-3 text-sm placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
          </div>
          <select value={state} onChange={(e)=>setState(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
            {STATES.map((s)=> <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <article key={s.id} className="rounded-xl bg-white shadow ring-1 ring-black/5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug">{s.title}</h3>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-medium ${s.level === "central" ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700"}`}>
                    {s.level === "central" ? "Central" : s.state ?? "State"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{s.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.benefits.map((b, i) => (
                    <span key={i} className="inline-flex items-center rounded-full bg-slate-50 text-slate-700 border border-slate-200 px-2 py-1 text-[10px]">{b}</span>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div><span className="text-slate-500">Dept:</span> {s.department}</div>
                  <div><span className="text-slate-500">Updated:</span> {new Date(s.lastUpdated).toLocaleDateString()}</div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <a href={s.source} target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline decoration-emerald-300 underline-offset-2">Official Site</a>
                  <Link to="/guidance" className="text-xs text-slate-500 hover:text-slate-700">Related guides →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
