import { Component } from '@angular/core';
import { Veldstrip, VeldItem } from '../../components/veldstrip/veldstrip';
import { RouteDivider } from '../../components/route-divider/route-divider';
import { KLIMMEN_ETAPPES } from './klimmen-etappes';

@Component({
  selector: 'app-klimmen-page',
  host: { class: 'thema-klimmen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './klimmen-page.html',
  styleUrl: './klimmen-page.scss',
})
export class KlimmenPage {
  /** Feiten voor de veldstrip in de hero — vrij per pagina in te vullen. */
  readonly veldgegevens: VeldItem[] = [
    { label: 'Locatie', waarde: 'Grande Grotta' },
    { label: 'Graad', waarde: '6a → 7c+' },
    { label: 'Schaduw', waarde: '06:00 – 11:00' },
    { label: 'Wand', waarde: '85m · overhang' },
  ];

  /** Het leerpad door de subpagina's — gedeeld met alle klim-subpagina's. */
  readonly etappes = KLIMMEN_ETAPPES;

  /** -1 = overzicht: niets actief, wel klikbaar naar de subpagina's. */
  readonly actief = -1;
}
