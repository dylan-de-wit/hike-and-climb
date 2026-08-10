import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { BOULDEREN_ETAPPES } from '../boulderen-etappes';

@Component({
  selector: 'app-boulderen-materiaal',
  host: { class: 'thema-boulderen' },
  imports: [RouteDivider],
  templateUrl: './materiaal.html',
  styleUrl: './materiaal.scss',
})
export class BoulderenMateriaal {
  readonly etappes = BOULDEREN_ETAPPES;
  readonly actief = 2;
}
