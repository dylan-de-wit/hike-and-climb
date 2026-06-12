import { Component, computed, input, model } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Eén stop op de route. `label`, `link` en `anchor` zijn optioneel. */
export interface RouteStop {
  naam: string;
  label?: string;
  /** Routerpad. Is dit gezet, dan navigeert de etappe ernaartoe (tussen pagina's). */
  link?: string;
  /** Id van een element op dezelfde pagina. Klik scrollt ernaartoe (tussen containers). */
  anchor?: string;
}

/**
 * Route-divider — een gestikte routelijn met meerdere klikbare etappes,
 * bedoeld om tussen contentblokken te schuiven. Schaalt naar zoveel stops
 * als je meegeeft; de actieve etappe kleurt mee met het thema-accent.
 */
@Component({
  selector: 'app-route-divider',
  imports: [RouterLink],
  templateUrl: './route-divider.html',
  styleUrl: './route-divider.scss',
})
export class RouteDivider {
  /** De etappes op de lijn. Geef er zoveel mee als je wilt. */
  readonly stops = input<RouteStop[]>([]);
  /** Welke etappe actief is (two-way: [(actief)]). */
  readonly actief = model(0);
  /** Optioneel coördinaat linksboven. */
  readonly coordinaat = input<string | null>('36.97°N · 27.02°E');
  /** 'paneel' = op crème vlak; 'overlay' = transparant, voor op een hero-foto. */
  readonly variant = input<'paneel' | 'overlay'>('paneel');

  /** Tekengrootte van het SVG-coördinatenstelsel. */
  readonly vbW = 1000;
  readonly vbH = 80;

  /** Berekent per stop de positie op de golvende lijn. */
  readonly punten = computed(() => {
    const list = this.stops();
    const n = list.length;
    return list.map((s, i) => {
      const x = n <= 1 ? this.vbW / 2 : 60 + (this.vbW - 120) * (i / (n - 1));
      const y = 42 - 14 * Math.sin((i + 0.6) * 1.1);
      return {
        x,
        y,
        naam: s.naam,
        label: s.label ?? null,
        link: s.link ?? null,
        anchor: s.anchor ?? null,
        nummer: this.nr(i),
        i,
      };
    });
  });

  /**
   * De punten waar de lijn doorheen loopt: de waypoints plus twee slingerende
   * tussenpunten per segment, zodat het pad kronkelt als een bergpad.
   */
  readonly padPunten = computed(() => {
    const wp = this.punten();
    if (wp.length < 2) return wp.map((p) => ({ x: p.x, y: p.y }));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    // Vaste pseudo-ruis op index: onregelmatig, maar elke render hetzelfde.
    const ruis = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i < wp.length - 1; i++) {
      const a = wp[i];
      const b = wp[i + 1];
      const dx = b.x - a.x;
      // Twee tussenpunten met wisselende plek, hoogte en richting.
      const t1 = 0.22 + ruis(i * 2.1) * 0.18;
      const t2 = 0.58 + ruis(i * 3.7 + 1) * 0.2;
      const amp1 = 6 + ruis(i * 5.3 + 2) * 17;
      const amp2 = 6 + ruis(i * 9.1 + 3) * 17;
      const s1 = ruis(i * 4.2 + 4) < 0.5 ? -1 : 1;
      const s2 = ruis(i * 6.6 + 5) < 0.5 ? -1 : 1;
      pts.push({ x: a.x, y: a.y });
      pts.push({ x: a.x + dx * t1, y: lerp(a.y, b.y, t1) + amp1 * s1 });
      pts.push({ x: a.x + dx * t2, y: lerp(a.y, b.y, t2) + amp2 * s2 });
    }
    pts.push({ x: wp[wp.length - 1].x, y: wp[wp.length - 1].y });
    return pts;
  });

  /** Een vloeiend pad door alle punten (Catmull-Rom → Bézier). */
  readonly pad = computed(() => {
    const p = this.padPunten();
    if (p.length < 2) return '';
    let d = `M ${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] ?? p[i];
      const p1 = p[i];
      const p2 = p[i + 1];
      const p3 = p[i + 2] ?? p2;
      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  });

  /** "Etappe 02 / 05" als er een actieve etappe is, anders het overzicht. */
  readonly teller = computed(() => {
    const n = this.stops().length;
    const a = this.actief();
    return a >= 0 && a < n
      ? `Etappe ${this.nr(a)} / ${this.nr(n - 1)}`
      : `Leerpad · ${this.nr(n - 1)} etappes`;
  });

  /** x-positie als percentage van de breedte (voor stippen en labels). */
  pct(x: number): number {
    return (x / this.vbW) * 100;
  }

  kies(i: number, anchor: string | null = null): void {
    this.actief.set(i);
    if (anchor) {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private nr(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}
