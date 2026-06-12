import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { BOULDEREN_ETAPPES } from '../boulderen-etappes';

@Component({
  selector: 'app-boulderlocaties',
  host: { class: 'thema-boulderen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './boulderlocaties.html',
  styleUrl: './boulderlocaties.scss',
})
export class Boulderlocaties {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Regio', waarde: 'bos · blokken' },
    { label: 'Aanloop', waarde: '5-25 min' },
    { label: 'Landing', waarde: 'pads' },
    { label: 'Seizoen', waarde: 'droog' },
  ];

  readonly etappes = BOULDEREN_ETAPPES;
  readonly actief = 1;
}
