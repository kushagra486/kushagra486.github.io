'use client';

import { useEffect, useState } from 'react';
import { fetchWeather, WeatherSnapshot } from '@/lib/weather';
import { profile } from '@/lib/portfolioData';

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchWeather()
      .then((data) => {
        if (!cancelled) setWeather(data);
      })
      .catch(() => {
        if (!cancelled) setError('Weather unavailable');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs text-white/50">{profile.location.split(',')[0]}</p>
      {error && <p className="mt-2 text-sm text-white/40">{error}</p>}
      {!error && !weather && <p className="mt-2 text-sm text-white/40">Loading…</p>}
      {weather && (
        <div className="mt-1 flex items-center gap-3">
          <span className="text-3xl">{weather.icon}</span>
          <div>
            <p className="text-2xl font-semibold text-white">{weather.temperatureC}°C</p>
            <p className="text-xs text-white/50">{weather.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
