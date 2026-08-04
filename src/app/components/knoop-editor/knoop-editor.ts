import { Component, ElementRef, computed, effect, signal, viewChild } from '@angular/core';
import { KruisKeuze, Punt, bouwGeometrie } from '../knoop-viewer/knoop-geometrie';
import { ACHTKNOOP, KNOPEN, Knoop, KnoopLabel, KnoopStap, TouwPatroon } from '../knoop-viewer/knopen-data';
import { bewaarHandle, leesHandle, steuntBestandsopslag } from './bestand-opslag';

const OPSLAG = 'knoop-editor-v1';

/** Losse vorm voor inladen (uit data of localStorage); velden mogen ontbreken. */
interface KnoopInvoer {
  naam: string;
  ondertitel: string;
  beschrijving?: string;
  tag: string;
  kleur?: string;
  kleur2?: string;
  strengen?: 1 | 2;
  patroon?: TouwPatroon;
  vbW: number;
  vbH: number;
  waypoints?: Punt[];
  keuzes?: Record<number, KruisKeuze>;
  staandLabel?: KnoopLabel | null;
  tampLabel?: KnoopLabel | null;
  stappen?: KnoopStap[];
}

/**
 * Visuele knoop-editor: sleep waypoints, voeg punten toe (klik op de lijn),
 * klik kruisingen voor over/onder, en exporteer de knoop-data om in
 * knopen-data.ts te plakken. Werk wordt bewaard in localStorage.
 */
@Component({
  selector: 'app-knoop-editor',
  host: { class: 'thema-kennis' },
  imports: [],
  templateUrl: './knoop-editor.html',
  styleUrl: './knoop-editor.scss',
})
export class KnoopEditor {
  private readonly svgRef = viewChild.required<ElementRef<SVGSVGElement>>('svg');

  // ── Knoop-staat ──
  readonly naam = signal('Achtknoop');
  readonly ondertitel = signal('Figure-eight · stopperknoop');
  readonly beschrijving = signal('');
  readonly tag = signal('Basis');
  readonly kleur = signal('#2f9ec3');
  readonly kleur2 = signal('#ffd96a');
  readonly strengen = signal<1 | 2>(1);
  readonly patroon = signal<TouwPatroon>('dunne-strepen');
  readonly vbW = signal(300);
  readonly vbH = signal(480);
  readonly waypoints = signal<Punt[]>([]);
  readonly keuzes = signal<Record<number, KruisKeuze>>({});
  readonly staandLabel = signal<KnoopLabel | null>(null);
  readonly tampLabel = signal<KnoopLabel | null>(null);
  readonly stappen = signal<KnoopStap[]>([]);

  // ── Editor-staat ──
  readonly geselecteerd = signal<number | null>(null);
  readonly voortgang = signal(1);
  readonly toonExport = signal(false);
  readonly knopenLijst = KNOPEN;

  // ── Bestand-opslag (File System Access) ──
  readonly kanOpslaan = steuntBestandsopslag();
  readonly bestandNaam = signal<string | null>(null);
  readonly opgeslagenOp = signal<string | null>(null);
  readonly opslaanBezig = signal(false);
  private handle: FileSystemFileHandle | null = null;

  private sleepWp: number | null = null;
  private sleepLabel: 'staand' | 'tamp' | null = null;

  readonly geometrie = computed(() => bouwGeometrie(this.waypoints(), this.keuzes()));

  constructor() {
    const bewaard = this.lees();
    if (bewaard) this.zetVanuit(bewaard);
    else this.laad(ACHTKNOOP);

    // eerder gekoppeld bestand terughalen
    void leesHandle().then((h) => {
      if (h) {
        this.handle = h;
        this.bestandNaam.set(h.name);
      }
    });

    // automatisch bewaren
    effect(() => {
      const data = this.huidig();
      try {
        localStorage.setItem(OPSLAG, JSON.stringify(data));
      } catch {
        /* opslag vol/uit — negeren */
      }
    });
  }

  // ── Coördinaten ──
  private naarSvg(ev: PointerEvent): Punt {
    const svg = this.svgRef().nativeElement;
    const ctm = svg.getScreenCTM();
    if (!ctm) return [0, 0];
    const pt = svg.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    const p = pt.matrixTransform(ctm.inverse());
    return [Math.round(p.x), Math.round(p.y)];
  }

  // ── Slepen ──
  private vangPointer(ev: PointerEvent): void {
    try {
      this.svgRef().nativeElement.setPointerCapture(ev.pointerId);
    } catch {
      /* capture mislukt — slepen werkt nog zolang de cursor op het vlak blijft */
    }
  }

  onWpDown(i: number, ev: PointerEvent): void {
    ev.stopPropagation();
    this.geselecteerd.set(i);
    this.sleepWp = i;
    this.vangPointer(ev);
  }

  onLabelDown(which: 'staand' | 'tamp', ev: PointerEvent): void {
    ev.stopPropagation();
    this.sleepLabel = which;
    this.vangPointer(ev);
  }

  onAchtergrondDown(ev: PointerEvent): void {
    const p = this.naarSvg(ev);
    const idx = this.invoegIndex(p);
    const wp = [...this.waypoints()];
    wp.splice(idx, 0, p);
    this.waypoints.set(wp);
    this.geselecteerd.set(idx);
    this.sleepWp = idx;
    this.vangPointer(ev);
  }

  onMove(ev: PointerEvent): void {
    if (this.sleepWp === null && this.sleepLabel === null) return;
    const p = this.naarSvg(ev);
    if (this.sleepWp !== null) {
      const wp = [...this.waypoints()];
      wp[this.sleepWp] = p;
      this.waypoints.set(wp);
    } else if (this.sleepLabel === 'staand') {
      this.staandLabel.update((l) => (l ? { ...l, x: p[0], y: p[1] } : l));
    } else if (this.sleepLabel === 'tamp') {
      this.tampLabel.update((l) => (l ? { ...l, x: p[0], y: p[1] } : l));
    }
  }

  onUp(): void {
    this.sleepWp = null;
    this.sleepLabel = null;
  }

  /** Index waar een nieuw punt het beste tussen past (dichtstbijzijnde segment). */
  private invoegIndex(p: Punt): number {
    const wp = this.waypoints();
    if (wp.length < 2) return wp.length;
    let best = wp.length, bestD = Infinity;
    for (let i = 0; i < wp.length - 1; i++) {
      const d = this.afstandTotSegment(p, wp[i], wp[i + 1]);
      if (d < bestD) {
        bestD = d;
        best = i + 1;
      }
    }
    return best;
  }

  private afstandTotSegment(p: Punt, a: Punt, b: Punt): number {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len2 = dx * dx + dy * dy || 1;
    let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
  }

  verwijderGeselecteerd(): void {
    const i = this.geselecteerd();
    if (i === null || this.waypoints().length <= 2) return;
    this.waypoints.set(this.waypoints().filter((_, k) => k !== i));
    this.geselecteerd.set(null);
  }

  zetLabelTekst(which: 'staand' | 'tamp', tekst: string): void {
    const sig = which === 'staand' ? this.staandLabel : this.tampLabel;
    sig.update((l) => (l ? { ...l, tekst } : { x: 178, y: which === 'staand' ? 36 : 456, tekst }));
  }

  kiesKruising(i: number): void {
    const k = { ...this.keuzes() };
    k[i] = k[i] === 'vroeg-over' ? 'laat-over' : 'vroeg-over';
    this.keuzes.set(k);
  }

  kleurVoorKeuze(keuze: KruisKeuze): string {
    return keuze === 'vroeg-over' ? '#024D4D' : '#CC6024';
  }

  zetStrengen(waarde: string): void {
    this.strengen.set(waarde === '2' ? 2 : 1);
  }

  zetPatroon(waarde: string): void {
    if (
      waarde === 'dunne-strepen' ||
      waarde === 'ruitjes' ||
      waarde === 'gestipt' ||
      waarde === 'dubbele-stippen'
    ) {
      this.patroon.set(waarde);
    }
  }

  // ── Stappen ──
  voegStapToe(): void {
    this.stappen.set([...this.stappen(), { bij: 1, titel: 'Nieuwe stap', tekst: '' }]);
    this.verdeelStappen();
  }
  verwijderStap(i: number): void {
    this.stappen.set(this.stappen().filter((_, k) => k !== i));
  }
  zetStap(i: number, veld: keyof KnoopStap, waarde: string): void {
    const lijst = [...this.stappen()];
    lijst[i] = { ...lijst[i], [veld]: veld === 'bij' ? +waarde : waarde };
    this.stappen.set(lijst);
  }
  /** Verplaats een stap omhoog/omlaag in de volgorde (= het nummer). */
  verplaatsStap(i: number, richting: -1 | 1): void {
    const j = i + richting;
    const lijst = [...this.stappen()];
    if (j < 0 || j >= lijst.length) return;
    [lijst[i], lijst[j]] = [lijst[j], lijst[i]];
    this.stappen.set(lijst);
  }
  /** Verdeel de "verschijnt bij"-momenten gelijkmatig over de animatie. */
  verdeelStappen(): void {
    const lijst = this.stappen();
    const n = lijst.length;
    this.stappen.set(lijst.map((s, i) => ({ ...s, bij: n <= 1 ? 0 : +(i / (n - 1)).toFixed(2) })));
  }

  // ── Laden / opslaan ──
  laadOpNaam(naam: string): void {
    const k = KNOPEN.find((x) => x.naam === naam);
    if (k) this.laad(k);
  }

  private laad(k: Knoop): void {
    this.zetVanuit(structuredClone(k));
  }

  private zetVanuit(k: KnoopInvoer): void {
    this.naam.set(k.naam);
    this.ondertitel.set(k.ondertitel);
    this.beschrijving.set(k.beschrijving ?? '');
    this.tag.set(k.tag);
    this.kleur.set(k.kleur ?? '#2f9ec3');
    this.kleur2.set(k.kleur2 ?? '#ffd96a');
    this.strengen.set(k.strengen ?? 1);
    this.patroon.set(k.patroon ?? 'dunne-strepen');
    this.vbW.set(k.vbW);
    this.vbH.set(k.vbH);
    this.waypoints.set(k.waypoints ?? []);
    this.keuzes.set(k.keuzes ?? {});
    this.staandLabel.set(k.staandLabel ?? null);
    this.tampLabel.set(k.tampLabel ?? null);
    this.stappen.set(k.stappen ?? []);
    this.geselecteerd.set(null);
  }

  herstelStandaard(): void {
    this.laad(ACHTKNOOP);
  }

  /** Begin een nieuwe knoop (achtknoop-vorm als startpunt om te kneden). */
  nieuweKnoop(): void {
    this.zetVanuit({
      naam: 'Nieuwe knoop',
      ondertitel: '',
      beschrijving: '',
      tag: 'Nieuw',
      kleur: '#2f9ec3',
      kleur2: '#ffd96a',
      strengen: 1,
      patroon: 'dunne-strepen',
      vbW: 300,
      vbH: 480,
      waypoints: structuredClone(ACHTKNOOP.waypoints),
      keuzes: {},
      staandLabel: null,
      tampLabel: null,
      stappen: [],
    });
  }

  private lees(): KnoopInvoer | null {
    try {
      const s = localStorage.getItem(OPSLAG);
      return s ? (JSON.parse(s) as KnoopInvoer) : null;
    } catch {
      return null;
    }
  }

  /** Volledige knoop als plain object. */
  huidig() {
    return {
      naam: this.naam(),
      ondertitel: this.ondertitel(),
      beschrijving: this.beschrijving(),
      tag: this.tag(),
      kleur: this.kleur(),
      kleur2: this.kleur2(),
      strengen: this.strengen(),
      patroon: this.patroon(),
      vbW: this.vbW(),
      vbH: this.vbH(),
      waypoints: this.waypoints(),
      keuzes: this.keuzes(),
      staandLabel: this.staandLabel(),
      tampLabel: this.tampLabel(),
      stappen: this.stappen(),
    };
  }

  // ── Opslaan in knopen.json (File System Access) ──
  async verbindBestand(): Promise<void> {
    const picker = (window as unknown as {
      showOpenFilePicker?: (o: unknown) => Promise<FileSystemFileHandle[]>;
    }).showOpenFilePicker;
    if (!picker) return;
    try {
      const [handle] = await picker({
        multiple: false,
        types: [{ description: 'Knopen JSON', accept: { 'application/json': ['.json'] } }],
      });
      this.handle = handle;
      this.bestandNaam.set(handle.name);
      await bewaarHandle(handle);
    } catch {
      /* gebruiker annuleerde de kiezer */
    }
  }

  async opslaan(): Promise<void> {
    if (!this.handle) {
      await this.verbindBestand();
      if (!this.handle) return;
    }
    this.opslaanBezig.set(true);
    try {
      const h = this.handle as unknown as {
        queryPermission?: (o: unknown) => Promise<string>;
        requestPermission?: (o: unknown) => Promise<string>;
        createWritable: () => Promise<{ write: (d: string) => Promise<void>; close: () => Promise<void> }>;
      };
      const opt = { mode: 'readwrite' };
      if (h.queryPermission && (await h.queryPermission(opt)) !== 'granted') {
        if (h.requestPermission && (await h.requestPermission(opt)) !== 'granted') return;
      }
      const knoop = this.huidig() as unknown as Knoop;
      const lijst = KNOPEN.map((k) => k);
      const idx = lijst.findIndex((k) => k.naam === knoop.naam);
      if (idx >= 0) lijst[idx] = knoop;
      else lijst.push(knoop);

      const w = await h.createWritable();
      await w.write(JSON.stringify(lijst, null, 2) + '\n');
      await w.close();
      this.opgeslagenOp.set(new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' }));
    } catch {
      /* schrijven mislukt of geweigerd */
    } finally {
      this.opslaanBezig.set(false);
    }
  }

  /** Geldige JSON van de huidige knoop (zelfde als wat 'Opslaan' wegschrijft). */
  readonly exportTekst = computed(() => JSON.stringify(this.huidig(), null, 2));

  async kopieer(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.exportTekst());
    } catch {
      /* clipboard geweigerd — gebruiker kan handmatig selecteren */
    }
  }
}
