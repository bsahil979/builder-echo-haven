import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

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

interface HourPoint {
  time: string;
  temp: number;
  humidity: number;
  precipProb: number | null;
  wind: number;
  gust: number | null;
}

export default function Weather() {
  const [place, setPlace] = useState("Mumbai");
  const [geo, setGeo] = useState<Geo | null>(null);
  const [days, setDays] = useState<ForecastDay[]>([]);
  const [hourly, setHourly] = useState<HourPoint[]>([]);
  const [current, setCurrent] = useState<{ temp: number; wind: number } | null>(null);
  const [sunrise, setSunrise] = useState<string | null>(null);
  const [sunset, setSunset] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [simple, setSimple] = useState(true);

  const fetchGeo = async (name: string) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      name
    )}&count=1&language=en&format=json`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: "application/json" } }).catch(() => {
      throw new Error("Network error while searching location");
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`Location lookup failed (HTTP ${res.status})`);
    const json = await res.json().catch(() => {
      throw new Error("Invalid location response");
    });
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
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,windspeed_10m,windgusts_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset&current_weather=true&timezone=auto`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: "application/json" } }).catch(() => {
      throw new Error("Network error while fetching forecast");
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`Forecast fetch failed (HTTP ${res.status})`);
    const j = await res.json().catch(() => {
      throw new Error("Invalid forecast response");
    });

    const d: ForecastDay[] = j.daily.time.map((t: string, i: number) => ({
      date: t,
      tmax: j.daily.temperature_2m_max[i],
      tmin: j.daily.temperature_2m_min[i],
      precip: j.daily.precipitation_sum[i],
      code: j.daily.weathercode[i],
    }));
    setDays(d);
    setCurrent(
      j.current_weather ? { temp: j.current_weather.temperature, wind: j.current_weather.windspeed } : null
    );
    setSunrise(j.daily?.sunrise?.[0] ?? null);
    setSunset(j.daily?.sunset?.[0] ?? null);

    const now = new Date();
    const times: string[] = j.hourly.time;
    let idx = times.findIndex((t: string) => new Date(t) >= now);
    if (idx === -1) idx = 0;
    const sliceEnd = Math.min(idx + 24, times.length);
    const points: HourPoint[] = [];
    for (let i = idx; i < sliceEnd; i++) {
      points.push({
        time: times[i],
        temp: j.hourly.temperature_2m[i],
        humidity: j.hourly.relativehumidity_2m[i],
        precipProb: j.hourly.precipitation_probability?.[i] ?? null,
        wind: j.hourly.windspeed_10m[i],
        gust: j.hourly.windgusts_10m?.[i] ?? null,
      });
    }
    setHourly(points);

    const derived: string[] = [];
    if (d.some((x) => x.precip >= 20)) derived.push("Heavy rain expected (>20mm) in the next 7 days");
    if (d.some((x) => x.tmax >= 40)) derived.push("Heatwave risk: max temp ≥ 40°C");
    if (d.some((x) => x.tmin <= 0)) derived.push("Frost risk: min temp ≤ 0°C");
    const maxGust = Math.max(...(j.hourly.windgusts_10m?.slice(idx, sliceEnd) ?? [0]));
    if (maxGust >= 60) derived.push(`High winds expected: gusts up to ${Math.round(maxGust)} km/h`);
    setAlerts(derived);
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
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 12000);
          const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: "application/json" } }).catch(() => {
            throw new Error("Network error while reverse geocoding");
          });
          clearTimeout(timer);
          if (!res.ok) throw new Error(`Reverse geocoding failed (HTTP ${res.status})`);
          const j = await res.json().catch(() => {
            throw new Error("Invalid reverse geocoding response");
          });
          const label = j?.results?.[0]?.name || "My location";
          const g: Geo = { name: label, latitude, longitude };
          setGeo(g);
          setPlace(label);
          await fetchForecast(g);
        } catch (e: any) {
          setError("Failed to reverse geocode");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.warn("Geolocation error", err);
        setError("Location permission denied or unavailable");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    // Try to use user's location first
    useMyLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateFmt = useMemo(
    () => new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }),
    []
  );
  const hourFmt = useMemo(() => new Intl.DateTimeFormat(undefined, { hour: "numeric" }), []);

  // Simple language summaries from hourly data
  const summaries = useMemo(() => {
    if (!hourly.length) return null;
    const withIndex = hourly.map((p, i) => ({ ...p, i }));
    const maxTemp = withIndex.reduce((a, b) => (b.temp > a.temp ? b : a));
    const minTemp = withIndex.reduce((a, b) => (b.temp < a.temp ? b : a));
    const maxRain = withIndex.reduce((a, b) => ((b.precipProb ?? 0) > (a.precipProb ?? 0) ? b : a));
    const maxWind = withIndex.reduce((a, b) => (b.wind > a.wind ? b : a));
    const maxGust = withIndex.reduce((a, b) => ((b.gust ?? 0) > (a.gust ?? 0) ? b : a));
    return {
      hottest: `${Math.round(maxTemp.temp)}° around ${hourFmt.format(new Date(maxTemp.time))}`,
      coolest: `${Math.round(minTemp.temp)}° around ${hourFmt.format(new Date(minTemp.time))}`,
      rain: `${Math.round(maxRain.precipProb ?? 0)}% chance around ${hourFmt.format(new Date(maxRain.time))}`,
      wind: `${Math.round(maxWind.wind)} km/h around ${hourFmt.format(new Date(maxWind.time))}`,
      gust: `${Math.round(maxGust.gust ?? 0)} km/h gusts around ${hourFmt.format(new Date(maxGust.time))}`,
    };
  }, [hourly, hourFmt]);

  const SimpleTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const p = Object.fromEntries(payload.map((x: any) => [x.dataKey, x.value]));
    return (
      <div className="rounded-md bg-white/95 p-2 shadow ring-1 ring-slate-200 text-xs">
        <div><strong>Time:</strong> {payload[0]?.payload?.x}</div>
        {p.temp !== undefined && <div>Temperature: {Math.round(p.temp)}°C</div>}
        {p.precip !== undefined && <div>Chance of rain: {Math.round(p.precip)}%</div>}
        {p.wind !== undefined && <div>Wind: {Math.round(p.wind)} km/h</div>}
        {p.gust !== undefined && <div>Gusts: {Math.round(p.gust)} km/h</div>}
      </div>
    );
  };

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
            <button onClick={() => setSimple((s) => !s)} className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              {simple ? "Show charts" : "Simple view"}
            </button>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {/* Alerts */}
        <div className="mt-6">
          <div className="rounded-2xl bg-white shadow ring-1 ring-black/5 p-5">
            <p className="text-sm font-medium text-slate-800">Weather alerts</p>
            {alerts.length === 0 ? (
              <p className="mt-2 text-xs text-slate-500">No significant alerts for your area in the next few days.</p>
            ) : (
              <ul className="mt-2 grid gap-2">
                {alerts.map((a, i) => (
                  <li key={i} className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">{a}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Current conditions + summaries or charts */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white shadow ring-1 ring-black/5 p-5 lg:col-span-1">
            <p className="text-sm text-slate-500">Location</p>
            <p className="text-base font-medium text-slate-900">{geo ? `${geo.name}${geo.country ? ", " + geo.country : ""}` : "--"}</p>
            <div className="mt-4 flex items-end gap-6">
              <div>
                <div className="text-4xl font-bold text-slate-900">{current ? Math.round(current.temp) : "--"}°</div>
                <div className="text-xs text-slate-500">Sunrise {sunrise ? new Date(sunrise).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--"} · Sunset {sunset ? new Date(sunset).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--"}</div>
              </div>
              <div className="ml-auto">
                <div className="text-sm text-slate-700">Wind {current ? Math.round(current.wind) : "--"} km/h</div>
                {hourly[0] && <div className="text-sm text-slate-700">Humidity {Math.round(hourly[0].humidity)}%</div>}
              </div>
            </div>
            {simple && summaries && (
              <div className="mt-4 grid gap-2 text-xs text-slate-700">
                <div className="rounded bg-slate-50 px-3 py-2">Hottest today: <strong>{summaries.hottest}</strong></div>
                <div className="rounded bg-slate-50 px-3 py-2">Coolest today: <strong>{summaries.coolest}</strong></div>
                <div className="rounded bg-slate-50 px-3 py-2">Highest chance of rain: <strong>{summaries.rain}</strong> (blue line)</div>
                <div className="rounded bg-slate-50 px-3 py-2">Strongest wind: <strong>{summaries.wind}</strong></div>
                <div className="rounded bg-slate-50 px-3 py-2">Strongest gusts: <strong>{summaries.gust}</strong></div>
              </div>
            )}
          </div>

          {/* Next 24 hours (Temp / Precip) */}
          <div className="rounded-2xl bg-white shadow ring-1 ring-black/5 p-5 lg:col-span-2">
            <div className="mb-2">
              <p className="text-sm font-medium text-slate-800">Next 24 hours — Temperature and chance of rain</p>
              <p className="text-xs text-slate-500">Green = temperature (°C). Blue = chance of rain (%). Time shown along the bottom.</p>
            </div>
            {!simple && (
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourly.map((h) => ({ x: hourFmt.format(new Date(h.time)), temp: h.temp, precip: h.precipProb ?? 0 }))} margin={{ left: 0, right: 8, top: 10, bottom: 0 }}>
                    <CartesianGrid stroke="#eef2f7" strokeDasharray="3 3" />
                    <XAxis dataKey="x" tick={{ fontSize: 12 }} label={{ value: "Time", position: "insideBottom", offset: -5 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} domain={["auto", "auto"]} label={{ value: "°C", angle: -90, position: "insideLeft" }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} domain={[0, 100]} label={{ value: "%", angle: -90, position: "insideRight" }} />
                    <Tooltip content={<SimpleTooltip />} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#059669" strokeWidth={3} dot={false} name="Temperature (°C)" />
                    <Line yAxisId="right" type="monotone" dataKey="precip" stroke="#60a5fa" strokeWidth={3} dot={false} name="Chance of rain (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {simple && summaries && (
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2 text-xs text-slate-700">
                <li className="rounded-lg border border-slate-200 p-3">Highest rain chance: <strong>{summaries.rain}</strong></li>
                <li className="rounded-lg border border-slate-200 p-3">Hottest: <strong>{summaries.hottest}</strong></li>
                <li className="rounded-lg border border-slate-200 p-3">Coolest: <strong>{summaries.coolest}</strong></li>
                <li className="rounded-lg border border-slate-200 p-3">Wind peak: <strong>{summaries.wind}</strong></li>
              </ul>
            )}
          </div>
        </div>

        {/* Wind & Gusts */}
        <div className="mt-6 rounded-2xl bg-white shadow ring-1 ring-black/5 p-5">
          <div className="mb-2">
            <p className="text-sm font-medium text-slate-800">Wind and Gusts (next 24 hours)</p>
            <p className="text-xs text-slate-500">Teal = steady wind. Orange = stronger bursts (gusts). Higher numbers mean stronger wind.</p>
          </div>
          {!simple ? (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourly.map((h) => ({ x: hourFmt.format(new Date(h.time)), wind: h.wind, gust: h.gust ?? 0 }))} margin={{ left: 0, right: 8, top: 10, bottom: 0 }}>
                  <CartesianGrid stroke="#eef2f7" strokeDasharray="3 3" />
                  <XAxis dataKey="x" tick={{ fontSize: 12 }} label={{ value: "Time", position: "insideBottom", offset: -5 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} label={{ value: "km/h", angle: -90, position: "insideLeft" }} />
                  <Tooltip content={<SimpleTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="wind" stroke="#0ea5a7" strokeWidth={3} dot={false} name="Wind (km/h)" />
                  <Line type="monotone" dataKey="gust" stroke="#f59e0b" strokeWidth={3} dot={false} name="Gusts (km/h)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            summaries && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2 text-xs text-slate-700">
                <div className="rounded-lg border border-slate-200 p-3">Strongest wind: <strong>{summaries.wind}</strong></div>
                <div className="rounded-lg border border-slate-200 p-3">Strongest gusts: <strong>{summaries.gust}</strong></div>
                <div className="rounded-lg border border-slate-200 p-3">Tip: If gusts are high, secure light objects and avoid spraying.</div>
              </div>
            )
          )}
        </div>

        {/* 7 day forecast */}
        <div className="mt-6">
          <div className="rounded-2xl bg-white shadow ring-1 ring-black/5 p-5">
            <div className="mb-2">
              <p className="text-sm font-medium text-slate-800">Next 7 days</p>
              <p className="text-xs text-slate-500">Each box shows daytime high and nighttime low. "Rain" is the total expected for that day.</p>
            </div>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              {days.map((d) => (
                <div key={d.date} className="rounded-lg border border-slate-200 p-3 text-center">
                  <div className="text-xs text-slate-500">{dateFmt.format(new Date(d.date))}</div>
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
