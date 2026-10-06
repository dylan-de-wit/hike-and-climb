import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  viewChildren,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DISCIPLINE_NAAM, TRIPS } from '../kennis-page/events/trips';

const MAANDEN = [
  'jan',
  'feb',
  'mrt',
  'apr',
  'mei',
  'jun',
  'jul',
  'aug',
  'sep',
  'okt',
  'nov',
  'dec',
];

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements AfterViewInit, OnDestroy {
  readonly disciplineNaam = DISCIPLINE_NAAM;

  private readonly vandaag = new Date().toLocaleDateString('sv-SE');
  readonly komendeTrips = TRIPS.filter((t) => t.start >= this.vandaag);
  readonly volgendeTrips = this.komendeTrips
    .filter((t) => t.bezet < t.plekken)
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 3)
    .map((t) => {
      const [, maand, dag] = t.start.split('-').map(Number);
      return { ...t, dag, maand: MAANDEN[maand - 1], over: t.plekken - t.bezet };
    });

  private readonly scrollFades = viewChildren<ElementRef<HTMLElement>>('scrollFade');
  private pending: HTMLElement[] = [];
  private ticking = false;
  private readonly onScroll = () => this.requestCheck();

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.pending = this.scrollFades().map((el) => el.nativeElement);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.pending.forEach((el) => el.classList.add('is-visible'));
      this.pending = [];
      return;
    }

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { capture: true, passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });
  }

  private requestCheck(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      this.reveal();
    });
  }

  private reveal(): void {
    const triggerLine = window.innerHeight * 0.85;
    this.pending = this.pending.filter((el) => {
      if (el.getBoundingClientRect().top < triggerLine) {
        el.classList.add('is-visible');
        return false;
      }
      return true;
    });
    if (this.pending.length === 0) {
      this.teardown();
    }
  }

  private teardown(): void {
    window.removeEventListener('scroll', this.onScroll, { capture: true });
    window.removeEventListener('resize', this.onScroll);
  }

  ngOnDestroy(): void {
    this.teardown();
  }
}
