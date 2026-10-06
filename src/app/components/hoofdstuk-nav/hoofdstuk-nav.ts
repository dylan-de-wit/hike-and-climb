import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Hoofdstuk {
  naam: string;

  anchor: string;

  kort?: string;

  link?: string;
}

@Component({
  selector: 'app-hoofdstuk-nav',
  imports: [RouterLink],
  templateUrl: './hoofdstuk-nav.html',
  styleUrl: './hoofdstuk-nav.scss',
})
export class HoofdstukNav {
  readonly hoofdstukken = input<Hoofdstuk[]>([]);

  readonly label = input<string | null>('Op deze pagina');

  nr(i: number): string {
    return String(i + 1).padStart(2, '0');
  }

  scrollNaar(anchor: string, event: Event): void {
    event.preventDefault();
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
