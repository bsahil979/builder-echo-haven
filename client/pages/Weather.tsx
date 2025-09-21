import { useEffect, useMemo, useState } from "react";

interface Geo {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
}

interface ForecastDay {
  date: string;
  tmax: number;
  tmin: number;
  precip: number;
  code: number;
}

export default function Weather() {
  const [place, setPlace] = useState("Mumbai");
  const [geo, setGeo] = useState<Geo | null>(null);
  const [days, setDays] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGeo = async (name: string) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      name
    )}&count=1&language=en&format=json`;
    const res = await fetch(url);
    const json = await res.json();
    if (!json?.results?.length) throw new Error("Location not found");
    const g = json.results[0];
    return {
      name: `${g.name}${g.admin1 ? ", " + g.admin1 : ""}`,
      latitude: g.latitude,
      longitude: g.longitude,
      country: g.country,
    } as Geo;
  };

  const fetchForecast = async (g: Geo) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`;
    const res = await fetch(url);
    const j = await res.json();
    const d: ForecastDay[] = j.daily.time.map((t: string, i: number) => ({
      date: t,
      tmax: j.daily.temperature_2m_max[i],
      tmin: j.daily.temperature_2m_min[i],
      precip: j.daily.precipitation_sum[i],
      code: j.daily.weathercode[i],
    }));
    setDays(d);
  };

  const lookup = async (n: string) => {
    setLoading(true);
    setError(null);
    try {
      const g = await fetchGeo(n);
      setGeo(g);
      await fetchForecast(g);
    } catch (e: any) {
      setError(e.message ?? "Unable to fetch weather");
    } finally {
      setLoading(false);
    }
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const url = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&format=json`;
          const res = await fetch(url);
          const j = await res.json();
          const label = j?.results?.[0]?.name || "My location";
          const g: Geo = { name: label, latitude, longitude };
          setGeo(g);
          await fetchForecast(g);
        } catch (e: any) {
          setError("Failed to reverse geocode");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    lookup(place);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatter = useMemo(() =>
    new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }), []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Weather Forecast</h1>
          <div className="flex gap-2">
            <input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Search city, district…"
              className="w-72 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
            />
            <button onClick={() => lookup(place)} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Search</button>
            <button onClick={useMyLocation} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Use my location</button>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6">
          <div className="rounded-2xl bg-white shadow ring-1 ring-black/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="text-base font-medium text-slate-900">{geo ? `${geo.name}${geo.country ? ", " + geo.country : ""}` : "--"}</p>
              </div>
              {loading && <span className="text-sm text-slate-500">Loading…</span>}
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              {days.map((d) => (
                <div key={d.date} className="rounded-lg border border-slate-200 p-3 text-center">
                  <div className="text-xs text-slate-500">{formatter.format(new Date(d.date))}</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">{Math.round(d.tmax)}° / {Math.round(d.tmin)}°</div>
                  <div className="mt-1 text-xs text-slate-500">Rain {Math.round(d.precip)}mm</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
