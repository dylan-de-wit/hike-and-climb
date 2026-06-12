import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { HIKEN_ETAPPES } from '../hiken-etappes';

@Component({
  selector: 'app-navigatie-planning',
  host: { class: 'thema-hiken' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './navigatie-planning.html',
  styleUrl: './navigatie-planning.scss',
})
export class NavigatiePlanning {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Kaart', waarde: 'GPX + papier' },
    { label: 'Timing', waarde: 'daglicht' },
    { label: 'Weer', waarde: 'check 2x' },
    { label: 'Plan B', waarde: 'exit route' },
  ];

  readonly etappes = HIKEN_ETAPPES;
  readonly actief = 1;
}
