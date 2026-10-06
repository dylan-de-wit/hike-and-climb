import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
  readonly hoofdstukken: Hoofdstuk[] = [
    { naam: 'Sportklimmen', anchor: 'sportklimmen' },
    { naam: 'Single pitch', anchor: 'single-pitch' },
    { naam: 'Multipitch', anchor: 'multi-pitch' },
    { naam: 'Materiaal & voorbereiding', kort: 'Materiaal', anchor: 'materiaal' },
    { naam: 'Klimgebieden', anchor: 'klimgebieden' },
    { naam: 'Knopen', anchor: 'knopen' },
  ];

  readonly navZichtbaar = signal(false);

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly vorigeTitel = this.title.getTitle();

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

  constructor(private readonly zone: NgZone) {
    this.title.setTitle('Buiten klimmen: techniek, materiaal en gebieden | Wildline');
    this.meta.updateTag({
      name: 'description',
      content:
        'Lees alles over sportklimmen, single pitch, multipitch, materiaal, knopen en klimgebieden en bereid je goed voor.',
    });
  }

  scrollNaar(anchor: string, event: Event): void {
    event.preventDefault();
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { capture: true, passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
    });
    this.onScroll();
  }

  ngOnDestroy(): void {
    this.title.setTitle(this.vorigeTitel);
    this.meta.removeTag("name='description'");
    window.removeEventListener('scroll', this.onScroll, { capture: true });
    window.removeEventListener('resize', this.onScroll);
  }
}
