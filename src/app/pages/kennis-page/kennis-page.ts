import { Component } from '@angular/core';
import { RouteDivider } from '../../components/route-divider/route-divider';
import { KENNIS_ETAPPES } from './kennis-etappes';

@Component({
  selector: 'app-kennis-page',
  host: { class: 'thema-kennis' },
  imports: [RouteDivider],
  templateUrl: './kennis-page.html',
  styleUrl: './kennis-page.scss',
})
export class KennisPage {
  readonly etappes = KENNIS_ETAPPES;
  readonly actief = -1;
}
