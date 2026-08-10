import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { HIKEN_ETAPPES } from '../hiken-etappes';

@Component({
  selector: 'app-navigatie-planning',
  host: { class: 'thema-hiken' },
  imports: [RouteDivider],
  templateUrl: './navigatie-planning.html',
  styleUrl: './navigatie-planning.scss',
})
export class NavigatiePlanning {
  readonly etappes = HIKEN_ETAPPES;
  readonly actief = 1;
}
