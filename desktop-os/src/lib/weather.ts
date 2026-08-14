export interface WeatherSnapshot {
  temperatureC: number;
  description: string;
  icon: string;
}

// WMO weather codes -> short description + emoji icon.
const WEATHER_CODES: Record<number, { description: string; icon: string }> = {
  0: { description: 'Clear sky', icon: '☀️' },
  1: { description: 'Mostly clear', icon: '🌤️' },
  2: { description: 'Partly cloudy', icon: '⛅' },
  3: { description: 'Overcast', icon: '☁️' },
  45: { description: 'Fog', icon: '🌫️' },
  48: { description: 'Fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: '🌦️' },
  53: { description: 'Drizzle', icon: '🌦️' },
  55: { description: 'Heavy drizzle', icon: '🌧️' },
  61: { description: 'Light rain', icon: '🌦️' },
  63: { description: 'Rain', icon: '🌧️' },
  65: { description: 'Heavy rain', icon: '🌧️' },
  71: { description: 'Light snow', icon: '🌨️' },
  73: { description: 'Snow', icon: '🌨️' },
  75: { description: 'Heavy snow', icon: '❄️' },
  80: { description: 'Rain showers', icon: '🌦️' },
  81: { description: 'Rain showers', icon: '🌧️' },
  82: { description: 'Violent showers', icon: '⛈️' },
  95: { description: 'Thunderstorm', icon: '⛈️' },
  96: { description: 'Thunderstorm w/ hail', icon: '⛈️' },
  99: { description: 'Thunderstorm w/ hail', icon: '⛈️' },
};

// Prayagraj, Uttar Pradesh — Kushagra's location, used when browser geolocation isn't available/granted.
const DEFAULT_LAT = 25.4358;
const DEFAULT_LON = 81.8463;

export async function fetchWeather(lat = DEFAULT_LAT, lon = DEFAULT_LON): Promise<WeatherSnapshot> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API request failed: ${res.status}`);

  const data = await res.json();
  const code: number = data.current.weather_code;
  const match = WEATHER_CODES[code] ?? { description: 'Unknown', icon: '🌡️' };

  return {
    temperatureC: Math.round(data.current.temperature_2m),
    description: match.description,
    icon: match.icon,
  };
}
