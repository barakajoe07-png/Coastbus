export interface RouteData {
  origin: string;
  destination: string;
  fare: string;
  duration: string;
}

export const routesData: RouteData[] = [
  { origin: 'Bomet', destination: 'Nairobi', fare: '1200 - 1600', duration: '4–5 hours' },
  { origin: 'Bondo', destination: 'Nairobi', fare: '1900', duration: '8–9 hours' },
  { origin: 'Bungoma', destination: 'Mombasa', fare: '2400 - 3000', duration: '14–16 hours' },
  { origin: 'Busia', destination: 'Mombasa', fare: '1900 - 3000', duration: '15–17 hours' },
  { origin: 'Busia', destination: 'Nairobi', fare: '1800 - 1900', duration: '8–9 hours' },
  { origin: 'Chuka', destination: 'Nairobi', fare: '1700 - 1900', duration: '4–5 hours' },
  { origin: 'Eldoret', destination: 'Mombasa', fare: '3000 - 3600', duration: '13–15 hours' },
  { origin: 'Eldoret', destination: 'Nairobi', fare: '1200 - 1700', duration: '5–6 hours' },
  { origin: 'Embu', destination: 'Nairobi', fare: '1700 - 1900', duration: '3–4 hours' },
  { origin: 'Homa Bay', destination: 'Nairobi', fare: '1700 - 1800', duration: '7–8 hours' },
  { origin: 'Isiolo', destination: 'Nairobi', fare: '1700 - 1900', duration: '5–6 hours' },
  { origin: 'Kakamega', destination: 'Mombasa', fare: '2400 - 3000', duration: '14–16 hours' },
  { origin: 'Kakamega', destination: 'Nairobi', fare: '1700 - 1900', duration: '7–8 hours' },
  { origin: 'Kampala', destination: 'Nairobi', fare: '2600 - 4600', duration: '11–13 hours' },
  { origin: 'Kathwana', destination: 'Nairobi', fare: '1700 - 1900', duration: '4–5 hours' },
  { origin: 'Kehancha', destination: 'Nairobi', fare: '1800 - 1900', duration: '8–9 hours' },
  { origin: 'Kendu Bay', destination: 'Nairobi', fare: '1700 - 1800', duration: '6–7 hours' },
  { origin: 'Kericho', destination: 'Nairobi', fare: '1200 - 1600', duration: '5–6 hours' },
  { origin: 'Kisii', destination: 'Mombasa', fare: '3000 - 3600', duration: '14–16 hours' },
  { origin: 'Kisii', destination: 'Nairobi', fare: '1400 - 1900', duration: '6–7 hours' },
  { origin: 'Kisumu', destination: 'Mombasa', fare: '3400 - 6000', duration: '14–16 hours' },
  { origin: 'Kisumu', destination: 'Nairobi', fare: '1400 - 1900', duration: '6–7 hours' },
  { origin: 'Kitale', destination: 'Mombasa', fare: '3000 - 3600', duration: '14–16 hours' },
  { origin: 'Kitale', destination: 'Nairobi', fare: '1400 - 1800', duration: '7–8 hours' },
  { origin: 'Kitui', destination: 'Mombasa', fare: '1200 - 2800', duration: '8–9 hours' },
  { origin: 'Lamu', destination: 'Mombasa', fare: '1800', duration: '7–9 hours' },
  { origin: 'Malaba', destination: 'Mombasa', fare: '3600 - 6600', duration: '15–17 hours' },
  { origin: 'Malaba', destination: 'Nairobi', fare: '1900 - 2000', duration: '8–9 hours' },
  { origin: 'Malindi', destination: 'Mombasa', fare: '600 - 1200', duration: '2–3 hours' },
  { origin: 'Malindi', destination: 'Nairobi', fare: '1800 - 3400', duration: '10–11 hours' },
  { origin: 'Mbita', destination: 'Nairobi', fare: '1700 - 1800', duration: '8–9 hours' },
  { origin: 'Meru', destination: 'Nairobi', fare: '1700 - 1900', duration: '5–6 hours' },
  { origin: 'Mombasa', destination: 'Kisumu', fare: '3400 - 6000', duration: '14–16 hours' },
  { origin: 'Mombasa', destination: 'Kitui', fare: '1200 - 2800', duration: '8–9 hours' },
  { origin: 'Mombasa', destination: 'Malaba', fare: '3600 - 6600', duration: '15–17 hours' },
  { origin: 'Mombasa', destination: 'Migori', fare: '3600 - 6600', duration: '15–16 hours' },
  { origin: 'Mombasa', destination: 'Mumias', fare: '3400 - 6000', duration: '14–15 hours' },
  { origin: 'Mombasa', destination: 'Nairobi', fare: '1400 - 3000', duration: '8–10 hours' },
  { origin: 'Nairobi', destination: 'Kampala', fare: '2600 - 4600', duration: '11–13 hours' },
  { origin: 'Nairobi', destination: 'Malindi', fare: '1800 - 3400', duration: '10–11 hours' },
  { origin: 'Nairobi', destination: 'Mombasa', fare: '1400 - 3000', duration: '8–10 hours' },
  { origin: 'Nakuru', destination: 'Mombasa', fare: '2200 - 3000', duration: '10–12 hours' },
  { origin: 'Nakuru', destination: 'Nairobi', fare: '700 - 1200', duration: '3–4 hours' },
  { origin: 'Nanyuki', destination: 'Nairobi', fare: '600 - 1000', duration: '4–5 hours' },
  { origin: 'Nyadorera', destination: 'Nairobi', fare: '1900', duration: '7–8 hours' },
  { origin: 'Nyeri', destination: 'Nairobi', fare: '600 - 1000', duration: '3–4 hours' },
  { origin: 'Oyugis', destination: 'Nairobi', fare: '1700 - 1800', duration: '6–7 hours' },
  { origin: 'Port Victoria', destination: 'Nairobi', fare: '1900 - 2200', duration: '8–9 hours' },
  { origin: 'Siaya', destination: 'Nairobi', fare: '1900', duration: '7–8 hours' },
  { origin: 'Sirare', destination: 'Nairobi', fare: '1800 - 1900', duration: '8–9 hours' },
  { origin: 'Thika', destination: 'Nairobi', fare: '100', duration: '1–2 hours' },
  { origin: 'Usenge', destination: 'Nairobi', fare: '1900', duration: '8–9 hours' },
  { origin: 'Webuye', destination: 'Nairobi', fare: '1800', duration: '8–9 hours' }
];

export const uniqueOrigins = Array.from(new Set(routesData.map(r => r.origin))).sort();
export const uniqueDestinations = Array.from(new Set(routesData.map(r => r.destination))).sort();
