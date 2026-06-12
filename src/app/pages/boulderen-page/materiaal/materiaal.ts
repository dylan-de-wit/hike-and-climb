import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { BOULDEREN_ETAPPES } from '../boulderen-etappes';

@Component({
  selector: 'app-boulderen-materiaal',
  host: { class: 'thema-boulderen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './materiaal.html',
  styleUrl: './materiaal.scss',
})
export class BoulderenMateriaal {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Crashpad', waarde: '1-2 pads' },
    { label: 'Schoenen', waarde: 'precisie' },
    { label: 'Chalk', waarde: 'droog' },
    { label: 'Brush', waarde: 'zacht' },
  ];

  readonly etappes = BOULDEREN_ETAPPES;
  readonly actief = 2;
}
