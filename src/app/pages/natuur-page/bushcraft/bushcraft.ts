import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { NATUUR_ETAPPES } from '../natuur-etappes';

@Component({
  selector: 'app-bushcraft',
  host: { class: 'thema-natuur' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './bushcraft.html',
  styleUrl: './bushcraft.scss',
})
export class Bushcraft {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Basis', waarde: 'vuur · shelter' },
    { label: 'Tool', waarde: 'mes' },
    { label: 'Water', waarde: 'filter' },
    { label: 'Leave', waarde: 'no trace' },
  ];

  readonly etappes = NATUUR_ETAPPES;
  readonly actief = 2;
}
