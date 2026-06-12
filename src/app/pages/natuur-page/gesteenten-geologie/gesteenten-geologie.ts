import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { NATUUR_ETAPPES } from '../natuur-etappes';

@Component({
  selector: 'app-gesteenten-geologie',
  host: { class: 'thema-natuur' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './gesteenten-geologie.html',
  styleUrl: './gesteenten-geologie.scss',
})
export class GesteentenGeologie {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Rots', waarde: 'lagen' },
    { label: 'Spoor', waarde: 'erosie' },
    { label: 'Bodem', waarde: 'mineraal' },
    { label: 'Lezen', waarde: 'landschap' },
  ];

  readonly etappes = NATUUR_ETAPPES;
  readonly actief = 3;
}
