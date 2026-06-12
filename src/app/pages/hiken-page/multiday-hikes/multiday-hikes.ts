import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { HIKEN_ETAPPES } from '../hiken-etappes';

@Component({
  selector: 'app-multiday-hikes',
  host: { class: 'thema-hiken' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './multiday-hikes.html',
  styleUrl: './multiday-hikes.scss',
})
export class MultidayHikes {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Dagen', waarde: '2-7' },
    { label: 'Slaap', waarde: 'hut · tent' },
    { label: 'Voorraad', waarde: 'resupply' },
    { label: 'Route', waarde: 'etappes' },
  ];

  readonly etappes = HIKEN_ETAPPES;
  readonly actief = 3;
}
