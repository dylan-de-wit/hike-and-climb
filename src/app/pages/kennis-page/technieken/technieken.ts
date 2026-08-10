import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-technieken',
  host: { class: 'thema-kennis' },
  imports: [RouteDivider],
  templateUrl: './technieken.html',
  styleUrl: './technieken.scss',
})
export class KennisTechnieken {
  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 1;
}
