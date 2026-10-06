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
  readonly tab = signal<Tab>('materiaal');

  readonly openItem = signal<string | null>('touw');

  readonly springActief = signal(false);

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

  onToggle(id: string, opened: boolean): void {
    if (opened) this.openItem.set(id);
    else if (this.openItem() === id) this.openItem.set(null);
  }

  springNaarItem(id: string, event: Event): void {
    event.preventDefault();
    this.openItem.set(id);
    this.scrollNaId(id);
  }

  private scrollNaId(id: string): void {
    this.springActief.set(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => this.springActief.set(false), 600);
      });
    });
  }

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
