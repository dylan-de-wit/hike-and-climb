import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { NATUUR_ETAPPES } from '../natuur-etappes';

@Component({
  selector: 'app-gesteenten-geologie',
  host: { class: 'thema-natuur' },
  imports: [RouteDivider],
  templateUrl: './gesteenten-geologie.html',
  styleUrl: './gesteenten-geologie.scss',
})
export class GesteentenGeologie {
  readonly etappes = NATUUR_ETAPPES;
  readonly actief = 3;
}
