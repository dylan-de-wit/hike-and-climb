import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Hoofdstuk, HoofdstukNav } from '../../../components/hoofdstuk-nav/hoofdstuk-nav';

@Component({
  selector: 'app-single-pitch',
  host: { class: 'thema-klimmen' },
  imports: [RouterLink, HoofdstukNav],
  templateUrl: './single-pitch.html',
  styleUrl: './single-pitch.scss',
})
export class SinglePitch implements AfterViewInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly vorigeTitel = this.title.getTitle();
  private readonly routeData = toSignal(this.route.data, {
    initialValue: this.route.snapshot.data,
  });

  readonly paginaNaam = computed(() => this.routeData()['paginaNaam'] ?? 'Single pitch');

  readonly hoofdstukken: Hoofdstuk[] = [
    { naam: 'Standplaats maken', kort: 'Standplaats', anchor: 'standplaats' },
    { naam: 'Ombouwen en laten zakken', kort: 'Ombouwen', anchor: 'ombouwen' },
    { naam: 'Bijzondere situaties', kort: 'Bijzonder', anchor: 'bijzonder' },
    { naam: "Touwcommando's", kort: "Commando's", anchor: 'commandos' },
  ];

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

  constructor(private readonly zone: NgZone) {
    this.title.setTitle('Standplaats maken en ombouwen bij single pitch | Wildline');
    this.meta.updateTag({
      name: 'description',
      content:
        'Ombouwen bij single pitch: zo maak je een standplaats, kies je een ombouwmethode en daal je af bij een scherpe of enkele haak.',
    });
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

  scrollNaar(anchor: string, event: Event): void {
    event.preventDefault();
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
