import { Component } from '@angular/core';
import { RouteDivider } from '../../components/route-divider/route-divider';
import { VeldItem, Veldstrip } from '../../components/veldstrip/veldstrip';
import { HIKEN_ETAPPES } from './hiken-etappes';

@Component({
  selector: 'app-hiken-page',
  host: { class: 'thema-hiken' },
  imports: [Veldstrip, RouteDivider],
  templateUrl: './hiken-page.html',
  styleUrl: './hiken-page.scss',
})
export class HikenPage {
  readonly veldgegevens: VeldItem[] = [
    { label: 'Route', waarde: 'Alpine trail' },
    { label: 'Afstand', waarde: '18 km' },
    { label: 'Stijging', waarde: '+920 m' },
    { label: 'Duur', waarde: '6-7 uur' },
  ];

  readonly etappes = HIKEN_ETAPPES;
  readonly actief = -1;
}
