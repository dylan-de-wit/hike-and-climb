import { Component } from '@angular/core';
import { RouteDivider } from '../../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../../components/veldstrip/veldstrip';
import { HIKEN_ETAPPES } from '../hiken-etappes';

@Component({
  selector: 'app-routes-gebieden',
  host: { class: 'thema-hiken' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './routes-gebieden.html',
  styleUrl: './routes-gebieden.scss',
})
export class RoutesGebieden {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Route', waarde: 'bergpad' },
    { label: 'Afstand', waarde: '12-22 km' },
    { label: 'Stijging', waarde: '+650 m' },
    { label: 'Terrein', waarde: 'gravel · rots' },
  ];

  readonly etappes = HIKEN_ETAPPES;
  readonly actief = 0;
}
