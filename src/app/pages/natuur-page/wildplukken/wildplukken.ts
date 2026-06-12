import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { NATUUR_ETAPPES } from '../natuur-etappes';

@Component({
  selector: 'app-wildplukken',
  host: { class: 'thema-natuur' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './wildplukken.html',
  styleUrl: './wildplukken.scss',
})
export class Wildplukken {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Seizoen', waarde: 'lente' },
    { label: 'Regel', waarde: 'zeker weten' },
    { label: 'Oogst', waarde: 'klein' },
    { label: 'Habitat', waarde: 'bosrand' },
  ];

  readonly etappes = NATUUR_ETAPPES;
  readonly actief = 1;
}
