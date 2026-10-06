import {
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { KeuzeOptie, Keuzelijst } from '../../../components/keuzelijst/keuzelijst';
import {
  ALLE_GEAR,
  DISCIPLINE_NAAM,
  ERVARING,
  NIVEAUS,
  TRIPS,
  Trip,
  TripFilter,
  gearOpties,
} from './trips';

@Component({
  selector: 'app-kennis-events',
  host: { class: 'thema-kennis' },
  imports: [RouterLink, Keuzelijst],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class KennisEvents {
  readonly disciplineNaam = DISCIPLINE_NAAM;

  constructor() {
    const route = inject(ActivatedRoute);
    afterNextRender(() => {
      const id = route.snapshot.queryParamMap.get('trip');
      const t = this.trips().find((x) => x.id === id);
      if (t) this.openTrip(t);
    });
  }

  readonly filters: { id: TripFilter; naam: string }[] = [
    { id: 'alles', naam: 'Alles' },
    { id: 'boulderen', naam: 'Boulderen' },
    { id: 'sport', naam: 'Sport' },
    { id: 'hike', naam: 'Wildline' },
    { id: 'beginners', naam: 'Beginnersvriendelijk' },
  ];
  readonly sorteerOpties: KeuzeOptie[] = [
    { waarde: 'datum', label: 'Datum — eerst' },
    { waarde: 'plekken', label: 'Meeste plekken vrij' },
    { waarde: 'prijs', label: 'Prijs — laag naar hoog' },
  ];
  readonly ervaringOpties = ERVARING;

  readonly trips = signal<Trip[]>(TRIPS);
  readonly filter = signal<TripFilter>('alles');
  readonly sortering = signal<string[]>(['datum']);

  readonly zichtbaar = computed(() => {
    const f = this.filter();
    const lijst = this.trips().filter((t) =>
      f === 'alles' ? true : f === 'beginners' ? t.beginnersvriendelijk : t.discipline === f,
    );
    const s = this.sortering()[0];
    return [...lijst].sort((a, b) => {
      if (s === 'plekken') return this.over(b) - this.over(a) || a.start.localeCompare(b.start);
      if (s === 'prijs') return a.prijs - b.prijs;
      return a.start.localeCompare(b.start);
    });
  });

  readonly aantalOpen = computed(() => this.trips().filter((t) => this.over(t) > 0).length);

  private readonly dialoog = viewChild<ElementRef<HTMLDialogElement>>('dialoog');
  readonly openId = signal<string | null>(null);
  readonly open = computed(() => this.trips().find((t) => t.id === this.openId()) ?? null);
  readonly verstuurd = signal(false);

  readonly opWachtlijst = signal(false);
  readonly niveau = signal(1);
  readonly ervaring = signal<string[]>(['paar']);
  readonly meenemen = signal<string[]>([]);

  readonly niveaus = computed(() => NIVEAUS[this.open()?.discipline ?? 'sport']);
  readonly gear = computed(() => {
    const t = this.open();
    return t ? gearOpties(t) : [];
  });

  readonly meenemenTekst = computed(() =>
    this.gear()
      .filter((o) => o.waarde !== ALLE_GEAR && this.meenemen().includes(o.waarde))
      .map((o) => o.label.toLowerCase())
      .join(', '),
  );

  over(t: Trip): number {
    return Math.max(0, t.plekken - t.bezet);
  }
  vol(t: Trip): boolean {
    return this.over(t) === 0;
  }

  bezetting(t: Trip): number {
    return Math.round((t.bezet / t.plekken) * 100);
  }

  zetMeenemen(nieuw: string[]): void {
    const klim = this.gear().filter(
      (o) => o.groep === this.gear()[0]?.groep && o.waarde !== ALLE_GEAR,
    );
    const had = this.meenemen().includes(ALLE_GEAR);
    const heeft = nieuw.includes(ALLE_GEAR);
    let volgende = nieuw;
    if (heeft && !had) {
      volgende = [...new Set([...nieuw, ...klim.map((o) => o.waarde)])];
    } else if (!heeft && had) {
      volgende = nieuw.filter((w) => !klim.some((o) => o.waarde === w));
    } else if (heeft && klim.some((o) => !nieuw.includes(o.waarde))) {
      volgende = nieuw.filter((w) => w !== ALLE_GEAR);
    } else if (!heeft && klim.length && klim.every((o) => nieuw.includes(o.waarde))) {
      volgende = [...nieuw, ALLE_GEAR];
    }
    this.meenemen.set(volgende);
  }

  openTrip(t: Trip): void {
    this.openId.set(t.id);
    this.verstuurd.set(false);
    this.niveau.set(1);
    this.ervaring.set(['paar']);
    this.meenemen.set([]);
    this.dialoog()?.nativeElement.showModal();
  }

  sluit(): void {
    this.dialoog()?.nativeElement.close();
  }

  backdropKlik(event: MouseEvent): void {
    if (event.target === this.dialoog()?.nativeElement) this.sluit();
  }

  inschrijven(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.reportValidity()) return;
    const t = this.open();
    if (!t) return;
    this.opWachtlijst.set(this.vol(t));
    if (!this.vol(t)) {
      this.trips.update((lijst) =>
        lijst.map((x) => (x.id === t.id ? { ...x, bezet: x.bezet + 1 } : x)),
      );
    }
    form.reset();
    this.verstuurd.set(true);
  }

  inAgenda(t: Trip): void {
    const dag = (d: string) => d.replaceAll('-', '');

    const eind = new Date(t.eind + 'T00:00:00Z');
    eind.setUTCDate(eind.getUTCDate() + 1);
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wildline//Events//NL',
      'BEGIN:VEVENT',
      `UID:${t.id}@wildline`,
      `DTSTART;VALUE=DATE:${dag(t.start)}`,
      `DTEND;VALUE=DATE:${dag(eind.toISOString().slice(0, 10))}`,
      `SUMMARY:${t.titel}`,
      `DESCRIPTION:Verzamelen ${t.verzamelen}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${t.id}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
