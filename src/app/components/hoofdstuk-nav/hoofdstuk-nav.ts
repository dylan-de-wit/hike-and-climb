import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Eén hoofdstuk op de pagina. */
export interface Hoofdstuk {
  /** Volledige naam, zoals hij in de hoofdstuknavigatie staat. */
  naam: string;
  /** Id van de sectie op dezelfde pagina; klik scrollt ernaartoe. */
  anchor: string;
  /** Kortere naam, bv. voor de meescrollende ankerbalk. */
  kort?: string;
  /** Zet als het hoofdstuk naar een andere pagina linkt i.p.v. naar een anker op dezelfde pagina. */
  link?: string;
}

/**
 * Hoofdstuk-nav — horizontale balk met de hoofdstukken van de pagina,
 * bedoeld direct onder een hero. Elk hoofdstuk krijgt een volgnummer en
 * scrollt zacht naar zijn sectie (of navigeert naar `link`, als gezet).
 * Kleuren volgen het thema van de pagina.
 */
@Component({
  selector: 'app-hoofdstuk-nav',
  imports: [RouterLink],
  templateUrl: './hoofdstuk-nav.html',
  styleUrl: './hoofdstuk-nav.scss',
})
export class HoofdstukNav {
  /** De hoofdstukken, in leesvolgorde. */
  readonly hoofdstukken = input<Hoofdstuk[]>([]);
  /** Label links van de rij. Zet op `null` om hem te verbergen. */
  readonly label = input<string | null>('Op deze pagina');

  /** Volgnummer met voorloopnul: 01, 02, … */
  nr(i: number): string {
    return String(i + 1).padStart(2, '0');
  }

  /** Zachte scroll naar de sectie; href blijft werken zonder JS. */
  scrollNaar(anchor: string, event: Event): void {
    event.preventDefault();
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
