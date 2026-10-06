import { Component } from '@angular/core';
import { RouteDivider } from '../../components/route-divider/route-divider';
import { NATUUR_ETAPPES } from './natuur-etappes';

@Component({
  selector: 'app-natuur-page',
  host: { class: 'thema-natuur' },
  imports: [RouteDivider],
  templateUrl: './natuur-page.html',
})
export class NatuurPage {
  readonly etappes = NATUUR_ETAPPES;
  readonly actief = -1;
}
