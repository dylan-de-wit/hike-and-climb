import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { HIKEN_ETAPPES } from '../hiken-etappes';

@Component({
  selector: 'app-hiken-uitrusting',
  host: { class: 'thema-hiken' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './uitrusting.html',
  styleUrl: './uitrusting.scss',
})
export class HikenUitrusting {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Basis', waarde: 'laagjes' },
    { label: 'Water', waarde: '1.5-3 L' },
    { label: 'Schoenen', waarde: 'grip' },
    { label: 'Paklijst', waarde: 'compact' },
  ];

  readonly etappes = HIKEN_ETAPPES;
  readonly actief = 2;
}
