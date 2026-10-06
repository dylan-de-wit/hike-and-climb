import { Component, computed, effect, signal } from '@angular/core';
import { FAMILIE_VOLGORDE, GEBRUIK_VOLGORDE, KNOPEN, Knoop, KnoopFamilie } from './knopen-data';

type Sortering = 'standaard' | 'moeilijkheid';

const OPGESLAGEN_KEY = 'knopen-opgeslagen-v1';

@Component({
  selector: 'app-kennis-knopen',
  host: { class: 'thema-kennis' },
  templateUrl: './knopen.html',
  styleUrl: './knopen.scss',
})
export class KennisKnopen {
  readonly knopen = KNOPEN;
  readonly difficultyReeks = [1, 2, 3, 4, 5] as const;

  readonly gebruikOpties = GEBRUIK_VOLGORDE.filter((g) =>
    KNOPEN.some((k) => k.gebruik.includes(g)),
  );
  readonly familieOpties: KnoopFamilie[] = FAMILIE_VOLGORDE.filter((f) =>
    KNOPEN.some((k) => k.familie === f),
  );

  readonly zoekterm = signal('');
  readonly actieveGebruik = signal<ReadonlySet<string>>(new Set());
  readonly actieveFamilies = signal<ReadonlySet<KnoopFamilie>>(new Set());
  readonly actieveMoeilijkheden = signal<ReadonlySet<number>>(new Set());
  readonly alleenOpgeslagen = signal(false);
  readonly sortering = signal<Sortering>('standaard');
  readonly uitgeklapt = signal<string | null>(null);
  readonly actieveSlides = signal<Record<string, number>>({});

  readonly opgeslagen = signal<ReadonlySet<string>>(this.laadOpgeslagen());

  readonly weergave = computed<Knoop[]>(() => {
    const term = this.zoekterm().trim().toLowerCase();
    const gebruik = this.actieveGebruik();
    const families = this.actieveFamilies();
    const moeilijkheden = this.actieveMoeilijkheden();
    const opgeslagen = this.opgeslagen();
    const alleenOpgeslagen = this.alleenOpgeslagen();

    let lijst = this.knopen.filter((knoop) => {
      if (alleenOpgeslagen && !opgeslagen.has(knoop.slug)) return false;
      if (gebruik.size > 0 && !knoop.gebruik.some((g) => gebruik.has(g))) return false;
      if (families.size > 0 && !families.has(knoop.familie)) return false;
      if (moeilijkheden.size > 0 && !moeilijkheden.has(knoop.moeilijkheid)) return false;
      if (term && !this.doorzoekbareTekst(knoop).includes(term)) return false;
      return true;
    });

    if (this.sortering() === 'moeilijkheid') {
      lijst = [...lijst].sort((a, b) => a.moeilijkheid - b.moeilijkheid);
    }
    return lijst;
  });

  constructor() {
    effect(() => {
      const slugs = Array.from(this.opgeslagen());
      try {
        localStorage.setItem(OPGESLAGEN_KEY, JSON.stringify(slugs));
      } catch {}
    });
  }

  vindKnoop(slug: string): Knoop | undefined {
    return this.knopen.find((k) => k.slug === slug);
  }

  isUitgeklapt(slug: string): boolean {
    return this.uitgeklapt() === slug;
  }

  toggleUitgeklapt(slug: string): void {
    this.uitgeklapt.set(this.isUitgeklapt(slug) ? null : slug);
  }

  isOpgeslagen(slug: string): boolean {
    return this.opgeslagen().has(slug);
  }

  toggleOpgeslagen(slug: string, event: Event): void {
    event.stopPropagation();
    const volgende = new Set(this.opgeslagen());
    if (volgende.has(slug)) volgende.delete(slug);
    else volgende.add(slug);
    this.opgeslagen.set(volgende);
  }

  toggleGebruik(waarde: string): void {
    this.actieveGebruik.set(this.getoggeld(this.actieveGebruik(), waarde));
  }

  toggleFamilie(waarde: KnoopFamilie): void {
    this.actieveFamilies.set(this.getoggeld(this.actieveFamilies(), waarde));
  }

  toggleMoeilijkheid(waarde: number): void {
    this.actieveMoeilijkheden.set(this.getoggeld(this.actieveMoeilijkheden(), waarde));
  }

  toggleAlleenOpgeslagen(): void {
    this.alleenOpgeslagen.set(!this.alleenOpgeslagen());
  }

  wisFilters(): void {
    this.zoekterm.set('');
    this.actieveGebruik.set(new Set());
    this.actieveFamilies.set(new Set());
    this.actieveMoeilijkheden.set(new Set());
    this.alleenOpgeslagen.set(false);
  }

  wisselSortering(): void {
    this.sortering.set(this.sortering() === 'standaard' ? 'moeilijkheid' : 'standaard');
  }

  springNaarKnoop(slug: string): void {
    this.wisFilters();
    this.uitgeklapt.set(slug);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById(`knoop-${slug}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  afkorting(knoop: Knoop): string {
    return knoop.naam
      .split(/\s+/)
      .map((deel) => deel[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  stappen(knoop: Knoop): number[] {
    return Array.from({ length: this.aantalSlides(knoop) }, (_, index) => index);
  }

  aantalSlides(knoop: Knoop): number {
    return Math.max(knoop.fotos?.length ?? 0, 4);
  }

  actieveSlide(knoop: Knoop): number {
    const slide = this.actieveSlides()[knoop.slug] ?? 0;
    return Math.min(Math.max(slide, 0), this.aantalSlides(knoop) - 1);
  }

  zetSlide(knoop: Knoop, slide: number): void {
    this.actieveSlides.update((huidig) => ({
      ...huidig,
      [knoop.slug]: Math.min(Math.max(slide, 0), this.aantalSlides(knoop) - 1),
    }));
  }

  verschuifSlide(knoop: Knoop, richting: -1 | 1): void {
    const aantal = this.aantalSlides(knoop);
    const volgende = (this.actieveSlide(knoop) + richting + aantal) % aantal;
    this.zetSlide(knoop, volgende);
  }

  slideTitel(knoop: Knoop): string {
    const nummer = this.actieveSlide(knoop) + 1;
    return `${nummer.toString().padStart(2, '0')} / ${nummer === 1 ? 'Het begin' : `Stap ${nummer}`}`;
  }

  private doorzoekbareTekst(knoop: Knoop): string {
    return [
      knoop.naam,
      knoop.samenvatting,
      knoop.familie,
      ...knoop.engelseNaam,
      knoop.typeKnoop,
      knoop.gebruikBij,
      ...knoop.gebruik,
      ...knoop.toepassingen,
    ]
      .join(' ')
      .toLowerCase();
  }

  private getoggeld<T>(huidig: ReadonlySet<T>, waarde: T): Set<T> {
    const volgende = new Set(huidig);
    if (volgende.has(waarde)) volgende.delete(waarde);
    else volgende.add(waarde);
    return volgende;
  }

  private laadOpgeslagen(): Set<string> {
    try {
      const ruw = localStorage.getItem(OPGESLAGEN_KEY);
      return ruw ? new Set(JSON.parse(ruw)) : new Set();
    } catch {
      return new Set();
    }
  }
}
