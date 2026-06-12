import { Component } from '@angular/core';
import { RouteDivider } from '../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../components/veldstrip/veldstrip';
import { NATUUR_ETAPPES } from './natuur-etappes';

@Component({
  selector: 'app-natuur-page',
  host: { class: 'thema-natuur' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './natuur-page.html',
  styleUrl: './natuur-page.scss',
})
export class NatuurPage {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Biotoop', waarde: 'bos · berg' },
    { label: 'Seizoen', waarde: 'lente → herfst' },
    { label: 'Focus', waarde: 'oriëntatie' },
    { label: 'Veldwerk', waarde: 'kijken · lezen' },
  ];

  readonly etappes = NATUUR_ETAPPES;
  readonly actief = -1;
}
