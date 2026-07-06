/**
 * Gedeelde knoop-geometrie. Bron van waarheid is een lijst waypoints; hieruit
 * wordt de gladde hartlijn berekend, worden de zelf-kruisingen automatisch
 * gevonden, en worden de "bruggen" (over-strengen) gemaakt. Zowel de viewer als
 * de editor gebruiken `bouwGeometrie`.
 */

export type Punt = [number, number];

/** Welke streng bij een kruising bovenop ligt. */
export type KruisKeuze = 'vroeg-over' | 'laat-over';

export interface Kruising {
  /** Stabiele index (gesorteerd op positie langs het touw). */
  i: number;
  x: number;
  y: number;
  /** Fractie (0..1) van de vroege en late streng op dit kruispunt. */
  fa: number;
  fb: number;
  keuze: KruisKeuze;
}

export interface Brug {
  d: string;
  /** Scrub-positie waarop deze over-kruising verschijnt (0..1). */
  vanaf: number;
}

export interface KnoopGeometrie {
  /** Gladde hartlijn door de waypoints. */
  pad: string;
  bruggen: Brug[];
  kruisingen: Kruising[];
}

/** Catmull-Rom spline door de punten → dichte polyline (open pad). */
function sample(points: Punt[], perSeg = 40): Punt[] {
  const p = [points[0], ...points, points[points.length - 1]];
  const out: Punt[] = [];
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    for (let s = 0; s < perSeg; s++) {
      const t = s / perSeg, t2 = t * t, t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

/** Snijpunt van segment a-b met c-d (binnen beide), of null. */
function segInt(a: Punt, b: Punt, c: Punt, d: Punt) {
  const r = [b[0] - a[0], b[1] - a[1]];
  const s = [d[0] - c[0], d[1] - c[1]];
  const den = r[0] * s[1] - r[1] * s[0];
  if (Math.abs(den) < 1e-9) return null;
  const t = ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / den;
  const u = ((c[0] - a[0]) * r[1] - (c[1] - a[1]) * r[0]) / den;
  if (t <= 1e-4 || t >= 1 - 1e-4 || u <= 1e-4 || u >= 1 - 1e-4) return null;
  return { x: a[0] + t * r[0], y: a[1] + t * r[1], t, u };
}

/** Gladde Bézier-pad (Catmull-Rom) door een puntenreeks. */
function toPath(P: Punt[]): string {
  if (P.length < 2) return '';
  let d = `M ${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] ?? P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] ?? P[i + 1];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/**
 * Bouwt de volledige geometrie uit de waypoints.
 * @param keuzes per kruising-index een override (standaard ligt de LATE streng over).
 * @param brugArc halve brug-lengte als fractie van de totale touwlengte.
 */
export function bouwGeometrie(
  waypoints: Punt[],
  keuzes: Record<number, KruisKeuze> = {},
  brugArc = 0.024,
): KnoopGeometrie {
  if (!waypoints || waypoints.length < 2) return { pad: '', bruggen: [], kruisingen: [] };

  const pts = sample(waypoints);
  const N = pts.length;
  const cum = [0];
  for (let i = 1; i < N; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const totaal = cum[N - 1] || 1;
  const frac = cum.map((c) => c / totaal);

  const at = (f: number): Punt => {
    if (f <= 0) return pts[0];
    if (f >= 1) return pts[N - 1];
    let i = 1;
    while (i < N && frac[i] < f) i++;
    const t = (f - frac[i - 1]) / ((frac[i] - frac[i - 1]) || 1);
    return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t];
  };

  // alle zelf-kruisingen
  const ruw: { x: number; y: number; fa: number; fb: number }[] = [];
  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 2; j < N - 1; j++) {
      const h = segInt(pts[i], pts[i + 1], pts[j], pts[j + 1]);
      if (!h) continue;
      const f1 = frac[i] + (frac[i + 1] - frac[i]) * h.t;
      const f2 = frac[j] + (frac[j + 1] - frac[j]) * h.u;
      ruw.push({ x: h.x, y: h.y, fa: Math.min(f1, f2), fb: Math.max(f1, f2) });
    }
  }
  // dubbele detecties samenvoegen
  const uniek: typeof ruw = [];
  for (const c of ruw) if (!uniek.some((u) => Math.hypot(u.x - c.x, u.y - c.y) < 7)) uniek.push(c);
  uniek.sort((a, b) => a.fb - b.fb);

  const kruisingen: Kruising[] = uniek.map((c, i) => ({
    i,
    x: c.x,
    y: c.y,
    fa: c.fa,
    fb: c.fb,
    keuze: keuzes[i] ?? 'laat-over',
  }));

  const bruggen: Brug[] = kruisingen.map((k) => {
    // De brug volgt de OVER-streng (vroeg of laat), maar verschijnt pas als de
    // kruising compleet is — d.w.z. als ook de látere streng getekend is (fb).
    const over = k.keuze === 'vroeg-over' ? k.fa : k.fb;
    const seg: Punt[] = [];
    for (let s = -6; s <= 6; s++) seg.push(at(over + (s / 6) * brugArc));
    return { d: toPath(seg), vanaf: +k.fb.toFixed(3) };
  });

  return { pad: toPath(waypoints), bruggen, kruisingen };
}
