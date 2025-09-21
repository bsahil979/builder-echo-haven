import { useMemo, useState } from "react";

type Crop = {
  id: string;
  name: string;
  bestSeason: ("kharif" | "rabi" | "all")[];
  soil: ("alluvial" | "black" | "red" | "loamy" | "laterite" | "clay")[];
  rainfall: [number, number]; // annual mm
  region: ("tropical" | "arid" | "temperate" | "coastal")[];
  image: string;
};

const CROPS: Crop[] = [
  { id: "rice", name: "Rice", bestSeason: ["kharif"], soil: ["alluvial", "clay"], rainfall: [1000, 2000], region: ["tropical", "coastal"], image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop" },
  { id: "wheat", name: "Wheat", bestSeason: ["rabi"], soil: ["alluvial", "loamy"], rainfall: [500, 1000], region: ["temperate"], image: "https://images.unsplash.com/photo-1541364983171-e525d7a3a4e5?q=80&w=800&auto=format&fit=crop" },
  { id: "maize", name: "Maize", bestSeason: ["kharif", "rabi"], soil: ["loamy", "red"], rainfall: [600, 900], region: ["tropical", "temperate"], image: "https://images.unsplash.com/photo-1560785496-3b5083a0b39a?q=80&w=800&auto=format&fit=crop" },
  { id: "cotton", name: "Cotton", bestSeason: ["kharif"], soil: ["black", "red"], rainfall: [600, 800], region: ["tropical", "arid"], image: "https://images.unsplash.com/photo-1610385292113-4e6ebadc177a?q=80&w=800&auto=format&fit=crop" },
  { id: "soybean", name: "Soybean", bestSeason: ["kharif"], soil: ["black", "loamy"], rainfall: [700, 1000], region: ["tropical"], image: "https://images.unsplash.com/photo-1590165482129-1b0162e71df4?q=80&w=800&auto=format&fit=crop" },
  { id: "groundnut", name: "Groundnut", bestSeason: ["kharif"], soil: ["red", "sandy", "loamy" as any], rainfall: [500, 1000], region: ["tropical", "coastal"], image: "https://images.unsplash.com/photo-1604908176997-9a3b3a0a26ac?q=80&w=800&auto=format&fit=crop" },
  { id: "mustard", name: "Mustard", bestSeason: ["rabi"], soil: ["alluvial", "loamy"], rainfall: [400, 800], region: ["temperate"], image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=800&auto=format&fit=crop" },
  { id: "chickpea", name: "Chickpea", bestSeason: ["rabi"], soil: ["black", "alluvial", "loamy"], rainfall: [400, 800], region: ["arid", "temperate"], image: "https://images.unsplash.com/photo-1604908177341-9b78c33bd44a?q=80&w=800&auto=format&fit=crop" },
  { id: "sugarcane", name: "Sugarcane", bestSeason: ["all"], soil: ["alluvial", "black"], rainfall: [1000, 1500], region: ["tropical", "coastal"], image: "https://images.unsplash.com/photo-1621713882100-17f2faab6a5a?q=80&w=800&auto=format&fit=crop" },
  { id: "pigeonpea", name: "Pigeon Pea", bestSeason: ["kharif"], soil: ["red", "black", "loamy"], rainfall: [600, 1000], region: ["tropical"], image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop" },
];

export default function Recommendations() {
  const [season, setSeason] = useState("kharif");
  const [soil, setSoil] = useState("alluvial");
  const [region, setRegion] = useState("tropical");
  const [rain, setRain] = useState(800);

  const scored = useMemo(() => {
    return CROPS.map((c) => {
      let score = 0;
      if (c.bestSeason.includes(season as any) || c.bestSeason.includes("all")) score += 2;
      if (c.soil.includes(soil as any)) score += 2;
      if (c.region.includes(region as any)) score += 1;
      if (rain >= c.rainfall[0] && rain <= c.rainfall[1]) score += 2;
      return { ...c, score };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [season, soil, region, rain]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Crop Recommendations</h1>

        {/* Controls */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select value={season} onChange={(e)=>setSeason(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
            <option value="kharif">Season: Kharif (Monsoon)</option>
            <option value="rabi">Season: Rabi (Winter)</option>
            <option value="all">Season: All year</option>
          </select>
          <select value={soil} onChange={(e)=>setSoil(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
            <option value="alluvial">Soil: Alluvial</option>
            <option value="black">Soil: Black</option>
            <option value="red">Soil: Red</option>
            <option value="loamy">Soil: Loamy</option>
            <option value="clay">Soil: Clay</option>
            <option value="laterite">Soil: Laterite</option>
          </select>
          <select value={region} onChange={(e)=>setRegion(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
            <option value="tropical">Region: Tropical</option>
            <option value="arid">Region: Arid/Semi‑arid</option>
            <option value="temperate">Region: Temperate/Highland</option>
            <option value="coastal">Region: Coastal</option>
          </select>
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-600">Rainfall (mm/yr)</label>
            <input type="range" min={200} max={2000} step={50} value={rain} onChange={(e)=>setRain(parseInt(e.target.value))} className="w-full" />
            <span className="text-sm font-medium text-slate-800 w-14 text-right">{rain}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {scored.map((c) => (
            <div key={c.id} className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-black/5">
              <img src={c.image} alt={c.name} className="h-32 w-full object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-slate-800">{c.name}</h3>
                <p className="mt-1 text-xs text-slate-600">Best: {c.bestSeason.join(", ")}; Soil: {c.soil[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
