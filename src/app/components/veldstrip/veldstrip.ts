import { Component, input } from '@angular/core';

/** Eén regel in de veldstrip: een label + de waarde ervan. */
export interface VeldItem {
  label: string;
  waarde: string;
}

/**
 * Verticale veldstrip — een rail rechts in de hero met de feiten van
 * déze pagina. De inhoud is vrij: op een klimpagina graad/schaduw/wand,
 * op een hike-pagina afstand/stijging/duur. Plaats 'm BINNEN .hero-overlap.
 */
@Component({
  selector: 'app-veldstrip',
  imports: [],
  templateUrl: './veldstrip.html',
  styleUrl: './veldstrip.scss',
})
export class Veldstrip {
  /** Kleine accenttekst bovenaan de rail. */
  readonly kicker = input('Veldgegevens');
  /** De label/waarde-paren — 3 tot 5 werkt het mooist. */
  readonly items = input<VeldItem[]>([]);
  /** Optionele regel onderaan, bv. het weer: "24° · NW 3". */
  readonly meta = input<string | null>(null);
}
