import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

type Tab = 'materiaal' | 'voorbereiding';

const MATERIAAL_IDS = [
  'touw',
  'gordel',
  'helm',
  'zekeringsapparaat',
  'karabiners',
  'quickdraws',
  'slings',
  'prusiktouwtjes',
  'klimschoenen',
  'magnesium',
  'overig',
];

const VOORBEREIDING_IDS = [
  'topo',
  'weer',
  'toegang',
  'inpakken',
  'touw-uitleggen',
  'partnercheck',
  'verkennen',
  'spotten',
  'opwarmen',
];

@Component({
  selector: 'app-klimmen-materiaal',
  host: { class: 'thema-klimmen' },
  imports: [RouterLink],
  templateUrl: './materiaal.html',
  styleUrl: './materiaal.scss',
})
export class KlimmenMateriaal implements AfterViewInit, OnDestroy {
  /** Actieve tab: materiaal (11 items) of voorbereiding (9 stappen). */
  readonly tab = signal<Tab>('materiaal');

  /** Id van het materiaal-item dat momenteel uitgeklapt is — steeds maximaal één tegelijk. Touw staat standaard open. */
  readonly openItem = signal<string | null>('touw');

  /** Kort actief tijdens een programmatische sprong: schakelt de open/dicht-animatie uit,
   *  zodat scrollIntoView een stabiele (al voltooide) lay-out target heeft. */
  readonly springActief = signal(false);

  /** Toont de vaste balk zodra de hero voorbij gescrold is. */
  readonly navZichtbaar = signal(false);

  private readonly sentinel = viewChild<ElementRef<HTMLElement>>('sentinel');
  private ticking = false;

  private readonly onScroll = (): void => {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      const el = this.sentinel()?.nativeElement;
      if (!el) return;
      const zichtbaar = el.getBoundingClientRect().bottom <= 0;
      if (zichtbaar !== this.navZichtbaar()) {
        this.zone.run(() => this.navZichtbaar.set(zichtbaar));
      }
    });
  };

  constructor(
    private readonly zone: NgZone,
    private readonly route: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { capture: true, passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });
    this.onScroll();

    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      this.zone.run(() => this.gaNaarFragment(fragment));
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll, { capture: true });
    window.removeEventListener('resize', this.onScroll);
  }

  setTab(tab: Tab, event?: Event): void {
    event?.preventDefault();
    this.tab.set(tab);
  }

  isOpen(id: string): boolean {
    return this.openItem() === id;
  }

  /** Houdt de open-state bij (native toggle-event) — openen van één item sluit het vorige automatisch. */
  onToggle(id: string, opened: boolean): void {
    if (opened) this.openItem.set(id);
    else if (this.openItem() === id) this.openItem.set(null);
  }

  /** Klik op een chip: item openklappen (sluit het vorige) en er zacht naartoe scrollen. */
  springNaarItem(id: string, event: Event): void {
    event.preventDefault();
    this.openItem.set(id);
    this.scrollNaId(id);
  }

  /** Schakelt de open/dicht-transitie heel even uit zodat het vorige item (dat dichtklapt) en het
   *  nieuwe item (dat openklapt) meteen hun definitieve hoogte hebben — anders rekent scrollIntoView
   *  zich lek op de nog lopende animatie en land je te vroeg. De transitie blijft uit tot de
   *  scroll-animatie zelf ook klaar is: zet je 'm eerder terug aan, dan telt de browser de
   *  layout-wijziging als een interventie en breekt de lopende smooth scroll voortijdig af. */
  private scrollNaId(id: string): void {
    this.springActief.set(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => this.springActief.set(false), 600);
      });
    });
  }

  /** Zet de juiste tab (en klapt het item open, indien van toepassing) op basis van een binnenkomend anker. */
  private gaNaarFragment(id: string): void {
    if (VOORBEREIDING_IDS.includes(id)) {
      this.tab.set('voorbereiding');
    } else if (MATERIAAL_IDS.includes(id)) {
      this.tab.set('materiaal');
      this.openItem.set(id);
    }
    this.scrollNaId(id);
  }
}
