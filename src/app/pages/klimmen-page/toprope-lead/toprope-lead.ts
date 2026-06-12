import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { KLIMMEN_ETAPPES } from '../klimmen-etappes';

@Component({
  selector: 'app-toprope-lead',
  host: { class: 'thema-klimmen' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './toprope-lead.html',
  styleUrl: './toprope-lead.scss',
})
export class TopropeLead {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Route', waarde: 'single-pitch' },
    { label: 'Touw', waarde: '60-70 m' },
    { label: 'Niveau', waarde: 'basis' },
    { label: 'Focus', waarde: 'zekeren' },
  ];

  readonly etappes = KLIMMEN_ETAPPES;
  readonly actief = 0;
}
