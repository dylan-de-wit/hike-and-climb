import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { KENNIS_ETAPPES } from '../kennis-etappes';

@Component({
  selector: 'app-kennis-reisverhalen',
  host: { class: 'thema-kennis' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './artikelen.html',
  styleUrl: './artikelen.scss',
})
export class KennisReisverhalen {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Type', waarde: 'verhaal' },
    { label: 'Sfeer', waarde: 'route' },
    { label: 'Notities', waarde: 'veld' },
    { label: 'Leestijd', waarde: '8 min' },
  ];

  readonly etappes = KENNIS_ETAPPES;
  readonly actief = 2;
}
