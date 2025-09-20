export default function Index() {
  const marketplaceItems = [
    { name: "Organic Tomatoes", price: "₹2.5/kg", image: "https://api.builder.io/api/v1/image/assets/TEMP/87dbfd14ab7d02cbc5242a5522ecbd9c4f130182?width=598" },
    { name: "Organic Wheat", price: "₹2.9/kg", image: "https://api.builder.io/api/v1/image/assets/TEMP/6a884d42985542987f4b2464063e7ef3b705aa05?width=518" },
    { name: "Carrots", price: "₹1.7/kg", image: "https://api.builder.io/api/v1/image/assets/TEMP/a1a41ce595d99ea96e987f012f8dc2f24e2ebfc3?width=434" },
    { name: "Basmati Rice", price: "₹3.4/kg", image: "https://api.builder.io/api/v1/image/assets/TEMP/de9bd4f2ee4f78e86e489073fc71be94cf166cf9?width=518" },
    { name: "Onions", price: "₹1.9/kg", image: "https://api.builder.io/api/v1/image/assets/TEMP/185d58af62fff9f69dbeca0e3cee5d2654a9c547?width=336" },
    { name: "Radish", price: "₹1.2/kg", image: "https://api.builder.io/api/v1/image/assets/TEMP/a1a41ce595d99ea96e987f012f8dc2f24e2ebfc3?width=434" },
  ];

  const guidance = [
    {
      title: "Sustainable Farming Practices",
      desc: "Learn about eco‑friendly techniques to improve yield and protect the environment.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/5e3e2903dff748faaf38b9644d6e540d69e35fff?width=506",
    },
    {
      title: "Pest Control Strategies",
      desc: "Effective and safe methods for managing pests in your crops.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/cef83c7df68a0a281b66c3830af56cf7601ccfce?width=494",
    },
    {
      title: "Water Conservation Tips",
      desc: "Conserve water in your farming operations with proven practical ideas.",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/5e3e2903dff748faaf38b9644d6e540d69e35fff?width=506",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative max-w-screen-lg mx-auto mt-8 rounded-2xl overflow-hidden shadow-sm">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/ebaa5de6aab3da2e3de2e92352eb52b61d28c798?width=2764"
          alt="Green fields"
          className="w-full h-[320px] md:h-[360px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
        <div className="absolute inset-0 px-6 md:px-10 flex flex-col justify-center">
          <h1 className="max-w-xl text-white text-2xl md:text-4xl lg:text-[32px] font-extrabold tracking-tight drop-shadow">Empowering Farmers for a Greener Tomorrow</h1>
          <a href="#marketplace" className="mt-6 inline-flex w-fit rounded-md bg-emerald-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-emerald-700">Get Started</a>
        </div>
      </section>

      {/* Weather summary */}
      <section id="weather" className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-0 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="md:col-span-2">
          <h2 className="text-sm font-semibold text-slate-700">Real-Time Weather Forecast</h2>
          <p className="mt-2 text-sm text-slate-600">Sunny with a chance of showers</p>
          <p className="text-xs text-slate-500">Location: Mumbai, India | Temperature: 25°C</p>
        </div>
        <div className="md:col-span-1">
          <div className="relative rounded-xl bg-white shadow ring-1 ring-black/5 h-[140px] flex items-center justify-center">
            <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#0ea5a7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M17 18a5 5 0 0 0-4.546-4.978A7 7 0 1 0 5 18h12Z"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section id="marketplace" className="max-w-screen-lg mx-auto mt-10">
        <h2 className="px-4 sm:px-6 lg:px-0 text-sm font-semibold text-slate-700">Marketplace</h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 px-4 sm:px-6 lg:px-0">
          {marketplaceItems.map((item) => (
            <div key={item.name} className="group overflow-hidden rounded-xl bg-white shadow ring-1 ring-black/5">
              <div className="h-28 w-full overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-800 leading-tight">{item.name}</p>
                <p className="text-xs text-slate-500 mt-1">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Crop Guidance */}
      <section id="guidance" className="max-w-screen-lg mx-auto mt-10 px-4 sm:px-6 lg:px-0">
        <h2 className="text-sm font-semibold text-slate-700">Crop Guidance</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidance.map((g) => (
            <article key={g.title} className="overflow-hidden rounded-xl bg-white shadow ring-1 ring-black/5">
              <img src={g.image} alt={g.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-800">{g.title}</h3>
                <p className="mt-1 text-xs text-slate-600">{g.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
