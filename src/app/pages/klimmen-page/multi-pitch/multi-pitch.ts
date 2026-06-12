import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { KLIMMEN_ETAPPES } from '../klimmen-etappes';

@Component({
  selector: 'app-multi-pitch',
  host: { class: 'thema-klimmen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './multi-pitch.html',
  styleUrl: './multi-pitch.scss',
})
export class MultiPitch {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Lengte', waarde: '3-8 pitches' },
    { label: 'Stand', waarde: 'bouwen' },
    { label: 'Route', waarde: 'topo' },
    { label: 'Tijd', waarde: 'dagtocht' },
  ];

  readonly etappes = KLIMMEN_ETAPPES;
  readonly actief = 1;
}
