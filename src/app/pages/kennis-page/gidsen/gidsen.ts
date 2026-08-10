import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-gidsen',
  host: { class: 'thema-kennis' },
  imports: [RouteDivider],
  templateUrl: './gidsen.html',
  styleUrl: './gidsen.scss',
})
export class KennisGidsen {
  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 5;
}
