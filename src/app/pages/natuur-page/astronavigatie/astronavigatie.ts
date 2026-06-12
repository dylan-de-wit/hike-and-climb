import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { NATUUR_ETAPPES } from '../natuur-etappes';

@Component({
  selector: 'app-astronavigatie',
  host: { class: 'thema-natuur' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './astronavigatie.html',
  styleUrl: './astronavigatie.scss',
})
export class Astronavigatie {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Hemel', waarde: 'zon · maan' },
    { label: 'Nacht', waarde: 'sterren' },
    { label: 'Richting', waarde: 'noord' },
    { label: 'Tool', waarde: 'kompas' },
  ];

  readonly etappes = NATUUR_ETAPPES;
  readonly actief = 0;
}
