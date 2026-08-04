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

interface NavLink {
  label: string;
  anchor: string;
}

@Component({
  selector: 'app-single-pitch',
  host: { class: 'thema-klimmen' },
  imports: [RouterLink],
  templateUrl: './single-pitch.html',
  styleUrl: './single-pitch.scss',
})
export class SinglePitch implements AfterViewInit, OnDestroy {
  /** Ankers voor de meescrollende balk. */
  readonly navLinks: NavLink[] = [
    { label: 'Standplaats', anchor: 'standplaats' },
    { label: 'Ombouwen', anchor: 'ombouwen' },
    { label: 'Bijzonder', anchor: 'bijzonder' },
    { label: "Commando's", anchor: 'commandos' },
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
