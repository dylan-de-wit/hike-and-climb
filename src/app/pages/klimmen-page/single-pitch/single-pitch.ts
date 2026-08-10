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
import { Hoofdstuk, HoofdstukNav } from '../../../components/hoofdstuk-nav/hoofdstuk-nav';

@Component({
  selector: 'app-single-pitch',
  host: { class: 'thema-klimmen' },
  imports: [RouterLink, HoofdstukNav],
  templateUrl: './single-pitch.html',
  styleUrl: './single-pitch.scss',
})
export class SinglePitch implements AfterViewInit, OnDestroy {
  /** Hoofdstukken van de pagina: gebruikt in de balk onder de hero én in de meescrollende balk. */
  readonly hoofdstukken: Hoofdstuk[] = [
    { naam: 'Standplaats maken', kort: 'Standplaats', anchor: 'standplaats' },
    { naam: 'Ombouwen naar toprope', kort: 'Ombouwen', anchor: 'ombouwen' },
    { naam: 'Bijzondere situaties', kort: 'Bijzonder', anchor: 'bijzonder' },
    { naam: "Touwcommando's", kort: "Commando's", anchor: 'commandos' },
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

  /** Zachte scroll naar een sectie-anker. */
  scrollNaar(anchor: string, event: Event): void {
    event.preventDefault();
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
