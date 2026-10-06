import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-reisverhalen',
  host: { class: 'thema-kennis' },
  imports: [RouteDivider],
  templateUrl: './artikelen.html',
})
export class KennisReisverhalen {
  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 4;
}
