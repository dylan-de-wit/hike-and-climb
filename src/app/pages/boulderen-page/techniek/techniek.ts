import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { BOULDEREN_ETAPPES } from '../boulderen-etappes';

@Component({
  selector: 'app-boulderen-techniek',
  host: { class: 'thema-boulderen' },
  imports: [RouteDivider],
  templateUrl: './techniek.html',
  styleUrl: './techniek.scss',
})
export class BoulderenTechniek {
  readonly etappes = BOULDEREN_ETAPPES;
  readonly actief = 0;
}
