import { Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { bouwGeometrie } from './knoop-geometrie';
import { ACHTKNOOP, Knoop } from './knopen-data';

let volgendMaskerId = 0;

/**
 * Knoop-viewer — toont een knoop als gestileerd SVG-diagram dat je met een
 * schuif (scrubber) stap voor stap ziet ontstaan, met uitleg per stap. Het touw
 * wordt onthuld via stroke-dashoffset; "bruggen" tekenen de over-kruisingen.
 */
@Component({
  selector: 'app-knoop-viewer',
  imports: [],
  templateUrl: './knoop-viewer.html',
  styleUrl: './knoop-viewer.scss',
})
export class KnoopViewer {
  /** De knoop die getoond wordt. Standaard de achtknoop. */
  readonly knoop = input<Knoop>(ACHTKNOOP);

  /** Voortgang van de animatie, 0..1. Start vol, zodat je de knoop meteen ziet. */
  readonly voortgang = signal(1);
  /** Of de animatie automatisch afspeelt. */
  readonly speelt = signal(false);
  readonly maskerId = `knoop-reveal-${++volgendMaskerId}`;

  private timer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stopTimer());
  }

  /** Berekende hartlijn + bruggen uit de waypoints. */
  readonly geometrie = computed(() => bouwGeometrie(this.knoop().waypoints, this.knoop().keuzes ?? {}));

  /** De op dit moment actieve stap (laatste waarvan `bij` <= voortgang). */
  readonly actieveStap = computed(() => {
    const stappen = this.knoop().stappen;
    const v = this.voortgang();
    let idx = 0;
    stappen.forEach((s, i) => {
      if (v + 1e-6 >= s.bij) idx = i;
    });
    return idx;
  });

  zetVoortgang(waarde: string | number): void {
    this.voortgang.set(Math.min(1, Math.max(0, +waarde)));
  }

  naarStap(i: number): void {
    this.pauzeer();
    this.voortgang.set(this.knoop().stappen[i]?.bij ?? 0);
  }

  speelAf(): void {
    if (this.speelt()) {
      this.pauzeer();
      return;
    }
    if (this.voortgang() >= 1) this.voortgang.set(0);
    this.speelt.set(true);
    this.timer = setInterval(() => {
      const next = this.voortgang() + 0.006;
      if (next >= 1) {
        this.voortgang.set(1);
        this.pauzeer();
      } else {
        this.voortgang.set(next);
      }
    }, 16);
  }

  pauzeer(): void {
    this.speelt.set(false);
    this.stopTimer();
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
