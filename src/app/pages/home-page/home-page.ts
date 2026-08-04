import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, viewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements AfterViewInit, OnDestroy {
  private readonly scrollFades = viewChildren<ElementRef<HTMLElement>>('scrollFade');
  private pending: HTMLElement[] = [];
  private ticking = false;
  private readonly onScroll = () => this.requestCheck();

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.pending = this.scrollFades().map((el) => el.nativeElement);

    // Geen animatie gewenst → meteen tonen.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.pending.forEach((el) => el.classList.add('is-visible'));
      this.pending = [];
      return;
    }

    // Reveal pas zodra er gescrold wordt — ook voor elementen die al in beeld staan.
    // Capture-fase vangt scroll van welke scroll-container dan ook.
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
