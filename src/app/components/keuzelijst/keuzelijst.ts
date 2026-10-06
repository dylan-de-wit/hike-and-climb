import { Component, ElementRef, computed, inject, input, model, signal } from '@angular/core';

export interface KeuzeOptie {
  waarde: string;
  label: string;

  groep?: string;
}

let volgnummer = 0;

@Component({
  selector: 'app-keuzelijst',
  templateUrl: './keuzelijst.html',
  styleUrl: './keuzelijst.scss',
  host: {
    '[class.keuzelijst--warm]': "variant() === 'warm'",
    '[class.keuzelijst--open]': 'open()',
    '(document:pointerdown)': 'buitenKlik($event)',
  },
})
export class Keuzelijst {
  readonly opties = input.required<KeuzeOptie[]>();
  readonly gekozen = model<string[]>([]);
  readonly meervoud = input(false);
  readonly variant = input<'rustig' | 'warm'>('rustig');
  readonly placeholder = input('Kies…');

  readonly ariaLabel = input<string | null>(null);
  readonly labelId = input<string | null>(null);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly id = `keuzelijst-${++volgnummer}`;
  readonly open = signal(false);

  readonly actief = signal(0);

  readonly weergave = computed(() => {
    const labels = this.opties()
      .filter((o) => this.gekozen().includes(o.waarde))
      .map((o) => o.label);
    return labels.length ? labels.join(', ') : '';
  });

  isGekozen(o: KeuzeOptie): boolean {
    return this.gekozen().includes(o.waarde);
  }

  nieuweGroep(i: number): string | null {
    const g = this.opties()[i].groep;
    return g && g !== this.opties()[i - 1]?.groep ? g : null;
  }

  wissel(): void {
    this.open() ? this.sluit(false) : this.openLijst();
  }

  private openLijst(): void {
    const eerste = this.opties().findIndex((o) => this.isGekozen(o));
    this.actief.set(Math.max(0, eerste));
    this.open.set(true);
    queueMicrotask(() => this.scrollNaarActief());
  }

  private sluit(focusTrigger = true): void {
    this.open.set(false);
    if (focusTrigger)
      this.host.nativeElement.querySelector<HTMLElement>('.keuzelijst__trigger')?.focus();
  }

  kies(o: KeuzeOptie): void {
    if (this.meervoud()) {
      this.gekozen.update((g) =>
        g.includes(o.waarde) ? g.filter((w) => w !== o.waarde) : [...g, o.waarde],
      );
    } else {
      this.gekozen.set([o.waarde]);
      this.sluit();
    }
  }

  toets(event: KeyboardEvent): void {
    const n = this.opties().length;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        if (!this.open()) return this.openLijst();
        const stap = event.key === 'ArrowDown' ? 1 : -1;
        this.actief.update((i) => (i + stap + n) % n);
        this.scrollNaarActief();
        return;
      }
      case 'Home':
      case 'End':
        if (!this.open()) return;
        event.preventDefault();
        this.actief.set(event.key === 'Home' ? 0 : n - 1);
        this.scrollNaarActief();
        return;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!this.open()) return this.openLijst();
        this.kies(this.opties()[this.actief()]);
        return;
      case 'Escape':
        if (this.open()) {
          event.preventDefault();
          event.stopPropagation();
          this.sluit();
        }
        return;
      case 'Tab':
        if (this.open()) this.sluit(false);
        return;
    }
  }

  buitenKlik(event: PointerEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.sluit(false);
  }

  private scrollNaarActief(): void {
    this.host.nativeElement
      .querySelector(`#${this.id}-optie-${this.actief()}`)
      ?.scrollIntoView({ block: 'nearest' });
  }
}
