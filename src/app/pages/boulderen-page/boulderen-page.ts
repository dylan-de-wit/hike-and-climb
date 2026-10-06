import { Component } from '@angular/core';
import { RouteDivider } from '../../components/route-divider/route-divider';
import { BOULDEREN_ETAPPES } from './boulderen-etappes';

@Component({
  selector: 'app-boulderen-page',
  host: { class: 'thema-boulderen' },
  imports: [RouteDivider],
  templateUrl: './boulderen-page.html',
})
export class BoulderenPage {
  readonly etappes = BOULDEREN_ETAPPES;
  readonly actief = -1;
}
