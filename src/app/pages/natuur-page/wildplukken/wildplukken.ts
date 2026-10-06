import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { NATUUR_ETAPPES } from '../natuur-etappes';

@Component({
  selector: 'app-wildplukken',
  host: { class: 'thema-natuur' },
  imports: [RouteDivider],
  templateUrl: './wildplukken.html',
})
export class Wildplukken {
  readonly etappes = NATUUR_ETAPPES;
  readonly actief = 1;
}
