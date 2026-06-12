import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-knopen',
  host: { class: 'thema-kennis' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './knopen.html',
  styleUrl: './knopen.scss',
})
export class KennisKnopen {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Type', waarde: 'basis' },
    { label: 'Gebruik', waarde: 'zekeren' },
    { label: 'Check', waarde: 'dubbel' },
    { label: 'Oefenen', waarde: 'droog' },
  ];

  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 0;
}
