import { useMemo, useState } from "react";

interface Guide {
  id: string;
  title: string;
  desc: string;
  image: string;
  cropType: "wheat" | "rice" | "fruit" | "vegetable" | "general";
  season: "kharif" | "rabi" | "all";
  category: "sustainable" | "pest" | "soil" | "water" | "harvest" | "organic";
  featured?: boolean;
}

const GUIDES: Guide[] = [
  {
    id: "wheat-best",
    title: "Best Wheat Cultivation Practices",
    desc: "Improve yield with seed selection, sowing time, and nutrient management.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    cropType: "wheat",
    season: "rabi",
    category: "sustainable",
    featured: true,
  },
  {
    id: "pest-natural",
    title: "Natural Pest Control Methods",
    desc: "Use traps, bio‑pesticides and crop rotation to reduce chemical usage.",
    image: "https://images.unsplash.com/photo-1524592714635-d77511a4834d?q=80&w=1200&auto=format&fit=crop",
    cropType: "general",
    season: "all",
    category: "pest",
    featured: true,
  },
  {
    id: "organic-practices",
    title: "Organic Farming Practices",
    desc: "Build healthy soil with composting and cover crops for better resilience.",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1200&auto=format&fit=crop",
    cropType: "vegetable",
    season: "kharif",
    category: "organic",
    featured: true,
  },
  {
    id: "rice-cultivation",
    title: "Rice Cultivation Guide",
    desc: "Land prep, transplanting, irrigation and disease management.",
    image: "https://images.unsplash.com/photo-1590531192211-9b6b0fd5ab0c?q=80&w=1200&auto=format&fit=crop",
    cropType: "rice",
    season: "kharif",
    category: "sustainable",
  },
  {
    id: "vegetable-farming",
    title: "Vegetable Farming Techniques",
    desc: "Intercropping, mulching and nursery management for higher profits.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop",
    cropType: "vegetable",
    season: "all",
    category: "sustainable",
  },
  {
    id: "fruit-tree",
    title: "Fruit Tree Management",
    desc: "Pruning, training and nutrient schedules for orchard success.",
    image: "https://images.unsplash.com/photo-1600490424000-73ac1dc5aa68?q=80&w=1200&auto=format&fit=crop",
    cropType: "fruit",
    season: "all",
    category: "harvest",
  },
  {
    id: "soil-health",
    title: "Soil Health and Fertility",
    desc: "Soil testing, amendments and microbial life for long‑term yields.",
    image: "https://images.unsplash.com/photo-1584302179601-2d7c2f1b1b60?q=80&w=1200&auto=format&fit=crop",
    cropType: "general",
    season: "all",
    category: "soil",
  },
  {
    id: "water-management",
    title: "Water Management in Agriculture",
    desc: "Irrigation scheduling, drip systems and rainwater harvesting.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop",
    cropType: "general",
    season: "all",
    category: "water",
  },
  {
    id: "crop-rotation",
    title: "Crop Rotation Strategies",
    desc: "Rotate families to reduce pests and improve soil structure.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
    cropType: "general",
    season: "all",
    category: "sustainable",
  },
  {
    id: "pest-disease",
    title: "Pest and Disease Control",
    desc: "Integrated methods for early detection and safe control.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop",
    cropType: "vegetable",
    season: "all",
    category: "pest",
  },
  {
    id: "post-harvest",
    title: "Harvesting and Post‑Harvest Handling",
    desc: "Minimize losses and maintain quality with best practices.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",
    cropType: "general",
    season: "all",
    category: "harvest",
  },
];

export default function Guidance() {
  const [query, setQuery] = useState("");
  const [crop, setCrop] = useState("all");
  const [season, setSeason] = useState("all");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(() => {
    return GUIDES.filter(g =>
      (query ? (g.title+g.desc).toLowerCase().includes(query.toLowerCase()) : true) &&
      (crop === "all" ? true : g.cropType === crop) &&
      (season === "all" ? true : g.season === season) &&
      (cat === "all" ? true : g.category === cat)
    );
  }, [query, crop, season, cat]);

  const featured = filtered.filter(g => g.featured);
  const rest = filtered.filter(g => !g.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1598514982846-460b1bdc7f3c?q=80&w=1600&auto=format&fit=crop"
            alt="Farmers working in field"
            className="w-full h-56 md:h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
          <div className="absolute inset-0 p-6 md:p-8 flex items-end">
            <div>
              <h1 className="text-white text-xl md:text-2xl font-semibold drop-shadow">Crop Guidance</h1>
              <p className="text-white/90 text-xs md:text-sm mt-1 max-w-2xl">Discover practical guides to improve productivity with sustainable, modern farming techniques.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative">
          <input
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search guides, e.g. pest control, wheat, irrigation"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-10 py-3 text-sm placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <select value={crop} onChange={(e)=>setCrop(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2">
            <option value="all">Crop Type</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="vegetable">Vegetables</option>
            <option value="fruit">Fruits</option>
            <option value="general">General</option>
          </select>
          <select value={season} onChange={(e)=>setSeason(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2">
            <option value="all">Season</option>
            <option value="kharif">Kharif</option>
            <option value="rabi">Rabi</option>
          </select>
          <select value={cat} onChange={(e)=>setCat(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2">
            <option value="all">Category</option>
            <option value="sustainable">Sustainable</option>
            <option value="pest">Pest Control</option>
            <option value="soil">Soil Health</option>
            <option value="water">Water</option>
            <option value="harvest">Harvest</option>
            <option value="organic">Organic</option>
          </select>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h2 className="text-sm font-semibold text-slate-700">Featured Guides</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featured.map((g)=> (
              <article key={g.id} className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-black/5">
                <img src={g.image} alt={g.title} className="h-36 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-slate-800">{g.title}</h3>
                  <p className="mt-1 text-xs text-slate-600">{g.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* All guides */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-12">
        <h2 className="text-sm font-semibold text-slate-700">All Guides</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rest.map((g)=> (
            <article key={g.id} className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-black/5">
              <img src={g.image} alt={g.title} className="h-28 w-full object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2">{g.title}</h3>
                <p className="mt-1 text-xs text-slate-600 line-clamp-2">{g.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
