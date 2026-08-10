import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hoofdstuk, HoofdstukNav } from '../../components/hoofdstuk-nav/hoofdstuk-nav';

@Component({
  selector: 'app-klimmen-page',
  host: { class: 'thema-klimmen' },
  imports: [RouterLink, HoofdstukNav],
  templateUrl: './klimmen-page.html',
  styleUrl: './klimmen-page.scss',
})
export class KlimmenPage implements AfterViewInit, OnDestroy {
  /** Overzicht van de klim-subpagina's: gebruikt in de meescrollende balk én de chips onder de hero. */
  readonly hoofdstukken: Hoofdstuk[] = [
    { naam: 'Single pitch', kort: 'Single pitch', anchor: 'single-pitch', link: '/klimmen/single-pitch' },
    { naam: 'Multipitch', kort: 'Multipitch', anchor: 'multi-pitch', link: '/klimmen/multi-pitch' },
    { naam: 'Materiaal', kort: 'Materiaal', anchor: 'materiaal', link: '/klimmen/materiaal' },
    { naam: 'Klimgebieden', kort: 'Klimgebieden', anchor: 'klimgebieden', link: '/klimmen/klimgebieden' },
    { naam: "Touwcommando's", kort: "Commando's", anchor: 'commandos', link: '/kennis/technieken' },
    { naam: 'Knopen', kort: 'Knopen', anchor: 'knopen', link: '/kennis/knopen' },
  ];

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

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { capture: true, passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });
    this.onScroll();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll, { capture: true });
    window.removeEventListener('resize', this.onScroll);
  }
}
