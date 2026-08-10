import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { NATUUR_ETAPPES } from '../natuur-etappes';

@Component({
  selector: 'app-astronavigatie',
  host: { class: 'thema-natuur' },
  imports: [RouteDivider],
  templateUrl: './astronavigatie.html',
  styleUrl: './astronavigatie.scss',
})
export class Astronavigatie {
  readonly etappes = NATUUR_ETAPPES;
  readonly actief = 0;
}
