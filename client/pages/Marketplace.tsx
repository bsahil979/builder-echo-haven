import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
};

const CATEGORIES = [
  { id: "fruits", label: "Fruits", emoji: "🍎" },
  { id: "vegetables", label: "Vegetables", emoji: "🥕" },
  { id: "grains", label: "Grains", emoji: "🌾" },
  { id: "seeds", label: "Seeds", emoji: "🌱" },
  { id: "dairy", label: "Dairy", emoji: "🥛" },
  { id: "organic", label: "Organic Products", emoji: "✅" },
] as const;

const PRODUCTS: Product[] = [
  { id: "tomato", name: "Organic Tomato", price: "₹120", image: "https://api.builder.io/api/v1/image/assets/TEMP/87dbfd14ab7d02cbc5242a5522ecbd9c4f130182?width=598", category: "vegetables" },
  { id: "wheat", name: "Fresh Wheat", price: "₹250", image: "https://api.builder.io/api/v1/image/assets/TEMP/6a884d42985542987f4b2464063e7ef3b705aa05?width=518", category: "grains" },
  { id: "rice", name: "Basmati Rice", price: "₹400", image: "https://api.builder.io/api/v1/image/assets/TEMP/de9bd4f2ee4f78e86e489073fc71be94cf166cf9?width=518", category: "grains" },
  { id: "milk", name: "Organic Milk", price: "₹80", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=800&auto=format&fit=crop", category: "dairy" },
  { id: "spinach", name: "Organic Spinach", price: "₹60", image: "https://images.unsplash.com/photo-1604908554049-1e2330f6dcdd?q=80&w=800&auto=format&fit=crop", category: "vegetables" },
  { id: "mango", name: "Organic Mangoes", price: "₹150", image: "https://images.unsplash.com/photo-1615486363623-94dfc3f0f6f6?q=80&w=800&auto=format&fit=crop", category: "fruits" },
  { id: "lentils", name: "Organic Lentils", price: "₹90", image: "https://images.unsplash.com/photo-1604908177341-9b78c33bd44a?q=80&w=800&auto=format&fit=crop", category: "grains" },
  { id: "chickpeas", name: "Organic Chickpeas", price: "₹100", image: "https://images.unsplash.com/photo-1604908176997-9a3b3a0a26ac?q=80&w=800&auto=format&fit=crop", category: "grains" },
  { id: "yogurt", name: "Organic Yogurt", price: "₹70", image: "https://images.unsplash.com/photo-1604908812243-1f51cc8bf8c1?q=80&w=800&auto=format&fit=crop", category: "dairy" },
  { id: "apples", name: "Organic Apples", price: "₹130", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop", category: "fruits" },
  { id: "bananas", name: "Organic Bananas", price: "₹50", image: "https://images.unsplash.com/photo-1571772805064-2070a4bce157?q=80&w=800&auto=format&fit=crop", category: "fruits" },
  { id: "grapes", name: "Organic Grapes", price: "₹80", image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=800&auto=format&fit=crop", category: "fruits" },
];

export default function Marketplace() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const filtered = useMemo(() => {
    const byQuery = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    const byCat = selected.length
      ? byQuery.filter(p => selected.includes(p.category))
      : byQuery;
    return byCat;
  }, [query, selected]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggle = (id: string) => {
    setPage(1);
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb-like top nav */}
        <div className="hidden md:flex gap-6 text-xs text-slate-600 mb-4">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-slate-800">Marketplace</span>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search products by name, category, or location"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-10 py-3 text-sm placeholder:text-slate-400 focus:bg-white focus:border-emerald-600 focus:outline-none"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-3">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs ${selected.includes(c.id) ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
            >
              <span>{c.emoji}</span>{c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {pageItems.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-black/5">
              <div className="h-40 w-full overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-slate-800 line-clamp-1">{p.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          <button disabled={page===1} onClick={() => setPage(p=>Math.max(1,p-1))} className="px-2 py-1 rounded border border-slate-200 disabled:opacity-40">‹</button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i+1)} className={`h-8 w-8 rounded-full text-center border ${page===i+1?"bg-emerald-600 text-white border-emerald-600":"border-slate-200"}`}>{i+1}</button>
          ))}
          <button disabled={page===totalPages} onClick={() => setPage(p=>Math.min(totalPages,p+1))} className="px-2 py-1 rounded border border-slate-200 disabled:opacity-40">›</button>
        </div>
      </div>
    </div>
  );
}
