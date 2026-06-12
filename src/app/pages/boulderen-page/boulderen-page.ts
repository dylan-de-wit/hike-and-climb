import { Component } from '@angular/core';
import { RouteDivider } from '../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../components/veldstrip/veldstrip';
import { BOULDEREN_ETAPPES } from './boulderen-etappes';

@Component({
  selector: 'app-boulderen-page',
  host: { class: 'thema-boulderen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './boulderen-page.html',
  styleUrl: './boulderen-page.scss',
})
export class BoulderenPage {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Sector', waarde: 'Bosblok' },
    { label: 'Graad', waarde: '4 → 7B' },
    { label: 'Landing', waarde: 'vlak · pads' },
    { label: 'Rots', waarde: 'zandsteen' },
  ];

  readonly etappes = BOULDEREN_ETAPPES;
  readonly actief = -1;
}
