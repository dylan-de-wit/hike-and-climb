import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-events',
  host: { class: 'thema-kennis' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class KennisEvents {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Type', waarde: 'planning' },
    { label: 'Voor', waarde: 'weekenden' },
    { label: 'Focus', waarde: 'groep' },
    { label: 'Status', waarde: 'concept' },
  ];

  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 3;
}
