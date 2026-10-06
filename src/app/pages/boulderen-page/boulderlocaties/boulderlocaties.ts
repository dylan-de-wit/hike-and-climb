import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { BOULDEREN_ETAPPES } from '../boulderen-etappes';

@Component({
  selector: 'app-boulderlocaties',
  host: { class: 'thema-boulderen' },
  imports: [RouteDivider],
  templateUrl: './boulderlocaties.html',
})
export class Boulderlocaties {
  readonly etappes = BOULDEREN_ETAPPES;
  readonly actief = 1;
}
