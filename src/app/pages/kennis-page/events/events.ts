import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-events',
  host: { class: 'thema-kennis' },
  imports: [RouteDivider],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class KennisEvents {
  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 3;
}
